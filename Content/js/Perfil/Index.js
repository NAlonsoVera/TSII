var OnSuccessMantenimientoClienteFacturacion, OnFailureMantenimientoClienteFacturacion;

var OnSuccessDireccion;
var OnFailureDireccion;

$(function () {

    var $frmMantenimientoClienteDatosFacturacion = $("#frmMantenimientoClienteDatosFacturacion");
    const listadoDirecciones = document.querySelector("#listadoDirecciones");

    OnSuccessMantenimientoClienteFacturacion = function (data) {
        $frmMantenimientoClienteDatosFacturacion.find("span[data-valmsg-for]").text("");
        if (data.Success) {
            window.location.reload(true);
        } else {
            if (data.Errors) {
                console.log(data.Errors)
                $.each(data.Errors, function (i, item) {
                    if ($("span[data-valmsg-for=" + item.Key + "]").length !== 0)
                        $("span[data-valmsg-for=" + item.Key + "]").text(item.Message);
                });
            }
        }
    };


    $("#btnNuevaDireccion").on("click", function () {
        invocarmodalDireccion();
    });

    $(".btnCancelar").on("click",
        function () {

            let pkPedido = $(this).attr("data-pkPedido");
            $(`.divCancelar-${pkPedido}`).fadeToggle();
            $(this).hide()
        });

    $(".btnCancelarCancelacion").on("click",
        function () {

            let pkPedido = $(this).attr("data-pkPedido");
            $(`.divCancelar-${pkPedido}`).fadeToggle();
            $(`.btnCancelar[data-pkPedido=${pkPedido}]`).show()

        });

    $(".Select").on("change", function () {
        $this = $(this).val();

        let $divContenedor = $(this).closest("#div");

        if ($this != 0) {
            $divContenedor.find(".Selected").removeAttr("disabled", false);

        } else {
            $divContenedor.find(".Selected").attr("disabled", true);
            $divContenedor.find(`btnSeguro-${$divContenedor.find("input[name=pk_ePedido]").val()}`).attr("disabled", true);
            $divContenedor.find(".Selected").val(0);
        }
    });

    $(".Selected").on("change",
        function () {
            $this = $(this).val();
            let pkPedido = $(this).closest("#div").find("input[name=pk_ePedido]").val();

            if ($this != 0) {
                $(`.btnSeguro-${pkPedido}`).removeAttr("disabled", false);

            } else {
                $(`.btnSeguro-${pkPedido}`).attr("disabled", true);
            }
        });

    $(".toggle-password").click(function () {

        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    mostrarListadoDirecciones();

    function mostrarListadoDirecciones() {

        limpiarDireccionesHTML();

        fetch("/Perfil/ListadoDireccion")
            .then(resultado => resultado.json())
            .then(data => {

                data.data.forEach(direccion => {

                    const { cDireccion, cDistrito, cReferencia, cTelefono, pk_eClienteDireccionEnvio } = direccion;
                    listadoDirecciones.innerHTML +=
                        `
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">  
                        <div class="card" >
                          <div class="card-body">
                            <h6 class="card-subtitle mb-2 text-muted">${cDireccion}</h6>
                            <p class="card-text">
                                <strong>Referencia:</strong> ${cReferencia != null ? cReferencia : ""} </br>
                                <strong>Distrito:</strong> ${cDistrito} </br>
                                <strong>Teléfono:</strong> ${cTelefono != null ? cTelefono : ""} </br>
                            </p>

                            <ul style="display:flex; list-style: none">
                                <li><button type="button" class="btnEditarDireccion btn btn-info" data-pkdireccion="${pk_eClienteDireccionEnvio}" >Editar</button></li>
                                <li><button type="button" class="btnEliminarDireccion btn btn-danger" data-pkdireccion="${pk_eClienteDireccionEnvio}" >Eliminar</button></li>
                            </ul>
                          </div>
                        </div> 
                    </div>
                    `
                });

            });
    }

    listadoDirecciones.addEventListener("click", editarDireccion);


    $("#fk_cDepartamento").on("change", function () {
        const parameters = {};
        if ($(this).val() !== "") parameters.pk_cDepartamento = $(this).val();
        cascadingDropDownLoad($("#fk_cProvincia"), "/Perfil/ProvinciaPorDepartamento2", parameters, null, "Provincia");
    });

    $("#fk_cProvincia").on("change", function () {
        const parameters = {};
        if ($(this).val() !== "") parameters.pk_cProvincia = $(this).val();
        cascadingDropDownLoad($("#fk_cDistrito"), "/Perfil/DistritoPorProvincia2", parameters, null, "Distrito");
    });

    function cascadingDropDownLoad($dropDown, urlRequest, parameters, onComplete, name) {
        actionAjax(urlRequest, parameters, "GET", function (data) {
            if (data) {
                $dropDown.html("<option value>" + name + "</option>");
                $.each(data, function (i, e) {
                    $dropDown.append(`<option value="${e.Value}">${e.Text}</option>`);
                });
                if (onComplete) onComplete();
            }
        });
    }

    function actionAjax(url, parameters, type, onSuccess, isToConfirm, msgSuccess) {
        $.ajax({
            url: url,
            data: parameters,
            type: type,
            cache: false,
            success: function (data) {
                if (isToConfirm === true) {
                    if (data.Success === true) {
                        swal("Bien!", msgSuccess ? msgSuccess : "Proceso realizado Correctamente", "success");
                        if (onSuccess) onSuccess(data);
                    } else {
                        swal("Algo Salio Mal!", data.Message, "error");
                    }
                } else {
                    if (onSuccess) onSuccess(data);
                }
            },
            beforeSend: function () {
                if (isToConfirm !== true) $("#loading").show();
            },
            complete: function () {
                if (isToConfirm !== true) $("#loading").hide();
            }
        });
    }


    var $frm = $("#frmDireccionMant");

    OnSuccessDireccion = function (data) {
        $frm.find("span[data-valmsg-for]").text("");
        if (data.Success) {
            $frm[0].reset();
            mostrarListadoDirecciones();
        } else {
            if (data.Errors) {
                $.each(data.Errors, function (i, item) {
                    if ($("span[data-valmsg-for=" + item.Key + "]")[0])
                        $("span[data-valmsg-for=" + item.Key + "]").text(item.Message);
                });
            }
        }
    };

    OnFailureDireccion = function () {
        swal("Algo salió mal!", "Ocurrio un error al guardar la dirección", "error");
    };


    function invocarmodalDireccion(id) {
        $(".loading").show();
        actionAjax("/Perfil/BuscarDirrecion", { id: id }, "GET", function (data) {

            $frm.find("input#pk_eClienteDireccionEnvio").val(data.data.pk_eClienteDireccionEnvio);

            $frm.find("select#fk_cDepartamento").val(data.data.fk_cDepartamento);
            $frm.find("select#fk_cProvincia").html("").append('<option value=' + data.data.fk_cProvincia + '>' + data.data.cProvincia + '</option>');
            $frm.find("select#fk_cDistrito").html("").append('<option value=' + data.data.fk_cDistrito + '>' + data.data.cDistrito +'</option>');
            $frm.find("input#cTelefono").val(data.data.cTelefono);
            $frm.find("input#cDireccion").val(data.data.cDireccion);

            console.log(data);
        });



        //invocarModal(`/Perfil/PartialDireccionMant/${id ? id : ""}`, function () {
        //    $(".loading").hide();
        //    $("#modalDireccionesMant").on("hidden.bs.modal", function () {
        //        mostrarListadoDirecciones();
        //    });
        //});
    }

    
    function editarDireccion(e) {

        if (event.target.type === 'button') {
            const pk_eDireccionEnvio = e.target.dataset.pkdireccion

            if (e.target.classList.contains('btnEditarDireccion')) {
                invocarmodalDireccion(pk_eDireccionEnvio)
            }
            else {
                fetch(`/Perfil/EliminarDireccion?id=${parseInt(pk_eDireccionEnvio)}`)
                    .then(resultado => resultado.json())
                    .then(data => {
                        console.log(data)
                        if (data.Success)
                            mostrarListadoDirecciones();
                    })
            }
        }
        
    }


    function limpiarDireccionesHTML() {
        while (listadoDirecciones.firstChild) {
            listadoDirecciones.removeChild(listadoDirecciones.firstChild);
        }
    }
})