$(function (){
  
    $("#chkNewsletter").change("click", function () {

        if ($(this).is(":checked") != true) {
            $("#btnRegistrar").attr("disabled", true);
        } else {
            $("#btnRegistrar").removeAttr("disabled", false);
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

});

