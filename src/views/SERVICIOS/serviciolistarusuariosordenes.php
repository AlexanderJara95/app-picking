<?php
	require_once("config.php");
	$rs = mysqli_query($cn,
    "SELECT Usuario.username, 
    CASE
        WHEN Orden.estado in(2,3,4) THEN count(Orden.asignadoA)
        WHEN Orden.estado not IN(1,2,3,4,5,6) then '0'
    END
        AS ordenes
    FROM Usuario
    Left Join Orden on Usuario.idUsuario = Orden.asignadoA
    where Usuario.nivelUsuario = 3
    group by username
    order by ordenes desc"
    );
    while($row = mysqli_fetch_assoc($rs)){
        $res[] = $row;
    }
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
    mysqli_close($cn);
?>