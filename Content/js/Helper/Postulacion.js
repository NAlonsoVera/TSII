var OnSuccessPostulacion, OnFailurePostulacion;
$(function () {


    const $frmPostulacionMant = $("#frmPostulacionMant");

    OnSuccessPostulacion = function (data) {
        $frmPostulacionMant.find("span[data-valmsg-for]").text("");
        if (data.Success) {
            swal.fire("Bien!", "Tu postulación ha sido enviada.", "success");
            $(".loading-tesoro").hide();
            $frmPostulacionMant[0].reset();
            grecaptcha.reset();

        } else {
            $(".loading-tesoro").hide();
            swal.fire("Alerta!", data.MessageError, "info");
        }
    };

    OnFailurePostulacion = function () {
        $(".loading-tesoro").hide();
        swal.fire("Algo Salio Mal!", "Algo salio mal en el Servidor", "error");
    };

});