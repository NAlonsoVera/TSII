<?php
require("administrador/config/bd.php");
require("controllers/LoginController.php");
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href='http://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900' rel='stylesheet' type='text/css'>

    <!-- Page title -->
    <title>LUNA | Responsive Admin Theme</title>

    <!-- Vendor styles -->
    <link rel="stylesheet" href="template/vendor/fontawesome/css/font-awesome.css"/>
    <link rel="stylesheet" href="template/vendor/animate.css/animate.css"/>
    <link rel="stylesheet" href="template/vendor/bootstrap/css/bootstrap.css"/>

    <!-- App styles -->
    <link rel="stylesheet" href="template/styles/pe-icons/pe-icon-7-stroke.css"/>
    <link rel="stylesheet" href="template/styles/pe-icons/helper.css"/>
    <link rel="stylesheet" href="template/styles/stroke-icons/style.css"/>
    <link rel="stylesheet" href="template/styles/style.css">
</head>
<body class="blank">

<!-- Wrapper-->
<div class="wrapper">

    <!-- Main content-->
    <section class="content">
        <div class="container-center animated slideInDown">
            <div class="view-header">
                <div class="header-icon">
                    <i class="pe page-header-icon pe-7s-unlock"></i>
                </div>
                <div class="header-title">
                    <h3>Login</h3>
                    <small>
                        Please enter your credentials to login.
                    </small>
                </div>
            </div>

            <div class="panel panel-filled">
                <div class="panel-body">
                    <form method="post" id="loginForm" novalidate>
                        <div class="form-group">
                            <label class="control-label" for="username">Username</label>
                            <input type="text" placeholder="example@gmail.com" title="Please enter your username" required="" name="username" id="username" class="form-control">
                            <span class="help-block small">Your unique username to app</span>
                        </div>
                        <div class="form-group">
                            <label class="control-label" for="password">Password</label>
                            <input type="password" title="Please enter your password" placeholder="******" required="" name="password" id="password" class="form-control">
                            <span class="help-block small">Your strong password</span>
                        </div>
                        <div>
                            
                            <input name="btningresar" class="btn" type="submit" value="LOGIN">
                            <a class="btn btn-default" href="register.html">Register</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <!-- End main content-->

</div>
<!-- End wrapper-->

<!-- Vendor scripts -->
<script src="template/vendor/pacejs/pace.min.js"></script>
<script src="template/vendor/jquery/dist/jquery.min.js"></script>
<script src="template/vendor/bootstrap/js/bootstrap.min.js"></script>

</body>
</html>
