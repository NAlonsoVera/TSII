<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Producto</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
        }

        h1 {
            color: #333;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f7f7f7;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #555;
        }

        .form-control, .form-control-file {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }

        .form-control-file {
            padding: 3px;
        }

        .form-control:focus {
            border-color: #66afe9;
            outline: 0;
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
        }

        .btn {
            display: inline-block;
            font-weight: 400;
            color: #fff;
            text-align: center;
            vertical-align: middle;
            user-select: none;
            background-color: #007bff;
            border: 1px solid transparent;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: 0.25rem;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }

        .btn:hover {
            background-color: #0056b3;
            border-color: #004085;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Crear Producto</h1>
        <form action="crear_producto.php" method="POST" enctype="multipart/form-data">
            <div class="form-group">
                <label for="nombre">Nombre del Producto:</label>
                <input type="text" id="nombre" name="nombre" class="form-control" required>
            </div>

            <div class="form-group">
                <label for="descripcion">Descripción:</label>
                <textarea id="descripcion" name="descripcion" class="form-control" required></textarea>
            </div>

            <div class="form-group">
                <label for="precio">Precio:</label>
                <input type="number" id="precio" name="precio" class="form-control" required>
            </div>

            <div class="form-group">
                <label for="imagen">Imagen del Producto:</label>
                <input type="file" id="imagen" name="imagen" class="form-control-file" accept="image/*">
            </div>

            <button type="submit" class="btn btn-primary">Crear Producto</button>
        </form>
    </div>
</body>
</html>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $precio = $_POST['precio'];
    
    // Manejo de la imagen
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["imagen"]["name"]);
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Verifica si el archivo es una imagen real
    $check = getimagesize($_FILES["imagen"]["tmp_name"]);
    if($check !== false) {
        // Guardar la imagen en el servidor
        if (move_uploaded_file($_FILES["imagen"]["tmp_name"], $target_file)) {
            // Conexión a la base de datos
            $servername = "localhost"; // Cambiar según sea necesario
            $username = "root"; // Cambiar según sea necesario
            $password = ""; // Cambiar según sea necesario
            $dbname = "veterinaria"; // Cambiar según sea necesario

            $conn = new mysqli($servername, $username, $password, $dbname);

            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            // Inserta los datos en la base de datos
            $sql = "INSERT INTO productos (nombre, descripcion, precio, imagen)
                    VALUES ('$nombre', '$descripcion', '$precio', '$target_file')";

            if ($conn->query($sql) === TRUE) {
                echo "Nuevo producto creado exitosamente";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }

            $conn->close();
        } else {
            echo "Lo siento, hubo un error al subir tu archivo.";
        }
    } else {
        echo "El archivo no es una imagen.";
    }
}
?>
