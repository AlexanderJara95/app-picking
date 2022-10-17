<?php
	require_once("config.php");
    try{
        $idUsuario = $_REQUEST["idUsuario"];
        $rs = mysqli_query($cn, "SELECT Orden.idOrden, Orden.pedidoDeVentas, Orden.idUsuario, Orden.idClienteAx, Orden.nombreCliente, 
                            Orden.referencia, Orden.asignadoPor, Orden.asignadoA, 
                            Orden.fechaSubida, Orden.fechaInicio, Orden.fechaCompletado, 
                            EO.descripcion AS estado, Orden.avance 
                            FROM Orden 
                            LEFT JOIN Estados_Orden 
                            AS EO 
                            ON Orden.estado = EO.idEstadoOrden 
                            WHERE Orden.asignadoA = $idUsuario
                            AND Orden.estado 
                            BETWEEN 2 AND 4
                            ORDER BY idOrden");
        while ($row = mysqli_fetch_assoc($rs)) {
            $res[] = $row;
        }
    }catch(Exception $e){
        echo $e->getMessage();

    }catch(InvalidArgumentException $e){
        echo $e->getMessage();
    }
    
    echo json_encode($res, JSON_UNESCAPED_UNICODE);
    mysqli_close($cn);
?>
