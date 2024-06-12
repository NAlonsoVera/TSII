(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

const appId = "400763174572330";
const scope = "public_profile, email";

window.fbAsyncInit = function () {
    FB.init({
        appId: appId,
        cookie: true,
        status: true,
        xfbml: true,
        version: 'v9.0',
    });

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};




function statusChangeCallback(response) {
    if (response.status === 'connected') {
        callLoginAPI();
    }
}


function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}



function login() {
    FB.login(function (response) {
        statusChangeCallback(response)
    }, { scope: 'email', auth_type: 'reauthorize' });
}


function callLoginAPI() {

    FB.api('/me', { fields: 'name, email, first_name, last_name, gender' }, function (response) {

        if (!localStorage.getItem("usuarioFacebook")) {
            $(".loading").show();
            const usuario = {
                cNombre: response.first_name,
                cPaterno: response.last_name,
                cEmail: response.email
            }

            localStorage.setItem("usuarioFacebook", usuario.cEmail);

            const opcion = window.location.pathname.includes("Register") ? 1 : 0;
            const encriptado = encryptarUsuario(usuario);

            registrarUsuarioGoogleOFacebook(({ encriptado, opcion }));
        }
    });
}

function CerrarSesionFacebook() {

    if (localStorage.getItem("usuarioFacebook")) {

        localStorage.removeItem("usuarioFacebook");
        FB.logout(function (response) {
            statusChangeCallback(response);
        });
    }
}