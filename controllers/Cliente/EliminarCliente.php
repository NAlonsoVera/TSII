<?php

include('../../administrador/config/bd.php');

echo $_POST['id'];
// Obtenemos los valores del formulario
$id = $_POST['id'];

// Abrimos la conexión a la base de datos
$conn = conectar();

// Consulta el dato a eliminar en la base de datos
$sql = "SELECT cNombre, cApellido FROM cliente WHERE pkcliente = " . $id;
$result = mysqli_query($conn, $sql);

$nombres = '';
$ape_paterno = '';
$ape_materno = '';

if ($row = mysqli_fetch_assoc($result)) {
    $nombres = $row['cNombre'];
    $ape_paterno = $row['cApellido'];
}
    
// Elimina el dato de la tabla cliente
$sqlCliente = "DELETE FROM cliente WHERE pkcliente = " . $id;
$resultCliente = mysqli_query($conn, $sqlCliente);

// Elimina el dato de la tabla usuario
$sqlUsuario = "DELETE FROM usuario WHERE pkusuario = " . $id;
$resultUsuario = mysqli_query($conn, $sqlUsuario);

if ($resultCliente && $resultUsuario) {
    $msg = 'El Cliente ' . $nombres . ' ' . $ape_paterno . ' ha sido eliminado correctamente';
} else {
    $msg = 'Error al eliminar el cliente: ' . mysqli_error($conn);
}

echo $msg;

// Cerramos la conexión a la base de datos
desconectar($conn);

?>

