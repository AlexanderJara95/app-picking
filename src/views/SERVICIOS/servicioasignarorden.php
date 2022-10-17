<?php
	require_once("config.php");
	$idOrden = $_REQUEST["idOrden"];
	$asignadoPor = $_REQUEST["asignadoPor"];
	$asignadoA = $_REQUEST["asignadoA"];
	$estado = "2";

	$rs = mysqli_query($cn,
		"update Orden set asignadoPor = '".$asignadoPor."' , asignadoA = '".$asignadoA."' , estado = '".$estado."' where idOrden=".$idOrden);
	mysqli_close($cn);
?>