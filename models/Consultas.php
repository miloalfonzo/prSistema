<?php

require "../config/Conexion.php";

Class Consultas {
    //constructor
    public function __construct(){

    }

    //method para listar los registros
    public function comprasfecha($fecha_inicio, $fecha_fin){
        $sql="SELECT DATE (i.fecha_hora) as fecha, u.nombre as usuario, p.nombre as 
        proveedor, i.tipo_comprobante, i.serie_comprobante, i.num_comprobante, 
        i.total_compra, i.impuesto, i.estado FROM ingreso i INNER JOIN persona p ON
        i.idproveedor=u.idusuario WHERE DATE (i.fecha_hora)<='$fecha_fin'";
        
        return ejecutarConsulta($sql);
    }

}

?>