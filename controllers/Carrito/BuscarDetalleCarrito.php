<?php
include('../../administrador/config/bd.php');

// Asignar directamente el valor de 'id' recibido desde POST a una variable
$id = $_POST['userCarrito'];

// Abrir conexión a la base de datos
$conn = conectar();

// Consulta SQL para contar los elementos en el carrito con fkCarrito igual al ID proporcionado
$sql = "SELECT COUNT(*) AS cantidad FROM detallecarrito WHERE fkCarrito = '$id'";
$result = mysqli_query($conn, $sql);

// Recuperar y devolver la cantidad de elementos en el carrito
if ($result) {
    $row = mysqli_fetch_assoc($result);
    echo $row['cantidad'];
} else {
    echo "Error en la consulta: " . mysqli_error($conn);
}

// Cerrar la conexión a la base de datos
desconectar($conn);
?>
