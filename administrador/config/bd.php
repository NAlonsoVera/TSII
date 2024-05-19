<?php
$servername = "localhost";
$username = "root";
$password = "usbw";
$database = "empresa_bd";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
} else {
    echo "<script>console.log('Conectado exitosamente a la base de datos');</script>";
}
?>
