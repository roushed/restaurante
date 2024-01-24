<?php
                                        
                                                                                             
              
                    $conexion = mysqli_connect('localhost','root','');
                    $fecha=$_POST['fecha'];
                    $hora=$_POST['hora'];                   
                    mysqli_select_db($conexion, 'restaurante');

                    if (!$conexion) 
                        {
                            echo "No pudo conectarse a la BD: " . mysql_error();
                            exit();
                        }
                                                                                                                             
                    $consulta = "SELECT * FROM reservas WHERE re_fechahora='$fecha' AND re_hora='$hora'";
                    $result = mysqli_query($conexion,$consulta);
                 
                    if (mysqli_num_rows($result) == 0){
                               
                            echo 0;

                    }else{
                        
                        $datos="";
                        while ($valor = mysqli_fetch_array($result)) 
                        {
                                                                             
                            $datos.=$valor['re_numpersonas']."_";
                                                                                                                                                                                                                              
                         }

       
                         echo $datos;
                                                                                               
                    }	
                                                    
                    mysqli_close($conexion);


?>