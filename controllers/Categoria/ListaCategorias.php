<?php
include('../../administrador/config/bd.php');
$valores = "<option value=''>Seleccione una categoría</option>";  // Incluye una opción inicial
// Abrimos la conexión a la base de datos
$conn = conectar();
// Consulta a la base de datos para categorías
$sql = "SELECT pkCategoria, Categoria FROM categoria";
$result = mysqli_query($conn, $sql);

while($crow = mysqli_fetch_assoc($result)){
    $valores .= "<option value='" . $crow['pkCategoria'] . "'>" . $crow['Categoria'] . "</option>";
}

// Cerramos la conexión a la base de datos
desconectar($conn);

echo $valores;
?>
