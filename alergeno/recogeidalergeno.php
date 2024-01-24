<?php


    $conexion = mysqli_connect('localhost','root','');                            
    mysqli_select_db($conexion, 'restaurante');
                    
    
    if (!$conexion) {
        die("La conexión ha fallado: " . mysqli_connect_error());
    }


    $sql="SELECT `AUTO_INCREMENT` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'restaurante' AND TABLE_NAME = 'alergenos' ";


    if ($result = $conexion->query($sql)) {
        $row = $result->fetch_assoc();
        echo $row['AUTO_INCREMENT'];    
    } else {
        echo "Error";
    }


?>