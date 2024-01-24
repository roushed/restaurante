<?php
                                        
                                                                                             
   
                    $conexion = mysqli_connect('localhost','root','');                                                   
                    mysqli_select_db($conexion, 'restaurante');

                    if (!$conexion) 
                        {
                            echo "No pudo conectarse a la BD: " . mysql_error();
                            exit();
                        }
                                        

                    $consulta = "SELECT * FROM alergenos ORDER BY al_id ASC";
                    $result = mysqli_query($conexion,$consulta);
                    $contarl=0;
                    if (mysqli_num_rows($result) == 0) {
                                 
                            echo "No se ha podido cargar la base de datos";
                        
                    }else {

                        $datos="";
                        while ($valor = mysqli_fetch_array($result)) 
                        {
                                                    
                            $datos.=$valor['al_id'].";<img src='../carta/alergenos/".$valor['al_id'].".png'> ".$valor['al_descripcion']."_";                                                                                       
                                                                
                         }

                                               
              
                         
                         echo $datos;
                                                                                               
                    }	
                                                    
                      
                    mysqli_close($conexion);


?>