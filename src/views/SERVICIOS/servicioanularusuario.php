<?php
	require_once("config.php");
	$idUsuario = $_REQUEST["idUsuario"];
	$estado = "2";

	$rs = mysqli_query($cn,
		"update Usuario set  estado = '".$estado."' where idUsuario=".$idUsuario);
	mysqli_close($cn);
?>