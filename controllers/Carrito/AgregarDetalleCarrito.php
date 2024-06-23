<?php
include('../../administrador/config/bd.php');

// Asignar directamente los valores recibidos desde POST a variables
$pkProducto = $_POST['pkProducto'];
$pkCarrito = $_POST['pkCarrito'];

// Abrir conexión a la base de datos
$conn = conectar();

// Obtener el precio actual del producto
$sqlPrecio = "SELECT Precio FROM producto WHERE pkProducto = '$pkProducto'";
$resultPrecio = mysqli_query($conn, $sqlPrecio);
if ($rowPrecio = mysqli_fetch_assoc($resultPrecio)) {
    $precioUnitario = $rowPrecio['Precio'];

    // Verificar si el producto ya está en el carrito
    $sqlExistencia = "SELECT * FROM detallecarrito WHERE fkCarrito = '$pkCarrito' AND fkProducto = '$pkProducto'";
    $resultExistencia = mysqli_query($conn, $sqlExistencia);

    if (mysqli_num_rows($resultExistencia) > 0) {
        // Producto ya está en el carrito, actualizar cantidad y precio
        $row = mysqli_fetch_assoc($resultExistencia);
        $nuevaCantidad = $row['cCantidad'] + 1; // Incrementar la cantidad
        $nuevoPrecio = $nuevaCantidad * $precioUnitario;

        $sqlUpdate = "UPDATE detallecarrito SET cCantidad = '$nuevaCantidad', cPrecio = '$nuevoPrecio' WHERE fkCarrito = '$pkCarrito' AND fkProducto = '$pkProducto'";
        if (mysqli_query($conn, $sqlUpdate)) {
            echo "Actualizado correctamente";
        } else {
            echo "Error al actualizar: " . mysqli_error($conn);
        }
    } else {
        // Producto no está en el carrito, añadir nuevo
        $sqlInsert = "INSERT INTO detallecarrito (fkCarrito, fkProducto, cCantidad, cPrecio) VALUES ('$pkCarrito', '$pkProducto', 1, '$precioUnitario')";
        if (mysqli_query($conn, $sqlInsert)) {
            echo "Añadido correctamente";
        } else {
            echo "Error al añadir: " . mysqli_error($conn);
        }
    }
} else {
    echo "Error al obtener el precio del producto";
}

// Cerrar la conexión a la base de datos
desconectar($conn);
?>
