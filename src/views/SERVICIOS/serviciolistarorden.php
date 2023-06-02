<?php
    require_once("config.php");

    // Obtener la fecha de hace dos días
    $fechaDosDiasAtras = date('Y-m-d', strtotime('-2 weekdays'));

    $rs = mysqli_query($cn,"SELECT idOrden, envio, pedidoVentas, idUsuario, idClienteAx, nombreCliente, referencia, asignadoPor, asignadoA, fechaSubida,fechaInicio, fechaCompletado, estado, avance, abierto, emitido
                        FROM Orden 
                        WHERE fechaSubida >= '$fechaDosDiasAtras'
                        ORDER BY idOrden DESC");

    $res = array();
    while($row = mysqli_fetch_assoc($rs)){
        $res[] = $row;
    }

    echo json_encode($res, JSON_UNESCAPED_UNICODE);
    mysqli_close($cn);
?>
