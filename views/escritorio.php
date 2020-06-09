<?php
//activamos el almacenamiento en el buffer
ob_start();
session_start();
if (!isset($_session['nombre'])){
    header('Location: login.html');
} else {
require 'header.php';

if ($_SESSION['escritorio']==1){

    require_once '../models/Consultas.php';
    $consulta = new Consultas();
    $rsptac = $consulta->totalcomprahoy();
    $regc=$rsptac->fetch_object();
    $totalc=$regc->total_compra;

  
    $rsptav = $consulta->totalventahoy();
    $regv=$rsptav->fetch_object();
    $totalv=$regv->total_venta;

?>
<!--Contenido-->
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">        
        <!-- Main content -->
        <section class="content">
            <div class="row">
              <div class="col-md-12">
                  <div class="box">
                    <div class="box-header with-border">
                          <h1 class="box-title">Escritorio </h1>
                        <div class="box-tools pull-right">
                        </div>
                    </div>
                    <!-- /.box-header -->
                    <!-- centro -->
                    <div class="panel-body">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <div class="small-box bg-aqua">
                            <div class="inner">
                                <h4 style="font-size:17px;">
                                    <strong><?php echo $totalc ?></strong>
                                </h4>
                                <p>Compras</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-bag"></i>
                            </div>
                            <a href="ingreso.php" class="small-box-footer">Compras 
                            <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <div class="small-box bg-green">
                            <div class="inner">
                                <h4 style="font-size:17px;">
                                    <strong>S/ <?php echo $totalv ?></strong>
                                </h4>
                                <p>Ventas</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-bag"></i>
                            </div>
                            <a href="venta.php" class="small-box-footer">Ventas 
                            <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                    </div>

                    <div class="panel-body">
                        
                    </div>
                    
                    <!--Fin centro -->
                  </div><!-- /.box -->
              </div><!-- /.col -->
          </div><!-- /.row -->
      </section><!-- /.content -->

    </div><!-- /.content-wrapper -->
  <!--Fin-Contenido-->
<?php
} else {
    require 'noacceso.php';
}
require 'footer.php';
?>
<script type="text/javascript" src="scripts/categoria.js"></script>
<?php 
}
ob_end_flush();
?>