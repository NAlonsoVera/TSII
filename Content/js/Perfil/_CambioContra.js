var OnSuccessContra;
var OnFailureContra;
$(function () {
    var $frm = $("#frmContraMant");
    OnSuccessContra = function (data) {

        $frm.find("span[data-valmsg-for]").text("");
        if (data.Success == true) {
            swal.fire("Bien!", "Su contraseña de ha actualizado exitosamente.", "success");
           $frm[0].reset();
            
        } else {
            if (data.Errors) {
                $.each(data.Errors, function (i, item) {
                    if ($("span[data-valmsg-for=" + item.Key + "]")[0])
                        $("span[data-valmsg-for=" + item.Key + "]").text(item.Message);
                });
            }
        }
    };
    OnFailureContra = function () {
        swal.fire("Algo salio mal!", "Ocurrio un error al Guardar cambios.", "error");
    };

})