<?php
	require_once("config.php");

    //$id = $_POST[uniqid()]  ;
    //$idDetalleOrden = $_REQUEST[uniqid()];
    $pedidoDeVentas = $_REQUEST["pedidoDeVentas"];
    $codigoArticulo = $_REQUEST["codigoArticulo"];
    $descripcion = $_REQUEST["descripcion"];
    $numeroLote = $_REQUEST["numeroLote"];
    $ubicacion = $_REQUEST["ubicacion"];
    $idPallet = $_REQUEST["idPallet"];
    $fechaCaducidad = $_REQUEST["fechaCaducidad"];
    $cantidad = $_REQUEST["cantidad"];
    $rama = '1';
    $codigoHijo = $_REQUEST["codigoHijo"];
       
    //$date = getdate();
     //echo $date[year],'-',$date[mon],'-',$date[mday],' ',$date[hours],':',$date[minutes],':',$date[seconds];

	$rs = mysqli_query($cn,
		"insert into Detalle_Orden (pedidoDeVentas,codigoArticulo,descripcion,numeroLote, ubicacion,idPallet,fechaCaducidad,cantidad, rama) 
        values('".$pedidoDeVentas."','".$codigoArticulo."','".$descripcion."',
         '".$numeroLote."','".$ubicacion."','".$idPallet."', '".$fechaCaducidad."','".$cantidad."','".$rama."')");

	echo mysqli_insert_id($cn); 
	mysqli_close($cn);
?>