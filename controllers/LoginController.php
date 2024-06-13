<?php
include('../administrador/config/bd.php');

$email = $_POST['username'];
$password_user = $_POST['password'];
$sql = "SELECT * FROM usuario WHERE cCorreo = '".$email."'";
$conn = conectar();
$result = mysqli_query($conn, $sql);

if ($result->num_rows > 0) {
    $row = mysqli_fetch_assoc($result);

    // Verificar si el usuario es administrador (fkRol == 1)
    if ($row['fkRol'] == 1) {
        // Comparar directamente sin desencriptar para el administrador
        if ($password_user === $row['cPassword']) {
            session_start();
            $_SESSION['session_email'] = $email; 
            echo 'success-admin';  // Respuesta para éxito de login de administrador
        } else {
            echo 'error';  // Respuesta para error de login
        }
    } else {
        // Desencriptar y comparar para usuarios que no son administradores
        if (password_verify($password_user, $row['cPassword'])) {
            session_start();
            $_SESSION['session_email'] = $email;
            echo 'success-user'; // Respuesta para éxito de login de usuario
        } else {
            echo 'error';
        }
    }
} else {
    echo 'error';  // Usuario no encontrado
}

desconectar($conn);
?>
