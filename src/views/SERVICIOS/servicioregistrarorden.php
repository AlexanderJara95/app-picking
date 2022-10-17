<?php
	require_once("config.php");

    //$id = $_POST[uniqid()]  ;
    //$idDetalleOrden = $_REQUEST[uniqid()];
    //$idDetalleOrden = $_REQUEST["idDetalleOrden"];
    //$idUsuario = $_REQUEST["idUsuario"];
    $idClienteAx = $_REQUEST["idClienteAx"];
    $nombreCliente = $_REQUEST["nombreCliente"];
    $referencia = $_REQUEST["referencia"];
    $pedidoDeVentas = $_REQUEST["pedidoDeVentas"];
    //$asignadoPor = $_REQUEST["asignadoPor"];
    //$completadoPor = $_REQUEST["completadoPor"];
    $fechaSubida = $_REQUEST["fechaSubida"];
    //$fechaInicio = $_REQUEST["fechaInicio"];
    //$fechaCompletado = $_REQUEST["fechaCompletado"];
    $estado = $_REQUEST["estado"];

    
    //$date = getdate();
     //echo $date[year],'-',$date[mon],'-',$date[mday],' ',$date[hours],':',$date[minutes],':',$date[seconds];

	$rs = mysqli_query($cn,
		"insert into Orden (idClienteAx,nombreCliente,
        referencia,pedidoDeVentas,fechaSubida,estado) 
        values('".$idClienteAx."',
        '".$nombreCliente."','".$referencia."','".$pedidoDeVentas."',
        '".$fechaSubida."','".$estado."')");

	echo mysqli_insert_id($cn); 
	mysqli_close($cn);
?>