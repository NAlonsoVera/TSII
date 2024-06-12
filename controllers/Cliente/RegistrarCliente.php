<?php
include('../../administrador/config/bd.php');

$nombres = $_POST['nombres'];
$apellido = $_POST['apellido'];
$correo = $_POST['correo'];
$dni = $_POST['dni'];
$telefono = $_POST['telefono'];
$direccion = $_POST['direccion'];
$password = $_POST['password'];

$conn = conectar();

$passwordHash = password_hash($password, PASSWORD_DEFAULT); 
$sqlUsuario = "INSERT INTO Usuario (fkRol, cNombre, cCorreo, cPassword) VALUES (3, '$nombres', '$correo', '$passwordHash')";
if (mysqli_query($conn, $sqlUsuario)) {
    $userId = mysqli_insert_id($conn);  

   
    $sqlCliente = "INSERT INTO Cliente (fkUsuario, cDNI, cNombre, cApellido, cCorreo, cTelefono, cDireccion) 
                   VALUES ('$userId', '$dni', '$nombres', '$apellido', '$correo', '$telefono', '$direccion')";
    if (mysqli_query($conn, $sqlCliente)) {
        $msg = "Usuario y cliente registrados exitosamente.";
    } else {
        $msg = "Error al registrar en Cliente: " . mysqli_error($conn);
    }
} else {
    $msg = "Error al registrar en Usuario: " . mysqli_error($conn);
}

desconectar($conn);


?>
