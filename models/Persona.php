<?php

require "../config/Conexion.php";

Class Persona {
    //constructor
    public function __construct(){

    }

    //method para insertar registros
    public function insertar($tipo_persona, $nombre, $tipo_documento, $num_documento,
     $direccion, $telefono, $email){
        $sql = "INSERT INTO persona (tipo_persona, nombre, 
        tipo_documento, num_documento, direccion, telefono, email)
        VALUES ('$tipo_persona', '$nombre', '$tipo_documento', '$num_documento', 
        '$direccion', '$telefono', '$email')";
        return ejecutarConsulta($sql);
    }

    //method para editar registros
    public function editar($idpersona, $tipo_persona, $nombre, $tipo_documento, $num_documento,
     $direccion, $telefono, $email){
        $sql = "UPDATE persona SET tipo_persona='$tipo_persona', nombre='$nombre',
        tipo_documento='$tipo_documento', num_documento='$num_documento', 
        direccion='$direccion', telefono='$telefono', email='$email'
        WHERE idpersona='$idpersona'";
        return ejecutarConsulta($sql);
    }

    //method para eliminar categorias
    public function eliminar ($idpersona){
        $sql = "DELETE FROM persona  WHERE idpersona='$idpersona'";
        return ejecutarConsulta($sql);
    }

    //implementar un method para mostrar los datos de un registro a modificar
    public function mostrar($idpersona){
        $sql="SELECT * FROM persona WHERE idpersona='$idpersona'";
        return ejecutarConsultaSimpleFila($sql);
    }

    //method para listar los registros
    public function listarP(){
        $sql="SELECT * FROM persona WHERE tipo_persona='Proovedor'";
        return ejecutarConsulta($sql);
    }
     //method para listar los registros
     public function listarC (){
        $sql="SELECT * FROM persona WHERE tipo_persona='Cliente'";
        return ejecutarConsulta($sql);
    }

}

?>