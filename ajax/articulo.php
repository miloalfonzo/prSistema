<?php 
require_once "../models/Articulo.php";

$articulo= new Articulo();

$idarticulo = isset($_POST["idarticulo"])? limpiarCadena($_POST["idarticulo"]
): "";
$idcategoria = isset($_POST["idcategoria"])? limpiarCadena($_POST["idcategoria"]
): "";
$codigo = isset($_POST["codigo"])? limpiarCadena($_POST["codigo"]
): "";
$nombre = isset($_POST["nombre"])? limpiarCadena($_POST["nombre"]
): "";
$stock = isset($_POST["stock"])? limpiarCadena($_POST["stock"]
): "";
$descripcion = isset($_POST["descripcion"])? limpiarCadena($_POST["descripcion"]
): "";
$imagen = isset($_POST["imagen"])? limpiarCadena($_POST["imagen"]
): "";

switch ($_GET["op"]){
    case 'guardaryeditar':
        if (empty($idarticulo)){
            $rspta=$articulo->insertar($idcategoria, $codigo, $nombre, 
            $stock, $descripcion, $imagen);
            echo $rspta ? "Articulo registrado" : "Articulo no se pudo registrar";
        }
        else {
            $rspta=$articulo->editar($idarcitulo, $idcategoria, $codigo, 
            $nombre, $stock, $descripcion, $imagen);
            echo $rspta ? "Articulo actualizado" : "Articulo no se pudo actualizar";
        }
    break;

    case 'desactivar':
        $rspta=$articulo->desactivar($idarticulo);
        echo $rspta ? "Articulo desactivado" : "Articulo no se pudo desactivar";
    break;

    case 'activar':
        $rspta=$articulo->activar($idarticulo);
        echo $rspta ? "Articulo activado" : "Articulo no se pudo activar";
    break;

    case 'mostrar':
        $rspta=$articulo->mostrar($idarticulo);
       //codificar el resultado usando json
       echo json_encode($rspta);
    break;

    case 'listar':
		$rspta=$articulo->listar();
 		//Vamos a declarar un array
 		$data= Array();

 		while ($reg=$rspta->fetch_object()){
 			$data[]=array(
 				"0"=>($reg->condicion)?'<button class="btn btn-warning" onclick="mostrar('.$reg->idarticulo.')"><i class="fa fa-pencil"></i></button>'.
 					' <button class="btn btn-danger" onclick="desactivar('.$reg->idarticulo.')"><i class="fa fa-close"></i></button>':
 					'<button class="btn btn-warning" onclick="mostrar('.$reg->idarticulo.')"><i class="fa fa-pencil"></i></button>'.
 					' <button class="btn btn-primary" onclick="activar('.$reg->idarticulo.')"><i class="fa fa-check"></i></button>',
 				"1"=>$reg->nombre,
                "2"=>$reg->categoria,
                "3"=>$reg->codigo,
                "4"=>$reg->stock,
                "5"=>$reg->imagen,
 				"6"=>($reg->condicion)?'<span class="label bg-green">Activado</span>':
 				'<span class="label bg-red">Desactivado</span>'
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