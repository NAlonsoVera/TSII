$(function () {

    const $pkProducto = $("#pk_eProducto");
    const $iptCantProducto = $("#iptCantProducto");
    const $btnAgregarCarrito = $("#btnAgregarCarrito");
    const codigoInterno = $("#cCodigoInterno");

    CargarContenedorComentarioGeneral();
    ConsultarStock();

    function CargarContenedorComentarioGeneral() {

        let pk_eProducto = parseInt($pkProducto.val());
        $.ajax({
            url: `/Producto/ObtenerCalificacionGeneral?pk_eProducto=${pk_eProducto}`,
            type: "GET",
            dataType: "json",
            success: function (data) {

                $("#DivCommentary").html("");

                $("#DivCommentary").append(`
                <div class="row">
                <div class="col-md-12 text-valoration-star">
                    <div class="valoration-star" style="text-align:left">
                        <fieldset class="rating">
                            <img style="height: 23px;" src="/Content/image/star/${data.cImagenEstrella}" alt="">
                        </fieldset>
                    </div>
                    <div class="linea-separator-star"></div>
                </div>
            </div>`);

                $("#DivCommentaryMovil").html("");

                $("#DivCommentaryMovil").append(`
                <div class="row">
                <div class="col-md-12 text-valoration-star">
                    <div class="valoration-star" style="text-align:left">
                        <fieldset class="rating">
                            <img style="height: 23px;" src="/Content/image/star/${data.cImagenEstrella}" alt="">
                        </fieldset>
                    </div>
                    <div class="linea-separator-star"></div>
                </div>
            </div>`);
            }
        });
    }

    $("#btnPlus,#btnMinus").on("click", function () {
        const $this = $(this);
        const valorcant = $this.hasClass("deleteCantProduct") ? -1 : 1;
        let stockActual = parseInt($(".stock-details").attr("data-stock"));
        let cantidadProducto = parseInt($iptCantProducto.val());

        if ($this.hasClass("addCantProduct") && cantidadProducto >= 1 && cantidadProducto < stockActual) {
            $iptCantProducto.val(cantidadProducto + valorcant);
        }
        else if ($this.hasClass("deleteCantProduct") && cantidadProducto > 1) {
            $iptCantProducto.val(cantidadProducto + valorcant);
        }
    });


    $btnAgregarCarrito.on("click", function () {
        agregarProducto("");
    });

    function agregarProducto(claseCondicion) {

        let cantidadProducto = parseInt($iptCantProducto.val());
        let stockActual = parseInt($(".stock-details").attr("data-stock"));

        fetch(`/Producto/ConsultaStock?codigoInterno=${codigoInterno.val()}`)
            .then(resultado => resultado.json())
            .then(respuesta => {

                if (parseInt(respuesta.stock) >= cantidadProducto) {
                    $.ajax({
                        url: "/Login/ValidateSession",
                        type: "GET",
                        success: function (data) {
                            if (data) {
                                $.ajax({
                                    url: "/ShoppingCart/Agregar",
                                    data: {
                                        pk_eProducto: parseInt($pkProducto.val()),
                                        eCantidad: $iptCantProducto.val(),
                                        opcion: claseCondicion
                                    },
                                    type: "POST",
                                    success: function (result) {

                                        if (result.Success) {
                                            if (claseCondicion === 'btnComprarAhora') {
                                                mpolRefreshItem(true);
                                                window.location.href = "/CheckOut/";
                                            }
                                            else {
                                                ConfirmarProducto(parseInt($pkProducto.val()))
                                                mpolRefreshItem(true);
                                            }
                                        }
                                        else {
                                            if (claseCondicion === 'btnComprarAhora')
                                                swal.fire("Algo salió mal!", result.MessageError, "error");
                                            else
                                                swal.fire("Fuera de stock!", result.MessageError, "info");
                                        }
                                        $(".loading").hide();
                                    }
                                });
                            }
                            else {

                                let carritoPedido = mpolLocalStorage("mpol_carritotemporal").get();

                                if (carritoPedido.some(p => p.pk_eProducto === parseInt($pkProducto.val()))) {
                                    $.each(carritoPedido, function (i, e) {

                                        if (e.pk_eProducto === parseInt($pkProducto.val())) {

                                            let cantidadTotal = e.eCantidad + cantidadProducto

                                            if (claseCondicion === 'btnComprarAhora') {
                                                e.eCantidad = cantidadTotal > stockActual ? stockActual : e.eCantidad + cantidadProducto;
                                                mpolLocalStorage("mpol_carritotemporal").set(i, e);
                                                window.location.href = "/CheckOut/";
                                            }
                                            else {
                                                if (cantidadTotal <= stockActual) {
                                                    e.eCantidad = cantidadTotal;
                                                    mpolLocalStorage("mpol_carritotemporal").set(i, e);
                                                    ConfirmarProducto(parseInt($pkProducto.val()));
                                                }
                                                else {
                                                    swal.fire("Fuera de stock!", `La cantidad a guardar en el carrito supera al stock.<br/> Usted ya cuenta con ${e.eCantidad} unidades agregadas.`, "info");
                                                    return false;
                                                }
                                            }
                                        }
                                    });
                                }
                                else {
                                    mpolLocalStorage("mpol_carritotemporal").add({
                                        pk_eProducto: parseInt($pkProducto.val()),
                                        eCantidad: cantidadProducto
                                    });

                                    if (claseCondicion === 'btnComprarAhora')
                                        window.location.href = "/CheckOut/";
                                    else
                                        ConfirmarProducto(parseInt($pkProducto.val()));
                                }

                                $(".loading").hide();
                                mpolRefreshItem(false);

                                //if (claseCondicion === 'btnComprarAhora')
                                //    window.location.replace("/CheckOut/");
                            }
                        },
                        beforeSend: function () {
                            $(".loading").show();
                        }
                    });
                }
                else {
                    swal.fire("Algo Salio Mal!", "La cantidad que se desea agregar es mayor al stock actual!", "error");
                }
            });
        }

    function ConfirmarProducto(pk_eProducto) {
        $modalConfirmed.modal("hide");
        $modalConfirmed.parent().remove();
        window.location.href = "/ShoppingCart/";

        //$.ajax({
        //    url: "/Producto/PartialProductoConfirmed?id=" + pk_eProducto,
        //    dataType: "html",
        //    success: function (data) {
        //        $("body").append(data);
        //    }
        //});
    }

    function ConsultarStock() {

        console.log("saaaa " + codigoInterno.val())
        fetch(`/Producto/ConsultaStock?codigoInterno=${codigoInterno.val()}`)
            .then(resultado => resultado.json())
            .then(respuesta => {
                if (respuesta.stock <= 0) {
                    $("#buttons-details-info").removeAttr("style").css("display", "block");
                    $("#buttons-details-sale").removeAttr("style").css("display", "none");
                    $(".item__quantity").remove();
                    $(".stock-details").text(`Sin Stock`).css("background-color", "#00A300").remove();
                }
                else {
                    $("#buttons-details-sale").removeAttr("style").css("display", "block");
                    $(".stock-details").text(`En Stock : ${parseInt(respuesta.stock)}`).attr("data-stock", parseInt(respuesta.stock));
                    $(".stock-details").css("background-color", "#00A300");

                }

            })

    }

    var $modalConfirmed = $("#ModalConfirmed");

    $modalConfirmed.on("hidden.bs.modal",
        function () {
            $(this).parent().remove();
        });
    $modalConfirmed.modal("show");


});