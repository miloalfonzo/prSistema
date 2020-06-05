<?php

require "../config/Conexion.php";

Class Permiso {
    //constructor
    public function __construct(){

    }

    //method para listar los registros
    public function listar(){
        $sql="SELECT * FROM permiso";
        return ejecutarConsulta($sql);
    }

}

?>