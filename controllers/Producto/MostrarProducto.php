<?php
include('../../administrador/config/bd.php');
$valores = "";

// Abrimos la conexión a la base de datos
$conn = conectar();

// Consulta a la base de datos para productos
$sql = "SELECT pkProducto, Producto, Descripcion, Precio, Stock, Imagen FROM producto";
$result = mysqli_query($conn, $sql);

while($crow = mysqli_fetch_assoc($result)){
    $valores .= '<div class="col-md-4 mb-3">'.
                    '<div class="card">'.
                        '<img src=".././img/'.$crow['Imagen'].'" class="card-img-top" alt="Imagen de '.$crow['Producto'].'">'.
                        '<div class="card-body">'.
                            '<h5 class="card-title">'.$crow['Producto'].'</h5>'.
                            '<p class="card-text">'.$crow['Descripcion'].'</p>'.
                            '<p class="card-text">Precio: S/ '.$crow['Precio'].'</p>'.
                            '<p class="card-text">Stock: '.$crow['Stock'].'</p>'.
                            '<button onclick="agregarAlCarrito('.$crow['pkProducto'].')" class="btn btn-primary">Agregar al carrito</button>'.
                        '</div>'.
                    '</div>'.
                '</div>';
}

desconectar($conn);

echo $valores;
?>
