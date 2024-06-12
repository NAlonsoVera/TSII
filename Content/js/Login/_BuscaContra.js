var OnSuccessContra, OnFailureContra;
$(function () {
    const $modalBuscaContra = $('#modalBuscaContra');

    OnSuccessContra = function (data) {
        //frmBuscaContra.find("span[data-valmsg-for]").text("");
        if (data.Success === true) {
            swal.fire("Bien!", "Contraseña enviada. Verifique en su correo electrónico o en su bandeja de spam.", "success");
            $modalBuscaContra.modal("hide");
                frmBuscaContra.reset();

        } else {
            swal.fire("Algo salió mal!", "Este correo electrónico no se encuentra registrado.", "error");
            if (data.Errors) {
                $.each(data.Errors, function (i, item) {
                    if ($("span[data-valmsg-for=" + item.Key + "]").length !== 0)
                        $("span[data-valmsg-for=" + item.Key + "]").text(item.Message);
                });
            }
        }
    };

    OnFailureContra = function () {
        swal.fire("Algo Salio Mal!", "Ocurrio un error al Guardar", "error");
    };


    $modalBuscaContra.on("hidden.bs.modal", function () {
        $(this).parent().remove();
    });

    $modalBuscaContra.modal("show");
});