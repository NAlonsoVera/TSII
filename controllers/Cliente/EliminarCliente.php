<?php
include('../../administrador/config/bd.php');

$id = $_POST['id'];
$conn = conectar();

$sql = "SELECT cNombre, cApellido, fkUsuario FROM cliente WHERE pkcliente = $id";
$result = mysqli_query($conn, $sql);

if ($row = mysqli_fetch_assoc($result)) {
    $nombres = $row['cNombre'];
    $ape_paterno = $row['cApellido'];
    $fkUsuario = $row['fkUsuario'];

    $sqlCliente = "DELETE FROM cliente WHERE pkcliente = $id";
    $resultCliente = mysqli_query($conn, $sqlCliente);

    if ($resultCliente) {
        $sqlUsuario = "DELETE FROM usuario WHERE pkusuario = $fkUsuario";
        $resultUsuario = mysqli_query($conn, $sqlUsuario);
        if ($resultUsuario) {
            $msg = 'El Cliente y Usuario ' . $nombres . ' ' . $ape_paterno . ' han sido eliminados correctamente';
        } else {
            $msg = 'Error al eliminar el usuario: ' . mysqli_error($conn);
        }
    } else {
        $msg = 'Error al eliminar el cliente: ' . mysqli_error($conn);
    }
} else {
    $msg = 'Error: No se encontró el cliente con ID ' . $id;
}

echo $msg;
desconectar($conn);
?>
