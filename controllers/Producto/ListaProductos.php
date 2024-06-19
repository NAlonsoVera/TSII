<?php
include('../../administrador/config/bd.php');
$valores = "";
// Abrimos la conexión a la base de datos
$conn = conectar();
// Consulta a la bsase de datos para productos
$sql = "SELECT pkProducto, Producto, Descripcion, Precio, Stock FROM producto";
$result = mysqli_query($conn, $sql);

while($crow = mysqli_fetch_assoc($result)){
    $valores = $valores .'<tr>'.
                             '<td>'.$crow['pkProducto'].'</td>'.
							 '<td>'.$crow['Producto'].'</td>'.
							 '<td>'.$crow['Descripcion'].'</td>'.
                             '<td>'.$crow['Precio'].'</td>'.
							 '<td>'.$crow['Stock'].'</td>'.
                             '<td>'.
                             '<button onclick="eliminar_form('.$crow['pkProducto'].')" class="btn btn-danger btn-xs" style="font-size:14px;"><i class="fa fa-trash"></i></button>&nbsp;'.
                             '<button onclick="editar_form('.$crow['pkProducto'].')" class="btn btn-primary btn-xs" style="font-size:14px;"><i class="fa fa-pencil"></i></button>'.
                         '</td>'.
                        '</tr>';

}

// Cerramos la conexión a la base de datos
desconectar($conn);

// Impresión en la consola del navegador
echo $valores;
?>
