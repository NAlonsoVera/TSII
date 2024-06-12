var OnSuccessDireccion;
var OnFailureDireccion;

$(function () {
    var $modal = $("#modalDireccionesMant");
    var $frm = $modal.find("#frmDireccionMant");

    OnSuccessDireccion = function (data) {
        $frm.find("span[data-valmsg-for]").text("");
        if (data.Success) {
            console.log(data)
            $("#pk_eClienteDireccionEnvio").val(data.pk)
            //$modal.modal("hide");
          
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


    //$modal.on("hidden.bs.modal", function () {
    //    $(this).parent().remove();
    //});

    $modal.modal("show");
})