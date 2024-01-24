<?php


    $conexion = mysqli_connect('localhost','root','');                              
    mysqli_select_db($conexion, 'restaurante');
                    
    if (!$conexion) {
        die("La conexión ha fallado: " . mysqli_connect_error());
    }


    $sql="SELECT * FROM `mesas` WHERE mes_disponible=1";
    $result=mysqli_query($conexion,$sql);

    if (mysqli_num_rows($result) > 0){
        
        echo mysqli_num_rows($result);
        
    } else {
        echo "Error";
    }
    
    mysqli_close($conexion);

?>