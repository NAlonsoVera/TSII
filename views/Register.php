<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='http://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900' rel='stylesheet' type='text/css'>
    <title>Registro - Master in Pets</title>
    <link rel="stylesheet" href="../template/vendor/fontawesome/css/font-awesome.css"/>
    <link rel="stylesheet" href="../template/vendor/animate.css/animate.css"/>
    <link rel="stylesheet" href="../template/vendor/bootstrap/css/bootstrap.css"/>
    <link rel="stylesheet" href="../template/styles/pe-icons/pe-icon-7-stroke.css"/>
    <link rel="stylesheet" href="../template/styles/pe-icons/helper.css"/>
    <link rel="stylesheet" href="../template/styles/stroke-icons/style.css"/>
    <link rel="stylesheet" href="../template/styles/style.css">
    <style>
        .error-message {
            color: red;
            display: none;
            font-size: 0.8em;
        }
        .container-center {
            max-width: 60%; 
            margin: 50px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body class="blank">
<div class="wrapper">
    <section class="content">
        <div class="container-center animated slideInDown">
            <div class="view-header">
                <div class="header-title">
                    <h3>Registro</h3>
                    <small>Por favor ingrese sus datos para registrarse.</small>
                </div>
            </div>

            <div class="panel panel-filled">
                <div class="panel-body">
                    <form id="registroForm">
                        <div class="form-group">
                            <label for="nombres">Nombres</label>
                            <input type="text" class="form-control" id="nombres" placeholder="Ingresar Nombres" required>
                            <span class="error-message">Campo obligatorio</span>
                        </div>
                        <div class="form-group">
                            <label for="apellido">Apellido</label>
                            <input type="text" class="form-control" id="apellido" placeholder="Ingresar Apellido" required>
                            <span class="error-message">Campo obligatorio</span>
                        </div>
                        <div class="form-group">
                            <label for="correo">Correo</label>
                            <input type="email" class="form-control" id="correo" placeholder="Ingresar Correo" required>
                            <span class="error-message">Correo no válido</span>
                        </div>
                        <div class="form-group">
                            <label for="Dni">Dni</label>
                            <input type="email" class="form-control" id="Dni" placeholder="Ingresar DNI" required>
                            <span class="error-message">Campo obligatorio</span>
                        </div>
                        <div class="form-group">
                            <label for="telefono">Teléfono</label>
                            <input type="int" class="form-control" id="telefono" placeholder="Ingresar Teléfono" required>
                            <span class="error-message">Campo obligatorio</span>
                        </div>
                        <div class="form-group">
                            <label for="direccion">Dirección</label>
                            <input type="text" class="form-control" id="direccion" placeholder="Ingresar Dirección" required>
                            <span class="error-message">Campo obligatorio</span>
                        </div>
                        <div class="form-group">
                            <label for="password">Contraseña</label>
                            <input type="password" class="form-control" id="password" placeholder="Ingresar Contraseña" required>
                            <span class="error-message">Campo obligatorio</span>
                        </div>
                        <div class="form-group">
                            <label for="repeatPassword">Repetir Contraseña</label>
                            <input type="password" class="form-control" id="repeatPassword" placeholder="Repetir Contraseña" required>
                            <span class="error-message">Las contraseñas no coinciden</span>
                        </div>
                        <div class="text-center">
                            <button type="button" onclick="register()" class="btn btn-success">Registrar</button>
                            <a class="btn btn-default" href="../index.php">Cancelar</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</div>

<script src="../template/vendor/pacejs/pace.min.js"></script>
<script src="../template/vendor/jquery/dist/jquery.min.js"></script>
<script src="../template/vendor/bootstrap/js/bootstrap.min.js"></script>
<script>
function register() {
    var nombres = $('#nombres').val();
    var apellido = $('#apellido').val();
    var correo = $('#correo').val();
    var telefono = $('#telefono').val();
    var direccion = $('#direccion').val();
    var password = $('#password').val();
    var repeatPassword = $('#repeatPassword').val();
    var dni = $('#Dni').val();
    var error = false; 

    if (!nombres.trim()) {
        $('#nombres').next('.error-message').text('Campo obligatorio').show();
        error = true;
    } else {
        $('#nombres').next('.error-message').hide();
    }

    if (!apellido.trim()) {
        $('#apellido').next('.error-message').text('Campo obligatorio').show();
        error = true;
    } else {
        $('#apellido').next('.error-message').hide();
    }

    if (!correo.trim()) {
        $('#correo').next('.error-message').text('Campo obligatorio').show();
        error = true;
    } else {
        $('#correo').next('.error-message').hide();
    }
    if (!dni.trim()){
        $('#Dni').next('.error-message').text('Campo obligatorio').show();
        error = true;
    }else{
        $('#Dni').next('.error-message').hide();
    }

    if (!telefono.trim()) {
        $('#telefono').next('.error-message').text('Campo obligatorio').show();
        error = true;
    } else if (!/^\d+$/.test(telefono)) {  
        $('#telefono').next('.error-message').text('Ingrese un número válido').show();
        error = true;
    } else {
        $('#telefono').next('.error-message').hide();
    }


    if (!direccion.trim()) {
        $('#direccion').next('.error-message').text('Campo obligatorio').show();
        error = true;
    } else {
        $('#direccion').next('.error-message').hide();
    }

    if (!password.trim()) {
        $('#password').next('.error-message').text('Campo obligatorio').show();
        error = true;
    } else {
        $('#password').next('.error-message').hide();
    }

    if (!repeatPassword.trim()) {
        $('#repeatPassword').next('.error-message').text('Campo obligatorio').show();
        error = true;
    } else {
        $('#repeatPassword').next('.error-message').hide();
    }

    if (password.trim() && repeatPassword.trim() && password !== repeatPassword) {
        $('#repeatPassword').next('.error-message').text('Las contraseñas no coinciden').show();
        error = true;
    }

    if (!error) {
    $.ajax({
        url: '/tf/controllers/Cliente/RegistrarCliente.php',
        type: 'POST',
        async : false,
        data: {
            nombres: nombres,
            apellido: apellido,
            correo: correo,
            dni: dni,
            telefono: telefono,
            direccion: direccion,
            password: password
        },
        success: function(response) {
            console.log('Registro exitoso:', response);
           // alert('Registro completado exitosamente.');
        },
        error: function(xhr) {
            console.error('Error de registro:', xhr.responseText);
            //alert('Error al registrar.');
        }
    });
}
}
</script>
</body>
</html>
