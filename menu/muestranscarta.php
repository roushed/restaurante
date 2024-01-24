<?php
                                        
                                                                                             
                
                    $conexion = mysqli_connect('localhost','root','');
                    mysqli_select_db($conexion, 'restaurante');
                   
                  
                    if (!$conexion) 
                        {
                            echo "No pudo conectarse a la BD: " . mysql_error();
                            exit();
                        }
                                        
                  
                                            
                    $id_menu=intval($_POST['id_menu']);
                    $consulta = "SELECT * FROM cartas ORDER BY ca_nombre";
                    $result = mysqli_query($conexion,$consulta);
                    $contarl=0;
                    if (mysqli_num_rows($result) == 0){
                                 
                        echo "No se ha podido cargar la base de datos";
                        
                    }else {
                        
                        $datos="";
                        $datos="<option value='selecciona'>Selecciona</option>";
                        while ($valor = mysqli_fetch_array($result)) 
                        {
                        
                            $datos.="<option value='".$valor['ca_id']."'>".$valor['ca_nombre']."</option>";
                                                                                                                                      
                                                                
                         }

                         echo $datos;
                                                                                               
                    }	
                                                    
                      
                    mysqli_close($conexion);


?>
