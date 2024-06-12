var OnSuccessSuscripcion, OnFailureSuscripcion;


const MedioPago = {
    TarjetaCreditoDebito: 1,
    TransferenciaDepositoBancario: 2,
    PagoContraEntrega: 3,
    YapeBCP:5
};

const MetodoPago = {
    Visa: 1,
    Mastercard: 2,
    Efectivo : 3
};

jQuery(document).ready(function () {
    "use strict";

    ConsultarFavoritos();

    //const btnContactanos = document.querySelector(".btnContactanos");
    //const btnContactanosMovil = document.querySelector(".btnContactanosMovil");
    const btnMostrarModalContacto = document.querySelector(".btnMostrarModalContacto");
    //const categorias = document.querySelector(".categorias");


    //btnContactanos.addEventListener("click", abrirModalTicketAtencion)
    //btnContactanosMovil.addEventListener("click", abrirModalTicketAtencion)

    //btnMostrarModalContacto.addEventListener("click", abrirModalTicketAtencion)


    function abrirModalTicketAtencion() {
        invocarModal(`/Helper/PartialTicketAtencion`);
    }

    $.ajax({
        url: "/Login/ValidateSession",
        type: "GET",
        success: function (data) {
            if (!data) {
                //cerrarSesion();
               // CerrarSesionFacebook();
            }
        }
    });

    var imageProducts = [
        '<span class="icon icon-chevron-left"></span>',
        '<span class="icon icon-chevron-right"></span>'
    ];

    if ($('.list-products.p-four').length != 0) {
        $('.list-products.p-four').owlCarousel({
            autoHeight: false,
            pagination: false,
            navigation: true,
            navigationText: imageProducts,
            items: 4,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 2],
            itemsTablet: [768, 2],
            itemsTabletSmall: false,
            itemsMobile: [479, 2],
            addClassActive: true,
            autoPlay: 5500,
            stopOnHover: true
        });
    }

    if ($('.list-products').length != 0) {
        $('.list-products').owlCarousel({
            autoHeight: false,
            pagination: false,
            navigation: true,
            navigationText: imageProducts,
            items: 5,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 2],
            itemsTabletSmall: false,
            itemsMobile: [479, 2],
            addClassActive: true,
            autoPlay: 5500,
            stopOnHover: true
        });
    }

    if ($('.list-items-banners').length != 0) {
        $('.list-items-banners').owlCarousel({
            autoHeight: false,
            pagination: false,
            navigation: true,
            navigationText: imageProducts,
            items: 1,
            itemsDesktop: [1199, 1],
            itemsDesktopSmall: [979, 1],
            itemsTablet: [768, 1],
            itemsTabletSmall: false,
            itemsMobile: [479, 1],
            addClassActive: true,
            autoPlay: 5500,
            stopOnHover: true
        });

    }

    $(".menu-button").on("click", function (e) {

        if ($(".menu-categoria").hasClass("menu-desplegable"))
            $(".menu-categoria").removeClass("menu-desplegable");
        else
            $(".menu-categoria").addClass("menu-desplegable");
    });

    //$(".menu-categoria a.no-redirect").on("click", function (e) {
    //    e.preventDefault();

    //    if ($(this).closest("li").find(".menu-subcategoria").hasClass("menu-subcategoria-desplegable"))
    //        $(this).closest("li").find(".menu-subcategoria").removeClass("menu-subcategoria-desplegable");
    //    else
    //        $(this).closest("li").find(".menu-subcategoria").addClass("menu-subcategoria-desplegable")   
    //});


    $(window).resize(function () {
        if ($(window).width() > 1200) {
            $(".menu-categoria").removeClass("menu-desplegable");
            $(this).closest("li").find(".menu-subcategoria").removeClass("menu-subcategoria-desplegable");
        } 
    }).resize();

    var $frmSuscripcionMant = $("#frmSuscripcionMant");

    OnSuccessSuscripcion=function (data) {
        $frmSuscripcionMant.find("span[data-valmsg-for]").text("");
        if (data.Success === true) {
            swal.fire("Bien!", "Suscripcion Correcta", "success");
            $frmSuscripcionMant[0].reset();
        } else {
            if (data.Errors) {
                $.each(data._resetErrors,
                    function (i, item) {
                        if ($("span[data-valmsg-for=" + item.key + "]").length !== 0)
                            $("span[data-valmsg-for=" + item.key + "]").text(item.Message);
                    });
            }
            swal.fire("Algo Salio Mal!", data.MessageError ? data.MessageError : "Verifique los campos ingresados", "error");
        }
    };

    OnFailureSuscripcion = function () {
    }

    function invocarModal(url, onSuccess) {
        $.ajax({
            url: url,
            type: "GET",
            dataType: "html",
            success: function (data) {
                $("body").append(data);
                if (onSuccess)
                    onSuccess(data);
            },
            beforeSend: function () {
                $(".loading").show();
            },
            complete: function () {
                $(".loading").hide();
            }
        });
    }
});


$(".btnTesoro").click(function () {
    $('#loading-tesoro').show()
});

$(".btnTesoroMovil").click(function () {
    $('#loading-tesoro').show()
});


$(function () {

    $("#Btn_wsp").on("click",
        function () {
            window.open('https://api.whatsapp.com/send?phone=957227403&text=Hola,%20quisiera%20saber%20m%C3%A1s%20sobre%20sus%20productos?', '_blank');
        });

});

function agregarCommaMillions(data) {
    var str = data.toString().split('.');
    if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    return str.join('.');
}


function registrarUsuarioGoogleOFacebook(encriptado) {

    fetch(`/Login/RegistroConGoogleOFacebook`, {
        method: 'POST',
        body: JSON.stringify(encriptado),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resultado => resultado.json())
        .then(respuesta => {
            console.log(respuesta)
            if (respuesta.Success) {
                window.location.href = "/"
            }
            else {
                swal.fire("Algo salio mal!", respuesta.MessageError, "error")
                cerrarSesion();
                CerrarSesionFacebook();
                $(".loading").hide();
            }

        })
        .catch(error => { cerrarSesion(); CerrarSesionFacebook(); $(".loading").hide(); console.log(error); })

}

function encryptarUsuario(usuario) {

    var key = CryptoJS.enc.Utf8.parse('8080808080808080');
    var iv = CryptoJS.enc.Utf8.parse('8080808080808080');

    var encryptedlogin = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(JSON.stringify(usuario)), key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString();

    return encryptedlogin;
}

function cerrarSesionGooFace() {
    //cerrarSesion();
    //CerrarSesionFacebook();
}


function ConsultarFavoritos() {
    const pk_eCliente = $("#pk_eCliente_g").val();
    if (pk_eCliente != "" && pk_eCliente != 0) {
        $.ajax({
            url: `/Producto/FavoritosCliente?pk_eCliente=${pk_eCliente}`,
            type: "POST",
            success: function (data) {
                if (data != null) {
                    $.each(data, function (i, v) {
                        $("[data-info=" + v.fk_eProducto + "]").find("a").addClass("active");
                    });
                    $(".favorite-count").text(data.length);
                }
            }
        });
    }
}

function verProducto(id) {
    invocarModal(`/Producto/Previsualizacion/${id}`);
}

function addFavorito(pk_eProducto) {

    const $favoriteCount = parseInt($(".favorite-count").text());

    const pk_eCliente = $("#pk_eCliente_g").val();
    var ele = $("[data-info="+pk_eProducto+"]");
    if (pk_eCliente != "" && pk_eCliente != 0) {
        $.ajax({
            url: `/Producto/AddFavorites/${pk_eProducto}`,
            type: "POST",
            success: function (data) {
                if (data.Success) {
                    ele.find("a").addClass("active");
                    $(".favorite-count").text($favoriteCount + 1);
                } else {
                    ele.find("a").removeClass("active");
                    $(".favorite-count").text($favoriteCount - 1);
                }
            }
        });
    }
    else {
        window.location.href = "/Login/Index";
    }
}

function addProductoToCart(codigoInterno, pk_eProducto) {
    $(".loading").show();
    var claseCondicion = "";
    var cantidadProducto = 1;
    fetch(`/Producto/ConsultaStock?codigoInterno=${codigoInterno}`)
        .then(resultado => resultado.json())
        .then(respuesta => {
            if (respuesta.stock <= 0) {
                swal.fire("Fuera de stock!", respuesta.MessageError, "info");
                $(".loading").hide();
            }
            else {
                fetch(`/Producto/ConsultaStock?codigoInterno=${codigoInterno}`)
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
                                                pk_eProducto: pk_eProducto,
                                                eCantidad: cantidadProducto,
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
                                                        mpolRefreshItem(true);
                                                        window.location.href = "/ShoppingCart";
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

                                        if (carritoPedido.some(p => p.pk_eProducto === pk_eProducto)) {
                                            $.each(carritoPedido, function (i, e) {

                                                if (e.pk_eProducto === pk_eProducto) {

                                                    let cantidadTotal = e.eCantidad + cantidadProducto

                                                    if (claseCondicion === 'btnComprarAhora') {
                                                        e.eCantidad = cantidadTotal > respuesta.stock ? respuesta.stock : e.eCantidad + cantidadProducto;
                                                        mpolLocalStorage("mpol_carritotemporal").set(i, e);
                                                        window.location.href = "/CheckOut/";
                                                    }
                                                    else {
                                                        if (cantidadTotal <= respuesta.stock) {
                                                            e.eCantidad = cantidadTotal;
                                                            mpolLocalStorage("mpol_carritotemporal").set(i, e);
                                                            window.location.href = "/ShoppingCart";
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
                                                pk_eProducto: pk_eProducto,
                                                eCantidad: cantidadProducto
                                            });

                                            if (claseCondicion === 'btnComprarAhora')
                                                window.location.href = "/CheckOut/";
                                            else {
                                                window.location.href = "/ShoppingCart";
                                            }
                                        }
                                        $(".loading").hide();
                                        mpolRefreshItem(false);
                                        //window.location.replace("/CheckOut/");
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
        });
    }
