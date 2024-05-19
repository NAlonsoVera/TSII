<?php


if (!empty($_POST["btningresar"])) {
    if (empty($_POST["username"]) || empty($_POST["password"])) {
        echo '<div class="alert alert-danger">LOS CAMPOS ESTÁN VACÍOS</div>';
    } else {
        require 'administrador/config/bd.php';

        $usuario = $_POST["username"];
        $clave = $_POST["password"];

        $stmt = $conn->prepare("SELECT * FROM usuarios WHERE cNombre  = ? AND cPassword  = ?");
        $stmt->bind_param("ss", $usuario, $clave);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            echo "<script>console.log('yei');</script>";
        } else {
            echo '<div class="alert alert-danger">ACCESO DENEGADO</div>';

        }
        $stmt->close();
        $conn->close();
    }
}
?>
