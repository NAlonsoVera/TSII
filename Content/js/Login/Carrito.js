$(function () {
    const $listProductInCart = $("#listProductInCart");
    let $productosFiltrados;

    $(document).ready(function () {
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
        })
    });

    $(document).on("click", "#listProductInCart .input-cant .addCantProduct,.deleteCantProduct", function () {

        const $this = $(this);
        const $iptCantidad = $(this).parents(".item__quantity").find(".item__quantity__input").find(".iptCantidad");
        const $pk_eProducto = $(this).parents(".content-tr").attr("data-identify");
        const $stockActual = parseInt($(this).parents(`div[data-identify='${$pk_eProducto}']`).find(".stock-actual").attr("data-stock-actual"));
        const $codigoInterno = $(this).parents(`div[data-identify='${$pk_eProducto}']`).find(".codigo-interno").attr("data-codigo-interno");

        const $textTotal = $(this).parents(`div[data-identify='${$pk_eProducto}']`).find(".text-total");
        let $priceUnite = parseFloat($(this).parents(`div[data-identify='${$pk_eProducto}']`).find(".text-price").attr("data-precio-final"))

        const valorcant = $this.hasClass("deleteCantProduct") ? -1 : 1;

        fetch(`/Producto/ConsultaStock?codigoInterno=${$codigoInterno}`)
            .then(resultado => resultado.json())
            .then(respuesta => {
                if (parseInt($iptCantidad.val()) < parseInt(respuesta.stock) && $this.hasClass("addCantProduct")) {
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
                                            console.log("Error..." + result.MessageError);
                                        }
                                        $(".loading").hide();

                                    }
                                });
                            }
                            else {

                                $.each(mpolLocalStorage("mpol_carritotemporal").get(), function (i, e) {
                                    if (e.pk_eProducto === $pk_eProducto) {
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
                else if ($this.hasClass("deleteCantProduct") && parseInt($iptCantidad.val()) > 1) {
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
                                            console.log("Error..." + result.MessageError);
                                        }
                                        $(".loading").hide();

                                    }
                                });
                            }
                            else {
                                if (parseInt($iptCantidad.val()) > 1) {
                                    $.each(mpolLocalStorage("mpol_carritotemporal").get(),
                                        function (i, e) {

                                            if (e.pk_eProducto === $pk_eProducto) {
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

    $("#chktermOfService").on("change", function () {

        if ($(this).is(":checked")) {
            $("#btnCheckOutFinish").prop("disabled", false);
            $("#msg-termOfService").hide();
        } else {
            $("#btnCheckOutFinish").prop("disabled", true);
            $("#msg-termOfService").show();
        }
    });

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
                        console.log("Error..." + result.MessageError);
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

    $("#btnEmptyCart").on("click", function () {
        $(".loading").show();
        const $parent = $(".content-tr");
        const server = $parent.attr("data-server") == "false" ? false : true;

        if (server) {
            $.ajax({
                url: "/ShoppingCart/EliminarPedido/" + $("#pk_ePedido").val(),
                type: "POST",
                success: function (result) {
                    if (result.Success) {
                        localStorage.setItem('mpol_carritotemporal', []);
                        $("#listProductInCart .content-tr").remove();
                        mpolRefreshItem(false);
                        ActualizarPurchaseInfo_Online();
                    } else {
                        console.log("Error..." + result.MessageError);
                    }
                },
                complete: function () {
                    $(".loading").hide();
                    document.location.reload(true);
                }
            });
        }
        else {

            localStorage.setItem('mpol_carritotemporal', []);

            $("#listProductInCart .content-tr").remove();
            $("#listProductInCart").append(`
                                    <div class="d-flex justify-content-center align-items-center">
                                        <div class="row">
                                            <label align="center">No tienes productos en tu carrito</label>
                                        </div>
                                    </div> `);

            mpolRefreshItem(false);
            MostrarProductosDeCarrito();
            $(".loading").hide();
        }

    });

    $("#btnCheckOutFinish").on("click", function () {
        $.ajax({
            url: "/Login/ValidateSession",
            type: "GET",
            success: function (data) {
                if (data) {

                    const cantidadCarrito = parseInt(document.querySelector(".cart-no").textContent);

                    if (cantidadCarrito > 0) {
                        window.location.href = "/CheckOut";
                    }
                    else {
                        window.location.reload();
                    }
                }
                else {
                    window.location.href = "/Login/Index";
                }
            }
        });
    });

    function MostrarProductosDeCarrito() {

        if ($listProductInCart.length === 1) {

            let $localCarrito = mpolLocalStorage("mpol_carritotemporal").get();

            if ($localCarrito && $localCarrito.length !== 0) {

                $("#table-cart").removeClass("hidden");
                if (!$("#vacio-carrito").hasClass("hidden")) { $("#vacio-carrito").addClass("hidden"); }


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
                                            <div class="row">
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 vertical-center-table">
                                                    <ul>
                                                        <li class="image-product">
                                                            <a href="javascript:void(0)"><img src="/Default/Storage?filename=${e2.cFileName}" alt="" ></a>
                                                        </li>
                                                        <li class="name-product">
                                                            <span class="codigo-interno" style="display:none" data-codigo-interno="${e2.cCodigoUno}" >N° Art. ${e2.cCodigoUno}</span>  
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
                                                <div class="col-lg-5 col-md-5 col-sm-6 col-xs-6 vertical-center-table">
                                                    <a href="/Producto/Details/${e2.pk_eProducto}"><h5>${e2.cProducto}</h5></a>
                                                    <div class="vertical-center-table text-center input-cant">
                                                        <div class="item__quantity__input text-left">
                                                            <p class="marca">${e2.cMarca != null ? e2.cMarca : e2.cTipoProducto}</p>
                                                            <span class="cantidad-text"> Cantidad : </span>
                                                                <input type="number" class="text-left pr-0 iptCantidad" id="iptCantProducto" value="${e.eCantidad}" readonly>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 vertical-center-table text-center bottom-vertical">
                                                    <p class="text-price" data-precio-final="${e2.dPrecioVentaFinal}">S/${agregarCommaMillions((e2.dPrecioVentaFinal * e.eCantidad).toFixed(2))}
                                                    <br>
                                                    <!--<span>${e2.productoDescuento ? e2.cPrecioVenta : ``}</span>--></p>
                                                </div>
                                                <div class="col-lg-2 col-md-2 hidden-sm hidden-xs vertical-center-table text-center  bottom-vertical" >
                                                    <p class="text-igv">Incl. IGV</p>
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
                        ActualizarDatosSinLogeo();
                        //<div class="col-lg-2 col-md-2 col-sm-4 col-xs-4 vertical-center-table text-center">
                                                //    <p class="mobile-text">Total : </p>
                                                //    <p class="text-total" data-sub-total="${(e2.dPrecioVentaFinal * e.eCantidad)}">S/${agregarCommaMillions((e2.dPrecioVentaFinal * e.eCantidad).toFixed(2))}</p>
                                                //</div>
                    }

                });

            } else {
                $("#table-cart").addClass("hidden");
                $("#vacio-carrito").removeClass("hidden");
                $(".cart-no").text("0");
            }
        } else {
            //$("#vacio-carrito").removeClass("hidden");
            //$("#table-cart").removeClass("hidden");

        }
    }


    function MostrarProductosDeCarritoCliente() {

        if ($listProductInCart.length === 1) {

            $.ajax({
                url: "/ShoppingCart/ListadoProductosEnCarrito",
                type: "GET",
                success: function (productos) {
                    console.log(productos)


                    if (productos.length > 0) {

                        $("#table-cart").removeClass("hidden");
                        if (!$("#vacio-carrito").hasClass("hidden")) { $("#vacio-carrito").addClass("hidden"); }

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
                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 vertical-center-table">
                                                <ul>
                                                    <li class="image-product">
                                                        <a href="javascript:void(0)"><img src="/Default/Storage?filename=${e2.cFileName}" alt="" ></a>
                                                    </li>
                                                    <li class="name-product">
                                                        <ul class="offers-product">
                                                            ${e2.eDescuento > 0 ? `
                                                                <li>
																	<div class="desct">
																		<div class="line-left"></div>
																		<p>${e2.eDescuento} % <span>Dsc.</span></p>
																		<div class="line-right"></div>
																	</div>
																</li>`
                                            : ``}
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="col-lg-5 col-md-4 col-sm-4 col-xs-4">
                                                <span class="codigo-interno" style="display:none" data-codigo-interno="${e2.cCodigoUno}" >N° Art. ${e2.cCodigoUno}</span>  
                                                <p class="stock-actual" style="font-size: 11px;display:none" data-stock-actual="${productoStock.stock}">Stock actual : ${productoStock.stock}</p>
                                            </div>
                                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 vertical-center-table">
                                                <a href="/Producto/Details/${e2.fk_eProducto}"><h5>${e2.cProducto}</h5></a>
                                                <span><a href="javascript:void(0)" style="color:red;" class="btnEliminar">Eliminar</a></span>
                                            </div>
                                             <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 vertical-center-table text-center input-cant">
                                                <label class="mobile-text">Cantidad : </label>
                                                <div class="item__quantity">
                                                    <div class="item__quantity__input item__quantity__input__plus">
                                                        <button class="fa fa-minus deleteCantProduct" type="button"></button>
                                                        <input type="number" class="form-control pr-0 iptCantidad" id="iptCantProducto" value="${e2.eCantidad}" readonly>
                                                        <button class="fa fa-plus addCantProduct" type="button"></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 vertical-center-table text-center">
                                                <p class="mobile-text">Precio : </p>
                                                <p class="text-price" data-precio-final="${e2.dPrecioVentaFinal}">${e2.cPrecioVentaFinal} 
                                                <br>
                                               <span>${e2.productoDescuento ? e2.cPrecioVenta : ``}</span></p>
                                            </div>
                                            <div class="col-lg-2 col-md-2 hidden-sm hidden-xs vertical-center-table text-center  bottom-vertical" >
                                                 <p class="text-igv">Incl. IGV</p>
                                            </div></div>
                                    </div>
                                    `);
                                });
                            });
                        $(".loading").hide();

                    } else {

                        $("#table-cart").addClass("hidden");
                        $("#vacio-carrito").removeClass("hidden");
                        $(".cart-no").text("0");

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

            ObtenerPrecioEnvio(subTotalDescuento).then(data => {

                $(".subtotal").text(`S/${agregarCommaMillions(subTotal.toFixed(2))}`);
                $("#tdDescuento").text(`-S/${agregarCommaMillions(descuento.toFixed(2))}`);
                $("#tdTotal").text(`S/${agregarCommaMillions((subTotalDescuento + data).toFixed(2))}`);
                $("#tdPrecioEnvio").text(`S/${agregarCommaMillions((data).toFixed(2))}`);
                $(".loading").hide();
            });
        }
        else {

            $(".subtotal").text(`S/${agregarCommaMillions(subTotal.toFixed(2))}`);
            $("#tdDescuento").text(`-S/${agregarCommaMillions(descuento.toFixed(2))}`);
            $("#tdTotal").text(`S/${agregarCommaMillions((subTotalDescuento).toFixed(2))}`);
            $("#tdPrecioEnvio").text(`S/${agregarCommaMillions((0).toFixed(2))}`);
            $(".loading").hide();
        }

    }

    function ObtenerPrecioEnvio(subTotalDescuento) {
        return fetch(`/ShoppingCart/ObtenerPrecioEnvio?dMontototal=${subTotalDescuento}`)
            .then(respuesta => respuesta.json())
            .then(resultado => { return resultado })
            .catch(error => console.warn(error));;
    }

})