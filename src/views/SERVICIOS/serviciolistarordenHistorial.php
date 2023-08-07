<?php
	require_once("config.php");

    $mes = isset($_GET['mes']) ? $_GET['mes'] : null;

	$rs = mysqli_query($cn,"SELECT idOrden, envio, pedidoVentas, idUsuario, idClienteAx, nombreCliente, referencia, asignadoPor, asignadoA, fechaSubida,fechaInicio, fechaCompletado, estado, avance, abierto, emitido
                        FROM Orden 
                        WHERE (MONTH(fechaSubida) = '$mes') or estado = 2 or estado = 3 or estado = 4
                        ORDER BY idOrden DESC");
    while($row = mysqli_fetch_assoc($rs)){
        $res[] = $row;
    }
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
    mysqli_close($cn);
?>