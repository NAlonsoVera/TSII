<?php

if (!function_exists('conectar')) {
    function conectar(){
        $conn = mysqli_connect('localhost','root','usbw','masterinpets');
        return $conn;
    }
}

if (!function_exists('desconectar')) {
    function desconectar($conexion){
        mysqli_close($conexion);
    }
}
$URL = "hhtps://localhost/www.MasterinPets.com";
?>
