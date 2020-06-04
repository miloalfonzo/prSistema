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

    //method para desactivar categorias
    public function desactivar ($idcategoria){
        $sql = "UPDATE categoria SET condicion='0' WHERE idcategoria='$idcategoria'";
        return ejecutarConsulta($sql);
    }

    //method para activar categorias
    public function activar ($idcategoria){
        $sql = "UPDATE categoria SET condicion='1' WHERE idcategoria='$idcategoria'";
        return ejecutarConsulta($sql);
    }

    //implementar un method para mostrar los datos de un registro a modificar
    public function mostrar($idcategoria){
        $sql="SELECT * FROM categoria WHERE idcategoria='$idcategoria'";
        return ejecutarConsultaSimpleFila($sql);
    }

    //method para listar los registros
    public function listar(){
        $sql="SELECT * FROM categoria";
        return ejecutarConsulta($sql);
    }

    //method para listar los registros y mostrar en el select
    public function select(){
        $sql="SELECT * FROM categoria where condicion=1";
        return ejecutarConsulta($sql);
    }
}

?>