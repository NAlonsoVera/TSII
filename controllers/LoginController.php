<?php
include('../administrador/config/bd.php');

$email = $_POST['username'];
$password_user = $_POST['password'];
$sql = "SELECT * FROM usuario WHERE cCorreo = '".$email."' AND cPassword = '".$password_user."'";
$conn = conectar();
$result = mysqli_query($conn, $sql);
if ($result->num_rows > 0) {
    session_start();
    $_SESSION['session_email'] = $email; 
    echo 'success';  // Asegúrate de enviar esta respuesta
} else {
    echo 'error';  // Enviar una respuesta de error si las credenciales son incorrectas
}

desconectar($conn);

?>
