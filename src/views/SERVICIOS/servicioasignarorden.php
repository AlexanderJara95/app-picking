<?php
	require_once("config.php");
	$idOrden = $_REQUEST["idOrden"];
	$asignadoPor = $_REQUEST["asignadoPor"];
	$asignadoA = $_REQUEST["asignadoA"];
	$fechaAsignacion = $_REQUEST["fechaAsignacion"];
	$estado = "2";

	$rs = mysqli_query($cn,
    "UPDATE Orden 
    SET asignadoPor = '".$asignadoPor."', asignadoA = '".$asignadoA."', estado = '".$estado."', fechaAsignacion = '".$fechaAsignacion."' 
    WHERE idOrden = ".$idOrden);
	mysqli_close($cn);
?>