<?php
                                        
                                                                                             
               
                    $conexion = mysqli_connect('localhost','root','');
                    mysqli_select_db($conexion, 'restaurante');
                                        
                    if (!$conexion) 
                    {
                            echo "No pudo conectarse a la BD: " . mysql_error();
                            exit();
                    }
                                        
                                           
                    $consulta = "SELECT * FROM cartas";
                    $result = mysqli_query($conexion,$consulta);
                  
                    if (mysqli_num_rows($result) == 0){
                  
                                                          
                            echo "No se ha podido cargar la base de datos";
                        
                    }else {

                        $datos="";
                        while ($valor = mysqli_fetch_array($result)) 
                        {
                                                    
                            $datos.=$valor[1].";".$valor[2].";".$valor[3].";".$valor[4]."_";
                                          
                                                                                                           
                                                                
                         }

                         $datos = substr($datos, 0, -1);                    
                         echo $datos;
                                                                                               
                    }	
                                                    
                    mysqli_close($conexion);


?>