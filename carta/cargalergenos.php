                            
            <?php                                                                        
                    
                    $conexion = mysqli_connect('localhost','root','');                           
                    mysqli_select_db($conexion, 'restaurante');
                                        
                    if (!$conexion) 
                        {
                            echo "No pudo conectarse a la BD: " . mysql_error();
                            exit();
                        }
                                        
                    $consulta="SELECT al_id FROM alergenos";
                    $result = mysqli_query($conexion,$consulta);
                    
                    if (mysqli_num_rows($result) == 0){
                                                                                        
                        echo "No se ha podido cargar la base de datos";
                        
                    }else {
                        
                        $datos="";
                        while ($valor = mysqli_fetch_array($result)) 
                        {                          
                         $datos.=$valor['al_id']." ";                                         
                         }
                                                                 
                         echo $datos;
                                                                                               
                    }	
                                                      
                    mysqli_close($conexion);


            ?>

