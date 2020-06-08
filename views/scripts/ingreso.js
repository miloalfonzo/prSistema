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
    $("#idproveedor").val("");
    $("#proveedor").val("");
    $("#serie_comprobante").val("");
    $("#num_comprobante").val("");
    $("#fecha_hora").attr("src", "");
    $("#impuesto").val("");
}

//funcion mostrar form
function mostrarForm(flag){
    limpiar();
    if (flag){
        $("#listadoregistros").hide();
        $("#formularioregistros").show();
        $("#btnGuardar").prop('disabled',false);
        $("#btnagregar").hide();
    } else {
        $("#listadoregistros").show();
        $("#formularioregistros").hide();
        $("#btnagregar").show();
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
                url: '../ajax/ingreso.php?op=listar',
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
        url: "../ajax/ingreso.php?op=guardaryeditar",
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
        $("#idcategoria").selectpicker('refresh');
        $("#codigo").val(data.codigo);
        $("#nombre").val(data.nombre);
        $("#stock").val(data.stock);
        $("#descripcion").val(data.descripcion);
        $("#imagenmuestra").show();
        $("#imagenmuestra").attr("src", "../files/articulos/"+data.imagen);
        $("#imagenactual").val(data.imagen);
        $("#idarticulo").val(data.idarticulo);
        generarbarcode();
       
    })
}

//Funcion para desactivar registros
function anular(idingreso){

    bootbox.confirm("¿Esta seguro de anular el ingreso?", 
    function(result){
        if (result){
            $.post("../ajax/ingreso.php?op=anular", {idingreso : idingreso}, 
            function(e){
                bootbox.alert(e);
                tabla.ajax.reload();
            });
        }
    })
}

init();
