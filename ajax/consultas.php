<?php 
require_once "../models/Consultas.php";

$consulta= new Consultas();


switch ($_GET["op"]){

    case 'comprasfecha':
        $fecha_inicio=$_REQUEST['fecha_inicio'];
        $fecha_fin=$_REQUEST['fecha_fin'];

		$rspta=$consulta->comprasfecha($fecha_inicio, $fecha_fin);
 		//Vamos a declarar un array
 		$data= Array();

 		while ($reg=$rspta->fetch_object()){
 			$data[]=array(
 				"0"=>$reg->fecha,
 				"1"=>$reg->usuario,
                "2"=>$reg->proveedor,
                "2"=>$reg->tipo_comprobante,
 				"2"=>$reg->serie_comprobante.' '.$reg->num_comprobante,
 				"2"=>$reg->total_compra,
 				"2"=>$reg->impuesto,
 				"3"=>($reg->estado=='Aceptado')?'<span class="label bg-green">Aceptado</span>':
 				'<span class="label bg-red">Anulado</span>'
 				);
 		}
 		$results = array(
 			"sEcho"=>1, //Información para el datatables
 			"iTotalRecords"=>count($data), //enviamos el total registros al datatable
 			"iTotalDisplayRecords"=>count($data), //enviamos el total registros a visualizar
 			"aaData"=>$data);
 		echo json_encode($results);

	break;
}

?>