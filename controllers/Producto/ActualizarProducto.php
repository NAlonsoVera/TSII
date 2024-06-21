<?php
include('../../administrador/config/bd.php');

$id = $_POST['id'];
$producto = $_POST['producto'];
$descripcion = $_POST['descripcion'];
$precio = $_POST['precio'];
$stock = $_POST['stock'];
$categoria = $_POST['categoria'];

$conn = conectar();

$imagenActual = isset($_POST['imagenActual']) ? $_POST['imagenActual'] : '';

// Intenta obtener la imagen actual de la base de datos si no se envía una nueva
if (empty($_FILES['image']['name']) && empty($imagenActual)) {
    $query = "SELECT Imagen FROM producto WHERE pkProducto = $id";
    $result = mysqli_query($conn, $query);
    if ($row = mysqli_fetch_assoc($result)) {
        $imagenActual = $row['Imagen'];
    }
}

$imagen = $imagenActual; // Conserva la imagen actual por defecto
if (!empty($_FILES['image']['name'])) {
    $file_name = $_FILES['image']['name'];
    $ruta_completa = "../../img/" . $file_name;
    move_uploaded_file($_FILES['image']['tmp_name'], $ruta_completa);
    $imagen = $file_name;
}

$sql = "UPDATE producto SET fkCategoria='$categoria', Producto='$producto', Descripcion='$descripcion', Precio='$precio', Stock='$stock', Imagen='$imagen' WHERE pkProducto = $id";
$result = mysqli_query($conn, $sql);

if($result) {
    echo 'Producto actualizado correctamente';
} else {
    echo 'Error al actualizar el producto: ' . mysqli_error($conn);
}

desconectar($conn);

?>
