<?php

require "../config/Conexion.php";

Class Categoria {
    //constructor
    public function __construct(){

    }

    //method para insertar registros
    public function insertar($nombre, $descripcion){
        $sql = "INSERT INTO categoria (nombre, descripcion, condicion)
        VALUES ('$nombre', '$descripcion', '1')";
        return ejecutarConsulta($sql);
    }

    //method para editar registros
    public function editar($idcategoria, $nombre, $descripcion){
        $sql = "UPDATE categoria SET nombre='$nombre', descripcion='$descripcion' 
        WHERE idcategoria='$idcategoria'";
        return ejecutarConsulta($sql);
    }
}

?>