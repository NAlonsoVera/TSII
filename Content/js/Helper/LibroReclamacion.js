var OnSuccessLB, OnFailureLB;
$(function () {
    var $frm = $("#frmLBMant");

    OnSuccessLB = function (data) {

        $frm.find("span[data-valmsg-for]").text("");
        if (data.Success == true) {
            swal.fire("Bien!", "Su reclamo se ha enviado exitosamente.", "success");
            $frm[0].reset();
            window.location.href = "/"
        } else {
            if (data.Errors) {
                $.each(data.Errors, function (i, item) {
                    if ($("span[data-valmsg-for=" + item.Key + "]")[0])
                        $("span[data-valmsg-for=" + item.Key + "]").text(item.Message);
                });
            }
        }
    };
    OnFailureLB = function () {
        swal.fire("Algo Salio Mal!", "Ocurrio un error al enviar su reclamo.", "error");
    };
})