$(function () {

    modal += 1;

    const $listProductInCart = $("#listProductInCart");
    let $productosFiltrados;

    $(".loading").show();
    $.ajax({
        url: "/Login/ValidateSession",
        type: "GET",
        success: function (data) {

            if (data) {
                MostrarProductosDeCarritoCliente();
            }
            else {
                MostrarProductosDeCarrito();
            }

            $(".loading").hide();
        }
    });

    $(document).on("click", "#listProductInCart .input-cant .addCantProduct-" + modal + ", .deleteCantProduct-"+modal+" ", function () {

        const $this = $(this);
        const $iptCantidad = $(this).parents(".item__quantity__input__plus").find(".iptCantidad");
        const $pk_eProducto = $(this).parents(".content-tr").attr("data-identify");
        const $stockActual = parseInt($(this).parents(`div[data-identify='${$pk_eProducto}']`).find(".stock-actual").attr("data-stock-actual"));
        const $codigoInterno = $(this).parents(`div[data-identify='${$pk_eProducto}']`).find(".codigo-interno").attr("data-codigo-interno");

        const $textTotal = $(this).parents(`div[data-identify='${$pk_eProducto}']`).find(".text-price");
        let $priceUnite = parseFloat($(this).parents(`div[data-identify='${$pk_eProducto}']`).find(".text-price").attr("data-precio-final"));

        const valorcant = $this.hasClass("deleteCantProduct-"+modal) ? -1 : 1;

        fetch(`/Producto/ConsultaStock?codigoInterno=${$codigoInterno}`)
            .then(resultado => resultado.json())
            .then(respuesta => {
                if (parseInt($iptCantidad.val()) < parseInt(respuesta.stock) && $this.hasClass("addCantProduct-"+modal)) {
                    $.ajax({
                        url: "/Login/ValidateSession",
                        type: "GET",
                        success: function (data) {
                            if (data) {
                                $.ajax({
                                    url: "/ShoppingCart/Agregar",
                                    data: {
                                        pk_eProducto: $this.parents(".content-tr").attr("data-identify"),
                                        eCantidad: valorcant
                                    },
                                    type: "POST",
                                    success: function (result) {
                                        if (result.Success) {
                                            let cantidad = parseInt($iptCantidad.val()) + valorcant;
                                            $iptCantidad.val(cantidad);
                                            $textTotal.text(`S/${agregarCommaMillions(($priceUnite * cantidad).toFixed(2))}`)
                                            ActualizarPurchaseInfo_Online();
                                        } else {
                                            swal.fire("Advertencia!", result.MessageError, "error");

                                            //console.log("Error..." + result.MessageError);
                                        }
                                        $(".loading").hide();

                                    }
                                });
                            }
                            else {

                                $.each(mpolLocalStorage("mpol_carritotemporal").get(), function (i, e) {
                                    if (e.pk_eProducto === parseInt($pk_eProducto)) {
                                        let cantidad = parseInt($iptCantidad.val()) + valorcant;

                                        if (cantidad <= $stockActual) {
                                            e.eCantidad = cantidad;
                                            mpolLocalStorage("mpol_carritotemporal").set(i, e);
                                            $iptCantidad.val(cantidad);
                                            $textTotal.text(`S/${agregarCommaMillions(($priceUnite * cantidad).toFixed(2))}`)
                                        }

                                    }
                                });

                                ActualizarDatosSinLogeo()
                                $(".loading").hide();
                            }
                        },
                        beforeSend: function () {
                            $(".loading").show();
                        }
                    });
                }
                else if ($this.hasClass("deleteCantProduct-"+modal) && parseInt($iptCantidad.val()) > 1) {
                    $.ajax({
                        url: "/Login/ValidateSession",
                        type: "GET",
                        success: function (data) {

                            if (data) {
                                $.ajax({
                                    url: "/ShoppingCart/Agregar",
                                    data: {
                                        pk_eProducto: $this.parents(".content-tr").attr("data-identify"),
                                        eCantidad: valorcant

                                    },
                                    type: "POST",
                                    success: function (result) {
                                        if (result.Success) {
                                            let cantidad = parseInt($iptCantidad.val()) + valorcant;
                                            $iptCantidad.val(cantidad);

                                            $textTotal.text(`S/${agregarCommaMillions(($priceUnite * cantidad).toFixed(2))}`)
                                            ActualizarPurchaseInfo_Online();
                                            
                                        } else {
                                            swal.fire("Advertencia!", result.MessageError, "error");

                                            //console.log("Error..." + result.MessageError);
                                        }
                                        $(".loading").hide();

                                    }
                                });
                            }
                            else {
                                if (parseInt($iptCantidad.val()) > 1) {
                                    $.each(mpolLocalStorage("mpol_carritotemporal").get(),
                                        function (i, e) {

                                            if (e.pk_eProducto === parseInt($pk_eProducto)) {
                                                let cantidad = parseInt($iptCantidad.val()) + valorcant;
                                                e.eCantidad = cantidad;
                                                mpolLocalStorage("mpol_carritotemporal").set(i, e);
                                                $iptCantidad.val(cantidad);
                                                $textTotal.text(`S/${agregarCommaMillions(($priceUnite * cantidad).toFixed(2))}`)
                                            }

                                        });

                                    ActualizarDatosSinLogeo()
                                }
                                $(".loading").hide();
                            }
                        },
                        beforeSend: function () {
                            $(".loading").show();
                        }
                    });
                }
            })

    });

    function MostrarProductosDeCarrito() {

        if ($listProductInCart.length === 1) {

            let $localCarrito = mpolLocalStorage("mpol_carritotemporal").get();

            if ($localCarrito && $localCarrito.length !== 0) {
                $.ajax({
                    url: "/Producto/ListadoFiltro",
                    data: {
                        productos: $localCarrito
                    },
                    type: "POST",
                    success: function (productos) {

                        if (productos) {
                            $listProductInCart.html("");
                            $productosFiltrados = productos

                            let codigos = productos.map(p => p.cCodigoUno).join();

                            fetch(`/Producto/ConsultaStock?codigoInterno=${codigos}`)
                                .then(resultado => resultado.json())
                                .then(respuesta => {


                                    $.each(productos, function (i2, e2) {
                                        if ($localCarrito.some(x => x.pk_eProducto == e2.pk_eProducto)) {

                                            let e = $localCarrito.find(x => x.pk_eProducto == e2.pk_eProducto);

                                            let productoStock = {};

                                            if (Array.isArray(respuesta)) {
                                                productoStock = respuesta.find(x => e2.cCodigoUno == x.codigoDeArticulo);
                                            }
                                            else {
                                                productoStock = respuesta;
                                            }


                                            $listProductInCart.append(`
                                        <div class="content-tr" data-identify="${e2.pk_eProducto}" data-server="false">
                                            <div class="row"><div class="col-md-12 text-left cart-title cart-title12"><a class="title-product-cart" href="/Producto/Details/${e2.pk_eProducto}">${e2.cProducto}</a></div></div>
                                            <div class="row" style="margin-left:-5px;">
                                                <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12 vertical-center-table p-0">
                                                    <ul>
                                                        <li class="image-product">
                                                            <a href="javascript:void(0)"><img src="/Default/Storage?filename=${e2.cFileName}" style="width:100%" alt="" ></a>
                                                        </li>
                                                        <li class="name-product text-center">
                                                            <span class="codigo-interno" data-codigo-interno="${e2.cCodigoUno}" style="display:none" >N° Art. ${e2.cCodigoUno}</span>  
                                                            <p class="stock-actual" style="font-size: 11px;display:none" data-stock-actual="${productoStock.stock}">Stock actual : ${productoStock.stock}</p>
                                                            <ul class="offers-product">
                                                                ${e2.productoDescuento != undefined ? `
                                                                    <li>
																	    <div class="desct">
																		    <div class="line-left"></div>
																		    <!--<p>${e2.productoDescuento.dValor} % <span>Dsc.</span></p>-->
																		    <div class="line-right"></div>
																	    </div>
																    </li>`
                                                    : ``}
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="col-lg-5 col-md-5 col-sm-4 col-xs-4  text-left input-cant" style="font-size: 14px;padding-top:25px;">
<p style="margin-bottom: 10px; font-size: 12px; color: #616D70; font-weight:600; text-transform: uppercase">${e2.cMarca != null ? e2.cMarca : e2.cCategoria}</p>
                                                    <div class="item__quantity__input__plus" style="margin-bottom:10px">
                                                        <button class="fa fa-minus deleteCantProduct-${modal}" type="button"></button>
                                                        <input type="number" class="form-control iptCantidad pr-0" id="iptCantProducto" value="${e.eCantidad}" readonly>
                                                        <button class="fa fa-plus addCantProduct-${modal} type="button"></button>
                                                    </div>
<p><a href="javascript:void(0)" style="color:#000;text-decoration: underline;font-size:14px;" class="btnEliminar">Remover</a></p>
                                                </div>
                                                <div class="col-lg-2 col-md-2 col-sm-4 col-xs-4 vertical-center-table text-center" style="display: flex;align-items: center;padding:0;">
                                                    <p class="text-price" style="font-weight: bold;font-size:14px;" data-precio-final="${e2.dPrecioVentaFinal}">S/${agregarCommaMillions((e2.dPrecioVentaFinal * e.eCantidad).toFixed(2))}
                                                    <br>
                                                    <!--<span>${e2.productoDescuento ? e2.cPrecioVenta : ``}</span>--></p>
                                                </div>
                                            </div>
                                        </div>
                                        `);

                                        }

                                    });

                                })


                        }
                    },
                    complete: function () {
                        ActualizarDatosSinLogeo()
                    }

                });

            }

        } else {
            $(".cart-no").text("0");
        }
    }

    function MostrarProductosDeCarritoCliente() {

        if ($listProductInCart.length === 1) {

            $.ajax({
                url: "/ShoppingCart/ListadoProductosEnCarrito",
                type: "GET",
                success: function (productos) {
                    if (productos.length > 0) {
                        $listProductInCart.html("");
                        $productosFiltrados = productos

                        let codigos = productos.map(p => p.cCodigoUno).join();

                        fetch(`/Producto/ConsultaStock?codigoInterno=${codigos}`)
                            .then(resultado => resultado.json())
                            .then(respuesta => {

                                $.each(productos, function (i2, e2) {

                                    let productoStock = {};

                                    if (Array.isArray(respuesta)) {
                                        productoStock = respuesta.find(x => e2.cCodigoUno == x.codigoDeArticulo);
                                    }
                                    else {
                                        productoStock = respuesta;
                                    }

                                    $listProductInCart.append(`
                                    <div class="content-tr" data-identify="${e2.fk_eProducto}" data-server="true">
                                        <div class="row"><div class="col-md-12 text-left cart-title cart-title12"><a class="title-product-cart" href="/Producto/Details/${e2.fk_eProducto}">${e2.cProducto}</a></div></div>
                                        <div class="row" style="margin-left:-5px;">
                                            <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12 vertical-center-table p-0">
                                                <ul>
                                                    <li class="image-product">
                                                        <a href="javascript:void(0)"><img src="/Default/Storage?filename=${e2.cFileName}" alt="" ></a>
                                                    </li>
                                                    <li class="name-product">
                                                        <span class="codigo-interno" data-codigo-interno="${e2.cCodigoUno}" style="display:none" >N° Art. ${e2.cCodigoUno}</span>  
                                                        <p class="stock-actual" style="font-size: 11px;display:none" data-stock-actual="${productoStock.stock}">Stock actual : ${productoStock.stock}</p>
                                                        <ul class="offers-product">
                                                            ${e2.eDescuento > 0 ? `
                                                                <li>
																	<div class="desct">
																		<div class="line-left"></div>
																		<!--<p>${e2.eDescuento} % <span>Dsc.</span></p>-->
																		<div class="line-right"></div>
																	</div>
																</li>`
                                            : ``}
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="col-lg-5 col-md-5 col-sm-4 col-xs-4  text-left input-cant" style="font-size: 14px;padding-top:25px;">
<p style="margin-bottom: 10px; font-size: 12px; color: #616D70; font-weight:600;text-transform: uppercase">${e2.cMarca}</p>
                                                <div class="item__quantity__input__plus">
                                                    <button class="fa fa-minus deleteCantProduct-${modal}" type="button"></button>
                                                    <input type="number" class="form-control iptCantidad pr-0" id="iptCantProducto" value="${e2.eCantidad}" readonly>
                                                    <button class="fa fa-plus addCantProduct-${modal}" type="button"></button>
                                                </div>
                                                <span><a href="javascript:void(0)" style="color:#000;text-decoration: underline;font-size:14px;" class="btnEliminar">Remover</a></span>
                                            </div>
                                            <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 vertical-center-table text-center p-0" style="display: flex;align-items: center;paddgin:0;">
                                                <p class="text-price" style="font-weight: bold;font-size:14px;"  data-precio-final="${e2.dPrecioVentaFinal}">S/${agregarCommaMillions((e2.dPrecioVentaFinal * e2.eCantidad).toFixed(2))}
                                                <br>
                                               <!--<span>${e2.productoDescuento ? e2.cPrecioVenta : ``}</span>-->
</p>
                                            </div>
                                        </div>
                                    </div>
                                    `);
                                });

                            })
                        $(".loading").hide();

                    } else {
                        console.log("sss")
                        $(".loading").hide();
                    }
                }
            });
        }
    }

    function ActualizarPurchaseInfo_Online() {
        $.ajax({
            url: "/ShoppingCart/GetPurchaseInfo",
            type: "GET",
            success: function (result) {
                $("#tdSubTotal").text(result.cPrecioSubTotal);
                $("#tdDescuento").text('-' + result.cPrecioDescuento);
                $("#tdPrecioEnvio").text(result.cPrecioEnvio);
                $("#tdTotal").text(result.cPrecioTotalMasEnvio);
                $(".loading").hide();
            }
        });
    }

    $("#listProductInCart").on("click", ".btnEliminar", function () {
        $(".loading").show();
        const $parent = $(this).parents(".content-tr");
        const identify = $parent.attr("data-identify");
        const server = $parent.attr("data-server") === "true" ? true : false;
        if (server) {
            $.ajax({
                url: "/ShoppingCart/Eliminar/" + identify,
                type: "POST",
                success: function (result) {
                    if (result.Success) {
                        $parent.remove();
                        mpolRefreshItem(true);
                        ActualizarPurchaseInfo_Online();
                        document.location.reload(true);
                    } else {
                        //console.log("Error..." + result.MessageError);
                        swal.fire("Advertencia!", result.MessageError, "error");
                    }

                },
                complete: function () {
                    $(".loading").hide();
                }
            });
        }
        else {
            const $localCarrito = mpolLocalStorage("mpol_carritotemporal").get();

            $.each($localCarrito, function (i, e) {

                if (e.pk_eProducto == identify) {
                    mpolLocalStorage("mpol_carritotemporal").delete(i);
                    $parent.remove();
                    mpolRefreshItem(false);
                    $productosFiltrados = $productosFiltrados.filter(x => x.pk_eProducto != identify);
                    MostrarProductosDeCarrito();
                    ActualizarDatosSinLogeo();
                    $(".loading").hide();
                }
            });
        }

    });
    
    function ActualizarDatosSinLogeo() {

        let $localCarrito = mpolLocalStorage("mpol_carritotemporal").get();

        let subTotal = 0,
            subTotalDescuento = 0,
            descuento = 0;

        if ($productosFiltrados && $productosFiltrados.length > 0) {
            $productosFiltrados.forEach(x => {

                let $cantidad = parseInt($localCarrito.find(c => c.pk_eProducto == x.pk_eProducto).eCantidad)

                subTotal += (parseFloat(x.dPrecioVenta) * $cantidad);
                subTotalDescuento += (parseFloat(x.dPrecioVentaFinal) * $cantidad);

            });
            descuento = subTotal - subTotalDescuento;
        }
        else {

            $(".subtotal").text(`S/${agregarCommaMillions(subTotal.toFixed(2))}`);
            $("#tdDescuento").text(`-S/${agregarCommaMillions(descuento.toFixed(2))}`);
            $("#tdTotal").text(`S/${agregarCommaMillions((subTotalDescuento).toFixed(2))}`);
            $("#tdPrecioEnvio").text(`S/${agregarCommaMillions((0).toFixed(2))}`);
            $(".loading").hide();
        }

        $(".subtotal").text(`S/${agregarCommaMillions(subTotal.toFixed(2))}`);
        $("#tdDescuento").text(`-S/${agregarCommaMillions(descuento.toFixed(2))}`);
        $("#tdTotal").text(`S/${agregarCommaMillions((subTotalDescuento).toFixed(2))}`);
        $("#tdPrecioEnvio").text(`S/${agregarCommaMillions((0).toFixed(2))}`);
        $(".loading").hide();


    }

    var $modalConfirmed = $("#ModalConfirmed");

    $modalConfirmed.on("hidden.bs.modal",
        function () {
            $(this).parent().remove();
        });
    
    $modalConfirmed.modal("show");

});
