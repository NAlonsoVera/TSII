<?php

include('../../administrador/config/bd.php');

$valores = "";

// Abrimos la conexión a la base de datos
$conn = conectar();

$num = 0;

// Consulta a la base de datos
$sql = "SELECT pkcliente, cNombre, cApellido, cCorreo, cTelefono, cDireccion FROM cliente";
$result = mysqli_query($conn, $sql);

while($crow = mysqli_fetch_assoc($result)){
    $valores .= '<tr>'.
                '<td>'.$crow['cNombre'].'</td>'.
                '<td>'.$crow['cApellido'].'</td>'.
                '<td>'.$crow['cCorreo'].'</td>'.
                '<td>'.$crow['cTelefono'].'</td>'.
                '<td>'.$crow['cDireccion'].'</td>'.
                '<td>'.
        '<button onclick="eliminar_form('.$crow['pkcliente'].')" class="btn btn-danger btn-xs" style="font-size:14px;"><i class="fa fa-trash"></i></button>&nbsp;'.
    '</td>'.
'</tr>';

    $num++;
}

// Cerramos la conexión a la base de datos
desconectar($conn);

echo $valores.','.$num;

?>
