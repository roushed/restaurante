<?php
                                        
                                                                                             
                 
                    $conexion = mysqli_connect('localhost','root','');
                    mysqli_select_db($conexion, 'restaurante');
             
                    if (!$conexion) 
                        {
                            echo "No pudo conectarse a la BD: " . mysql_error();
                            exit();
                        }
                     
                  
                    $id_carta=intval($_POST['id_carta']);

                    $consulta = "SELECT * FROM cartas WHERE ca_id=$id_carta";
                    $result = mysqli_query($conexion,$consulta);
                    $contarl=0;
                    if (mysqli_num_rows($result) == 0){
                                                          
                        echo "No se ha podido cargar la base de datos";
                        
                    }else {
                        
                       
                        $datos="";
                         
                        while ($valor = mysqli_fetch_array($result)) 
                        {
                            $consulta_al="SELECT cal_id_alergeno FROM cartas_alergenos WHERE cal_id_carta=".$valor['ca_id'];
                            $result_al = mysqli_query($conexion,$consulta_al);
                            $datos_al="";
                            

                            while($valor_al = mysqli_fetch_array($result_al))
                            {

                           
                                $datos_al.="<img src='../carta/alergenos/".$valor_al['cal_id_alergeno'].".png' width='20%' height='20%'></img>";
                              
                            }    
                            
                                                    
                                                    
                            $datos.=$valor['ca_id'].",".$valor['ca_descripcion'].",".$valor['ca_precioplato'].",".$valor['ca_tipoproducto'].",".$datos_al;
                                      
                         }
                                                     
                         
                         echo $datos;
                                                                                               
                    }	
                                                    
                    mysqli_close($conexion);


?>