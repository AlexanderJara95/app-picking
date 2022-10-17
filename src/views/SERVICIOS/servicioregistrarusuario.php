<?php
	require_once("config.php");
	$nombre = $_REQUEST["nombre"];
    $apellido = $_REQUEST["apellido"];
    $correo = $_REQUEST["correo"];
    $password = $_REQUEST["password"];
    $nivelUsuario = $_REQUEST["nivelUsuario"];
	$passwordHash = password_hash($password, PASSWORD_DEFAULT);

    /* CREAMOS EL USERNAME */
    $in = substr($nombre,0,1);
    $ap = substr($apellido,0);
    $username = ($in.$ap);

	$rs = mysqli_query($cn,
		"insert into Usuario (nombre, apellido, correo, username, password, passwordHash, nivelUsuario)
        values ('".$nombre."','".$apellido."','".$correo."','".$username."','".$password."','".$passwordHash."','".$nivelUsuario."')");
        
        
    echo mysqli_insert_id($cn); 
	mysqli_close($cn);
?>