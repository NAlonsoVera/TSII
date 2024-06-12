$(function () {


    function invocarmodalDireccion(id) {
        invocarModal(`/Login/PartialBuscaContra/${id ? id : ""}`,
            function (data) {
                $(".loading").hide();
                $("#modalBuscaContra").on("hidden.bs.modal");
            });
    }

    $("#btnContra").on("click", function () { $(".loading").show(); invocarmodalDireccion(); });

    $(".toggle-password").click(function () {

        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    //function onSignIn(googleUser) {
    //    var profile = googleUser.getBasicProfile();
    //    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    //    console.log('Name: ' + profile.getName());
    //    console.log('Image URL: ' + profile.getImageUrl());
    //    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    //}
})