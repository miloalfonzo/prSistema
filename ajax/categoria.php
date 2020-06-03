<?php 
require_once "../models/Categoria.php";

$categoria= new Categoria();

$idcategoria = isset($_POST["idcategoria"])? limpiarCadea($_POST["idcategoria"]
): "";
$nombre = isset($_POST["nombre"])? limpiarCadea($_POST["nombre"]
): "";
$descripcion = isset($_POST["descripcion"])? limpiarCadea($_POST["descripcion"]
): "";

switch ($_GET["op"]){
    case 'guardaryeditar':
        if (empty($idcategoria)){
            $rspta=$categoria->insertar($nombre, $descripcion);
            echo $rspta ? "Categoria registrada" : "Categoria no se pudo registrar";
        }
        else {
            $rspta=$categoria->editar($idcategoria, $nombre, $descripcion);
            echo $rspta ? "Categoria actualizada" : "Categoria no se pudo actualizar";
        }
    break;

    case 'desactivar':
        $rspta=$categoria->desactivar($idcategoria);
        echo $rspta ? "Categoria desactivada" : "Categoria no se pudo desactivar";
    break;

    case 'activar':
        $rspta=$categoria->activar($idcategoria);
        echo $rspta ? "Categoria activada" : "Categoria no se pudo activar";
    break;

    case 'mostrar':
        $rspta=$categoria->mostrar($idcategoria);
       //codificar el resultado usando json
       echo json_encode($rspta);
    break;

    case 'listar':
        $rspta=$categoria->listar();
        //se declara una array
        $data = Array();

        while ($reg=$rspta->fetch_object()){
            $data[]=array(
                "0"=>$reg->idcategoria, 
                "1"=>$reg->nombre,
                "2"=>$reg->descripcion,
                "3"=>$reg->condicion
            );
            $results = array(
                "sEcho"=>1, //informacion para el datatables
                "iTotalRecords"=>count($data), // envia el total de registros al datatable
                "iTotalDisplayRecords"=>count($data), //envia el total de registros a visualizar
                "aaData"=>$data
            );
            echo json_encode($results);
        }

    break;
}

?>