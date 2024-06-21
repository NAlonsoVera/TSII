<?php
include('../../administrador/config/bd.php');

$id = $_POST['id'];
$conn = conectar();

$sql = "SELECT Producto, fkCategoria, Descripcion, Precio, Stock, Imagen FROM producto WHERE pkProducto = " . $id;
$result = mysqli_query($conn, $sql);

$response = '';
if($crow = mysqli_fetch_assoc($result)){
    $response = implode(',', [
        $crow['Producto'],
        $crow['Descripcion'],
        $crow['Precio'],
        $crow['Stock'],
        $crow['fkCategoria'],
        $crow['Imagen'] ? $crow['Imagen'] : 'default.jpg' 
    ]);
}
echo $response;
desconectar($conn);
?>
