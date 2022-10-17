<?php
	require_once("config.php");
	$rs = mysqli_query($cn,"SELECT idOrden, pedidoDeVentas, idUsuario, idClienteAx, nombreCliente, referencia, asignadoPor, asignadoA, fechaSubida,fechaInicio, fechaCompletado, EO.descripcion AS estado, avance, abierto
                        FROM Orden 
                        LEFT JOIN Estados_Orden 
                        AS EO 
                        ON Orden.estado = EO.idEstadoOrden 
                        ORDER BY idOrden");
    while($row = mysqli_fetch_assoc($rs)){
        $res[] = $row;
    }
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
    mysqli_close($cn);
?>