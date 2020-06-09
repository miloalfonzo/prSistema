var tabla;

//función que se ejecuta al inicio
function init(){
    mostrarForm(false);
    listar();

    $("#formulario").on('submit', function(e){
        guardaryeditar(e);
    });

    //cargamos los items al select proveedor
    $.post ('../ajax/ingreso.php?op=selectProveedor', function(r){
        $('#idproveedor').html(r);
        $('#idproveedor').selectpicker('refresh');
    });
}

// función limpiar
function limpiar(){
    $("#idproveedor").val("");
    $("#proveedor").val("");
    $("#serie_comprobante").val("");
    $("#num_comprobante").val("");
    $("#fecha_hora").attr("src", "");
    $("#impuesto").val("");
    $("#total_compra").val("");
    $("#filas").remove("");
    $("#total").html("0");

    //obtener fecha actual
    var now = new Date();
    var day = ('0' + now.getDate()).slice(-2);
    var month = ('0' + (now.getMonth() +1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day);
    $('#fecha_hora').val(today);

    //marcamos el primer  tipo_documento
    $('#tipo_comprobante').val('Boleta');
    $('#tipo_comprobante').selectpicker('refresh');
}

//funcion mostrar form
function mostrarForm(flag){
    limpiar();
    if (flag){
        $("#listadoregistros").hide();
        $("#formularioregistros").show();
        //$("#btnGuardar").prop('disabled',false);
        $("#btnagregar").hide();
        listarArticulos();

        $('#guardar').hide();
        $('#btnGuardar').show();
        $('#btnCancelar').show();
        $('#btnAgregarArt').show();

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

// Función listarArticulos
function listarArticulos(){
    tabla=$("#tblarticulos").dataTable({
        "aProcessing": true, // activa el procesamiento del datatables
        "aServerSide": true, // paginación y filtrado realizados por el servidor
        dom: 'Bfrtip', // definimos los elementos del control de tabla
        buttons: [
                
                ],
        "ajax": {
                url: '../ajax/ingreso.php?op=listarArticulos',
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
    // $("#btnGuardar").prop("disabled", true);
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
            listar();
        }
    });
    limpiar();
}

function mostrar(idingreso){
    $.post("../ajax/ingreso.php?op=mostrar", {idingreso : idingreso}, 
    function(data, status){
        
        data = JSON.parse(data);
        mostrarForm(true);

        $("#idproveedor").val(data.idproveedor);
        $("#idproveedor").selectpicker('refresh');
        $("#tipo_comprobante").val(data.tipo_comprobante);
        $("#tipo_comprobante").selectpicker('refresh');
        $("#serie_comprobante").val(data.serie_comprobante);
        $("#num_comprobante").val(data.num_comprobante);
        $("#fecha_hora").val(data.fecha);
        $("#impuesto").val(data.impuesto);
        $("#idingreso").val(data.idingreso);

        //ocultar y mostrar botones
        $('#btnGuardar').hide();
        $('#btnCancelar').show();
        detalles=0;
        $('#btnAgregarArt').hide();

    });

    $.post("../ajax/ingreso.php?op=listarDetalle&id="+idingreso, function(r){
        $('#detalles').html(r);
    });
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

//declaracion de variables necesarias para trabajar con las compras y sus detalles
var impuesto=18;
var cont=0;
var detalles=0;
//$('#guardar').hide();
$('#btnGuardar').hide();
$('#tipo_comprobante').change(marcarImpuesto);

function marcarImpuesto(){
    var tipo_comprobante=$("#tipo_comprobante option:selected").text();
    if (tipo_comrpobante == 'Factura'){
        $("#impuesto").val(impuesto);
    }else{
        $("#impuesto").val('0');
    }
}

function agregarDetalle(idarticulo, articulo){
    var cantidad=1;
    var precio_compra=1;
    var precio_venta=1;

    if (idarticulo!=""){

        var subtotal=cantidad*precio_compra;
        var fila = '<tr class="filas" id="fila'+cont+'">'+
        '<td><button type="button" class="btn btn-danger" onclick="eliminarDetalle('+cont+')">X</button></td>'+ 
        '<td><input type="hidden" name="idarticulo[]" value="'+idarticulo+'">'+idarticulo+'</td>'+ 
        '<td><input type="number" name="cantidad[]" id="cantidad[]" value="'+cantidad+'"></td>'+ 
        '<td><input type="number" name="precio_compra[]" id="precio_compra[]" value="'+precio_compra+'"></td>'+ 
        '<td><input type="number" name="precio_venta[]" value="'+precio_venta+'"></td>'+ 
        '<td><span  name="subtotal" id="subtotal'+cont+'" value=">'+subtotal+'</td>'+ 
        '<td><button type="button" onclick="modificarSubtotales()" class="btn btn-info"><i class="fa fa-refresh></i></button></td>'+ 
        '</tr>';
        cont++;
        detalles=detalles+1;
        $('#detalles').append(fila);
        modificarSubtotales();

    } else{

        alert('Error al ingresar el detalle, revisar los datos del articulo');
    }
}

function modificarSubtotales(){

    var cant = document.getElementByName('cantidad[]');
    var prec = document.getElementByName('precio_compra[]');
    var sub = document.getElementByName('subtotal');

    for (var i = 0; i <cant.length; i++){
        var inpC=cant[i];
        var inpP=prec[i];
        var inpS=sub[i];

        inpS.value=inpC.value * inpP.value;
        document.getElementsByName('subtotal')[i].innerHTML = inpS.value;
    }
    calcularTotales();
}

function calcularTotales(){
    var sub = document.getElementsByName('subtotal');
    var total = 0.0;

    for (var i =0; i <sub.length; i++){
        total += document.getElementsByName('subtotal')[i].value;
    }
    $("#total").html("S/. " + total);
    $("#total_compra").val(total);
    evaluar();
}

function evaluar(){
    if (detalles>0){
        $("#btnGuardar").show();
    } else {
        $('#btnGuardar').hide();
        cont=0;
    }
}

function eliminarDetalle(indice){

    $("#fila" + indice).remove();
    calcularTotales();
    detalles=detalles-1;
}

init();
