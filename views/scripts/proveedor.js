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
    $("#nombre").val("");
    $("#num_documento").val("");
    $("#direccion").val("");
    $("#telefono").val("");
    $("#email").val("");
    $("#idpersona").val("");
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
                url: '../ajax/persona.php?op=listarP',
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
        url: "../ajax/persona.php?op=guardaryeditar",
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

function mostrar(idpersona){
    $.post("../ajax/categoria.php?op=mostrar", {idpersona : idpersona}, 
    function(data, status){
        data = JSON.parse(data);
        mostrarForm(true);

        $("#nombre").val(data.nombre);
        $("#tipo_documento").val(data.tipo_documento);
        $("#tipo_documento").selectpicker('refresh');
        $("#num_documento").val(data.num_documento);
        $("#direccion").val(data.direccion);
        $("#telefono").val(data.telefono);
        $("#email").val(data.email);
        $("#idpersona").val(data.idpersona);
    })
}

//Funcion para eliminar registros
function eliminar(idpersona){

    bootbox.confirm("¿Esta seguro de eliminar el proveedor?", 
    function(result){
        if (result){
            $.post("../ajax/persona.php?op=eliminar", {idpersona : idpersona}, 
            function(e){
                bootbox.alert(e);
                tabla.ajax.reload();
            });
        }
    })
}


init();
