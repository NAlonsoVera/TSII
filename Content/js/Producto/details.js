var OnSuccessCalificacion, OnFailureCalificacion;
$(function () {
    var $frm = $("#frmCalificacionMant");
    const $btnAgregarCarrito = $("#btnAgregarCarrito");
    const $iptCantProducto = $("#iptCantProducto");
    const $pkProducto = $("input[type=hidden]#pk_eProducto");
    var $lstComentario = $(".lstComentario");
    const codigoInterno = $("#cCodigoInterno");


    ConsultarFavoritos();

    $(".products-gallery").easyZoom({
        width: 500,
        height:500,
        position: 'center',
        background:'#222'
    })

    $btnAgregarCarrito.on("click", function () {
        agregarProducto("");
    });

    $("#btnPlus,#btnMinus").on("click", function () {
        const $this = $(this);
        const valorcant = $this.hasClass("deleteCantProduct") ? -1 : 1;
        let stockActual = parseInt($(".stock-details").attr("data-stock"));
        let cantidadProducto = parseInt($iptCantProducto.val());

        if ($this.hasClass("addCantProduct") && cantidadProducto >= 1 && cantidadProducto < stockActual)
        {
            $iptCantProducto.val(cantidadProducto + valorcant);
        }
        else if ($this.hasClass("deleteCantProduct") && cantidadProducto > 1) {
            $iptCantProducto.val(cantidadProducto + valorcant);
        }
    });

    function CargarContenedorComentarioGeneral() {

        let pk_eProducto = parseInt($pkProducto.val());
        $.ajax({
            url: `/Producto/ObtenerCalificacionGeneral?pk_eProducto=${pk_eProducto}`,
            type: "GET",
            dataType: "json",
            success: function (data) {

                $(".commentary").html("");

                $(".commentary").append(`
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

    $lstComentario.on("click", "li>.btnYes", function () {

        $this = $(this).attr("data-pk");

        $.ajax({
            url: `/Producto/UsefulAnswer?id=${$this}&eTipo=1`,
            type: "POST",
            success: function (data) {
                if (data.Success === true) {
                    ListaComentario();
                }
            }
        });
    });

    $lstComentario.on("click", "li>.btnNo", function () {

        $this = $(this).attr("data-pk");
           
        $.ajax({
            url: `/Producto/UsefulAnswer?id=${$this}&eTipo=2`,
            type: "POST",
            success: function (data) {
                if (data.Success === true) { 
                    ListaComentario();
                }
            }
        });          
    });

    /*$(".btn-Favorites").on("click", function () {
        var pk_eCliente = $("#pk_eCliente").val();

        if (pk_eCliente !== "") {
            $.ajax({
                url: `/Producto/AddFavorites/${$("#pk_eProducto").val()}`,
                type: "POST",
                success: function (data) {
                    if (data.MessageError == "agregó a ") {
                        $(".btn-Favorites").text("ELIMINAR DE FAVORITOS");
                    } else {
                        $(".btn-Favorites").text("AGREGAR DE FAVORITOS");
                    }
                }
            });
        }
        else
        {
            window.location.href = "/Login/Index";
        }
    });*/

    OnSuccessCalificacion = function (data) {
        $frm.find("span[data-valmsg-for]").text("");

        if (data.Success) {
            $frm[0].reset();
            CargarContenedorComentarioGeneral();
            ListaComentario();
        } else {
            if (data.Errors) {
                $.each(data.Errors, function (i, item) {
                    if ($("span[data-valmsg-for=" + item.Key + "]")[0])
                        $("span[data-valmsg-for=" + item.Key + "]").text(item.Message);
                });
            }

            //swal.fire("Algo Salio Mal!", data.MessageError ? data.MessageError : "Verifique los campos ingresados", "error");
        }
    };

    OnFailureCalificacion = function (data) {
        swal.fire("Algo Salio Mal!", data.Error, "error");
    };


    $("#filter").on("change", function() {
        ListaComentario();
    })

    $(".btnComprarAhora").on("click", function () {
        agregarProducto("btnComprarAhora");
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
                                                if ($("#mobile").css('display') == 'none') {
                                                    window.location.href = "/ShoppingCart";
                                                } else {
                                                    if ($("#mobile").css('display') == 'none') {
                                                        window.location.href = "/ShoppingCart";
                                                    } else {
                                                        ConfirmarProducto(parseInt($pkProducto.val()));
                                                        mpolRefreshItem(true);
                                                    }  
                                                }
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
                                                    if ($("#mobile").css('display') == 'none') {
                                                        window.location.href = "/ShoppingCart";
                                                    } else {
                                                        ConfirmarProducto(parseInt($pkProducto.val()))
                                                    }
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
                                    else {
                                        if ($("#mobile").css('display') == 'none') {
                                            window.location.href = "/ShoppingCart";
                                        } else {
                                            ConfirmarProducto(parseInt($pkProducto.val()))
                                        }
                                    }
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

            })

    }

    function ConfirmarProducto(pk_eProducto) {

        $.ajax({
            url: "/Producto/PartialProductoConfirmed?id=" + pk_eProducto,
            dataType: "html",
            success: function (data) {
                $("body").append(data);
            }
        });
    }

    function CargarContenedorComentarioGeneral2() {

        let pk_eProducto = parseInt($pkProducto.val());
        $.ajax({
            url: `/Producto/ObtenerCalificacionGeneral?pk_eProducto=${pk_eProducto}`,
            type: "GET",
            dataType: "json",
            success: function (data) {

                $(".commentary").html("");

                $(".commentary").append(
                    `
                <div class="row">
                <div class="col-md-6 text-valoration-star">
                    <p>Calificación general del <br> usuario:</p>
                    <span>${data.dCalificacionTotal} ${(data.dCalificacionTotal == 1 ? "estrella" : "estrellas")} de ${data.eComentarioTotal} comentarios</span>

                    <div class="valoration-star">
                        <fieldset class="rating">
                            <img style="height: 23px;" src="/Content/image/star/${data.cImagenEstrella}" alt="">
                        </fieldset>
                    </div>
                    <div class="linea-separator-star"></div>
                </div>

                <div class="col-md-6 number-valoration-star">
                    <ul class="list-stars-rating">
                        <li>
                            <div class="row">
                                <div class="col-lg-4 col-md-4 col-sm-3 col-xs-4 text-left-mobile">
                                    <img src="/Content/image/product/star-five-rt.png" alt="">
                                </div>
                                <div class="col-lg-8 col-md-8 col-sm-9 col-xs-8">
                                    <div class="content-progress">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style="width: ${data.dPorcentajeComentarioCinco}%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div class="content-number-valoration"><span>${data.eComentarioCinco}</span></div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="col-lg-4 col-md-4 col-sm-3 col-xs-4 text-left-mobile">
                                    <img src="/Content/image/product/star-four.png" alt="">
                                </div>
                                <div class="col-lg-8 col-md-8 col-sm-9 col-xs-8">
                                    <div class="content-progress">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style="width: ${data.dPorcentajeComentarioCuatro}%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div class="content-number-valoration"><span>${data.eComentarioCuatro}</span></div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="col-lg-4 col-md-4 col-sm-3 col-xs-4 text-left-mobile">
                                    <img src="/Content/image/product/star-three.png" alt="">
                                </div>
                                <div class="col-lg-8 col-md-8 col-sm-9 col-xs-8">
                                    <div class="content-progress">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style="width: ${data.dPorcentajeComentarioTres}%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div class="content-number-valoration"><span>${data.eComentarioTres}</span></div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="col-lg-4 col-md-4 col-sm-3 col-xs-4 text-left-mobile">
                                    <img src="/Content/image/product/star-two.png" alt="">
                                </div>
                                <div class="col-lg-8 col-md-8 col-sm-9 col-xs-8">
                                    <div class="content-progress">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style="width: ${data.dPorcentajeComentarioDos}%" aria-valuenow="5" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div class="content-number-valoration"><span>${data.eComentarioDos}</span></div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div class="col-lg-4 col-md-4 col-sm-3 col-xs-4 text-left-mobile">
                                    <img src="/Content/image/product/star-one.png" alt="">
                                </div>
                                <div class="col-lg-8 col-md-8 col-sm-9 col-xs-8">
                                    <div class="content-progress">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style="width: ${data.dPorcentajeComentarioUno}%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div class="content-number-valoration"><span>${data.eComentarioUno}</span></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
                    `
                );

            }
        });
    }

    function ListaComentario() {
        $.ajax({
            url: `/Producto/ListaCalificacion?id=${parseInt($pkProducto.val())}&eTipo=${$("#filter").val()}`,
            type: "GET",
            dataType: "json",
            success: function (data) {
                
                if (data) {
                    $(".lstComentario").html("");

                    $.each(data, function (i, val) {
                        console.log(val)
                        $(".lstComentario").append(`
                                    <div class="content-calification-filter text-justify">
									        <div class="content-comment-valoration">
										        <img class="imgStar" src="/Content/image/star/${val.dCalificacion == 0.5 ? 'star-half.jpg' : val.dCalificacion == 1 ? "star1.jpg" : val.dCalificacion == 1.5 ? "star1-half.jpg" : val.dCalificacion == 2 ? "star2.jpg" : val.dCalificacion == 3.5 ? "star3-half.jpg" : val.dCalificacion == 4 ? "star4.jpg" : val.dCalificacion == 4.5 ? "star4-half.jpg" : val.dCalificacion == 2.5 ? "star2-half.jpg" : val.dCalificacion == 3 ? "star3.jpg" : "star5.jpg"}" alt="${val.dCalificacion}"  style="height: 20px;" >
										        <p>
											        ${val.ls[0].cComentario}
										        </p>
										        <div class="row">
											        <div class="col-md-6 name-client">
												        <p>${val.ls[0].cCliente} el ${new Date(val.fFechaCrea).format("dd-mm-yyyy")}</p>
											        </div>
											        <div class="col-md-6 confirm-client">
												        <ul>
													        <li><p>¿Te fué util esta respuesta?</p></li>
													        <li><a href="javascript:void(0)" class="btnYes" data-pk="${val.pk_eProductoCalificacion}"> Si <span>(${val.eCantidadSi == null ? '0' : val.eCantidadSi})</span></a></li>
													        <li><a href="javascript:void(0)" class="btnNo" data-pk="${val.pk_eProductoCalificacion}"> No <span>(${val.eCantidadNo == null ? '0' : val.eCantidadNo})</span></a></li>
												        </ul>
											        </div>
										        </div>
									        </div>
                                           ${val.ls[0].cRespuesta ? ` <div class="content-comment-valoration response">
											        <div class="content-text-admin">
												        <p>${val.ls[0].cRespuesta}</p>
												        <div class="row">
													        <div class="col-md-12 name-admin">
														        <p>Usuario de Gustilandia</p>
													        </div>
												        </div>
											        </div>

									        </div>`: ``}
                                    </div>
                            `);
                    });
                }
            }
        });

    }

    function ConsultarStock() {
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

    function ConsultarFavorito() {
        const pk_eCliente = $("#pk_eCliente").val();
        const pk_eProducto = parseInt($pkProducto.val());
        if (pk_eCliente !== "") {
            $.ajax({
                url: `/Producto/FavoritoCliente?pk_eCliente=${pk_eCliente}&pk_eProducto=${pk_eProducto}`,
                type: "POST",
                success: function (data) {
                    if (data != undefined) {
                        $(".btn-Favorites").text("ELIMINAR DE FAVORITOS");
                    }
                }
            });
        }
    }

    $(document).ready(function () {

        CargarContenedorComentarioGeneral();
        //ListaComentario();
        //ConsultarFavorito();
        ConsultarStock();
    });


})