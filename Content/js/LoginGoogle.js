
function cerrarSesion() {
    
    if (localStorage.getItem("usuarioGoogle")) {

        localStorage.removeItem("usuarioGoogle");
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            gapi.auth2.getAuthInstance().disconnect();
        });
       
    }
}


function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    if (!localStorage.getItem("usuarioGoogle")) {
        $(".loading").show();
        const usuario = {
            cNombre: profile.getGivenName(),
            cPaterno: profile.getFamilyName(),
            cEmail: profile.getEmail()
        }

        localStorage.setItem("usuarioGoogle", usuario.cEmail);

        const opcion = window.location.pathname.includes("Register") ? 1 : 0;
        const encriptado = encryptarUsuario(usuario);

        registrarUsuarioGoogleOFacebook(({ encriptado, opcion }));
    }

}

function onFailure(error) {
    console.log(error);
}

function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 35,
        'longtitle': true,
        //'theme': 'dark',
        'text': 'asasdas',
        'onsuccess': onSignIn,
        'onfailure': onFailure
    });
}

function onLoad() {
    gapi.load('auth2', function () {
        gapi.auth2.init();
    });

    renderButton();
}


document.addEventListener("DOMContentLoaded", () => {
    setTimeout(function () {
        $('#my-signin2 div div span span:last').text("Google");
        $('#my-signin2 div div span span:first').text("Google");
        $('#my-signin2 div div span span:last').css("font-family", "Arial");//for font formatting
        $('#my-signin2 div div span span:first').css("font-family", "Arial");//for font formatting
    }, 2000);
})


