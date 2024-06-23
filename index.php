    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href='http://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900' rel='stylesheet' type='text/css'>
        <title>Master in Pets</title>
        <link rel="stylesheet" href="template/vendor/fontawesome/css/font-awesome.css"/>
        <link rel="stylesheet" href="template/vendor/animate.css/animate.css"/>
        <link rel="stylesheet" href="template/vendor/bootstrap/css/bootstrap.css"/>
        <link rel="stylesheet" href="template/styles/pe-icons/pe-icon-7-stroke.css"/>
        <link rel="stylesheet" href="template/styles/pe-icons/helper.css"/>
        <link rel="stylesheet" href="template/styles/stroke-icons/style.css"/>
        <link rel="stylesheet" href="template/styles/style.css">
    </head>
    <body class="blank">
        <center>
    <div class="login-box">
        <section class="content">
            <div class="container-center animated slideInDown">
                <div class="view-header">
                    <center>
                        <img src="img/masterinpetslogo.png" alt="Master in Pets" width="80%">
                    </center>
                    <br>
                    <div class="header-title">
                        <small>Por favor ingrese sus credenciales.</small>
                    </div>
                </div>

                <div class="panel panel-filled">
                    <div class="panel-body">
                        <form id="loginForm">
                            <div class="form-group">
                                <label class="control-label" for="username">Correo</label>
                                <input type="text" placeholder="example@gmail.com" required="" id="username" class="form-control">
                                <span class="help-block small">Su correo propio para ingresar</span>
                            </div>
                            <div class="form-group">
                                <label class="control-label" for="password">Contraseña</label>
                                <input type="password" placeholder="******" required="" id="password" class="form-control">
                                <span class="help-block small">Su contraseña</span>
                            </div>
                            <div>
                                <center>
                                    <button type="button" onclick="login()" class="btn btn-accent">Ingresar</button>
                                    <a class="btn btn-default" href="views/Register.php">Registrarse</a>
                                </center>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
    </center>

    <script src="template/vendor/pacejs/pace.min.js"></script>
    <script src="template/vendor/jquery/dist/jquery.min.js"></script>
    <script src="template/vendor/bootstrap/js/bootstrap.min.js"></script>
    <script>
    function login() {
        var username = $('#username').val();
        var password = $('#password').val();

        $.ajax({
            url: 'controllers/LoginController.php',
            type: 'POST',
            async: false,
            data: {
                username: username,
                password: password
            },
            success: function(response) {
                console.log('Login response:', response);
                if (response.includes('success-admin')) { 
                    window.location.href = 'views/Layout.php'; // Admin layout
                } else if (response.includes('success-user')) {
                    window.location.href = 'views/LayoutGeneral.php'; // General user layout
                } else {
                    alert('Acceso denegado');  
                }
            },
            error: function(xhr) {
                console.error('Login failed:', xhr.responseText);  
            }
        });
    }


    </script>
    </body>
    </html>
