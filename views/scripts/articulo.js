var tabla;

//función que se ejecuta al inicio
function init(){
    mostrarForm(false);
    listar();

    $("#formulario").on('submit', function(e){
        guardaryeditar(e);
    })
}

// función limpiar
function limpiar(){
    $("#codigo").val("");
    $("#nombre").val("");
    $("#descripcion").val("");
    $("#stock").val("");
}

//funcion mostrar form
function mostrarForm(flag){
    limpiar();
    if (flag){
        $("#listadoregistros").hide();
        $("#formularioregistros").show();
        $("#btnGuardar").prop('disabled',false);
    } else {
        $("#listadoregistros").show();
        $("#formularioregistros").hide();
    }
}

// Función cancelarForm
function cancelarForm(){
    limpiar();
    mostrarForm(false);
}

// Función listar
function listar(){
    tabla=$("#tbllistado").dataTable({
        "aProcessing": true, // activa el procesamiento del datatables
        "aServerSide": true, // paginación y filtrado realizados por el servidor
        dom: 'Bfrtip', // definimos los elementos del control de tabla
        buttons: [
                'copyHtml5',
                'excelHtml5',
                'csvHtml5',
                'pdf'
                ],
        "ajax": {
                url: '../ajax/articulo.php?op=listar',
                type: "get",
                dataType: "json",
                error: function(e){
                    console.log(e.responseText);
                }
                },
        "bDestroy": true,
        "iDisplayLength": 5, //Paginación
        "order": [[ 0, "desc" ]] //Ordenar (columna, orden)
    }).DataTable();
}

//Función para guardar o editar
function guardaryeditar(e){
    e.preventDefault(); //no se activará la accion predeterminada del evento
    $("#btnGuardar").prop("disabled", true);
    var formData = new FormData($("#formulario")[0]);

    $.ajax({
        url: "../ajax/articulo.php?op=guardaryeditar",
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,

        success: function(datos){
            bootbox.alert(datos);
            mostrarForm(false);
            tabla.ajax.reload();
        }
    });
    limpiar();
}

function mostrar(idarticulo){
    $.post("../ajax/articulo.php?op=mostrar", {idarticulo : idarticulo}, 
    function(data, status){
        data = JSON.parse(data);
        mostrarForm(true);

        $("#idcategoria").val(data.idcategoria);
        $("#codigo").val(data.codigo);
        $("#nombre").val(data.nombre);
        $("#stock").val(data.stock);
        $("#descripcion").val(data.descripcion);
        $("#idarticulo").val(data.idarticulo);
       
    })
}

//Funcion para desactivar registros
function desactivar(idarticulo){

    bootbox.confirm("¿Esta seguro de desactivar el articulo?", 
    function(result){
        if (result){
            $.post("../ajax/articulo.php?op=desactivar", {idarticulo : idarticulo}, 
            function(e){
                bootbox.alert(e);
                tabla.ajax.reload();
            });
        }
    })
}

//Funcion para activar registros
function activar(idarticulo){

    bootbox.confirm("¿Esta seguro de activar el articulo?", 
    function(result){
        if (result){
            $.post("../ajax/articulo.php?op=activar", {idarticulo : idarticulo}, 
            function(e){
                bootbox.alert(e);
                tabla.ajax.reload();
            });
        }
    })
}

init();
