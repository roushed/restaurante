<?php
                                        
                                                                                             
                 
                    $conexion = mysqli_connect('localhost','root','');
                    mysqli_select_db($conexion, 'restaurante');
                                        
                    if (!$conexion) 
                        {
                            echo "No pudo conectarse a la BD: " . mysql_error();
                            exit();
                        }

                    $consulta = "SELECT c.*, m.* FROM cartas c, menus m, cartas_menus cm WHERE cm.cm_id_cartas=c.ca_id AND cm.cm_id_menus=m.me_id";
                    $result = mysqli_query($conexion,$consulta);
                  
                    if (mysqli_num_rows($result) == 0){
                                                 
                            echo "No se ha podido cargar la base de datos";
                        
                    }else{
                        
                        $datos="";
                        while ($valor = mysqli_fetch_array($result)) 
                        {
                                                    
                            $datos.=$valor[7].";".$valor[1].";".$valor[6]."_";
                                     
                         }

                         $datos = substr($datos, 0, -1);                    
                         echo $datos;
                                                                                               
                    }	
                                                    
                      
                    mysqli_close($conexion);


?>