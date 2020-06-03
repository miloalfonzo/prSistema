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
    $("#idcategoria").val("");
    $("#nombre").val("");
    $("#descripcion").val("");
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
                url: '../ajax/categoria.php?op=listar',
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
        url: "../ajax/categoria.php?op=guardaryeditar",
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

function mostrar(idcategoria){
    $.post("../ajax/categoria.php?op=mostrar", {idcategoria : idcategoria}, 
    function(data, status){
        data = JSON.parse(data);
        mostrarForm(true);

        $("#nombre").val(data.nombre);
        $("#descripcion").val(data.descripcion);
        $("#idcategoria").val(data.idcategoria);
    })
}

//Funcion para desactivar registros
function desactivar(idcategoria){

    bootbox.confirm("¿Esta seguro de desactivar la categoria?", 
    function(result){
        if (result){
            $.post("../ajax/categoria.php?op=desactivar", {idcategoria : idcategoria}, 
            function(e){
                bootbox.alert(e);
                tabla.ajax.reload();
            });
        }
    })
}

//Funcion para activar registros
function activar(idcategoria){

    bootbox.confirm("¿Esta seguro de activar la categoria?", 
    function(result){
        if (result){
            $.post("../ajax/categoria.php?op=activar", {idcategoria : idcategoria}, 
            function(e){
                bootbox.alert(e);
                tabla.ajax.reload();
            });
        }
    })
}

init();
