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

    //method para listar los registros
    public function ventasfechacliente($fecha_inicio, $fecha_fin, $idcliente){
        $sql="SELECT DATE (v.fecha_hora) as fecha, u.nombre as usuario, p.nombre as 
        cliente, v.tipo_comprobante, v.serie_comprobante, v.num_comprobante, 
        v.total_venta, v.impuesto, v.estado FROM venta v INNER JOIN persona p ON
        v.idcliente=p.idpersona INNER JOIN usuario u ON v.idusuario=u.idusuario 
        WHERE DATE (v.fecha_hora)>='$fecha_fin' AND DATE (v.fecha_hora)<='$fecha_fin' AND
        v.idcliente='$idcliente'";
        
        return ejecutarConsulta($sql);
    }

}

?>