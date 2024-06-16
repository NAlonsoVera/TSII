<?php
include('../../administrador/config/bd.php');

$producto = $_POST['producto'];
$descripcion = $_POST['descripcion'];
$precio = $_POST['precio'];
$stock = $_POST['stock'];
$categoria = $_POST['categoria'];
$file_name = $_FILES['image']['name'];
$ruta_completa = "../../img/" . $file_name;
move_uploaded_file($_FILES['image']['tmp_name'], $ruta_completa);
$imagen = $file_name; 
$conn = conectar();
$sql = "INSERT INTO producto (fkCategoria, Producto, Descripcion, Precio, Stock, Imagen) VALUES ('".$categoria."', '".$producto."', '".$descripcion."', '".$precio."', '".$stock."', '".$imagen."')";
$result = mysqli_query($conn, $sql);

if($result) {
    echo 'Producto registrado correctamente';
} else {
    echo 'Error al registrar el producto: '.mysqli_error($conn);
}

desconectar($conn);
?>
