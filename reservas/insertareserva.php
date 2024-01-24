<?php

               
               $email=$_POST['email'];
               $fecha=$_POST['fecha'];
               $hora=$_POST['hora'];
               $personas=$_POST['personas'];
                                                                                           
               $conexion = mysqli_connect('localhost','root','');                                          
                  mysqli_select_db($conexion, 'restaurante');
                                        

                  if (!$conexion) 
                        {
                            echo "No pudo conectarse a la BD: " . mysql_error();
                            exit();
                        }

                     $consulta="SELECT * FROM clientes WHERE c_email='$email'";
                     $result = mysqli_query($conexion,$consulta);

                     if (mysqli_num_rows($result) !=0){

                        
                           
                        $consulta ="INSERT INTO reservas SET re_id=0, re_email='".$email."', re_fechahora='".$fecha."', re_hora='".$hora."', re_numpersonas=".$personas.", re_estado=1;";                        
                        $result = mysqli_query($conexion,$consulta);
                     
                        if($result){
                          
                           echo 1;
                        }else{
                           
                           echo "<h3 class='mensaje_registro'>Error, problemas de registro</h3>";
                        }                                                                        

                        
                     }else{
                        echo 0;

                     }
                    
                     mysqli_close($conexion);

                    
?>