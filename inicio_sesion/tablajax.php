<?php
                                        
                                            header('Content-Type: text/html; charset=ISO-8859-1');

                                         
                                            $GLOBALS['DB_IP'] = 'localhost';
                                            $GLOBALS['DB_USER'] = 'root';
                                            $GLOBALS['DB_PASS'] = '';
                                            $GLOBALS['DB_NAME'] = 'restaurante';


                                            $conexion = mysqli_connect($GLOBALS['DB_IP'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASS']);

                                            mysqli_select_db($conexion, $GLOBALS['DB_NAME']);
                                            
                              
                                            if (!$conexion) 
                                            {
                                            echo "No pudo conectarse a la BD: " . mysql_error();
                                            exit();
                                            }
                                            
                                                
                                                $php_email= $_POST['mail'];
                                               
                                                $consulta = "SELECT * FROM clientes WHERE c_email = '$php_email'";
                                                $result = mysqli_query($conexion,$consulta);
                                                $contarl=0;
                                                if (mysqli_num_rows($result) == 0) 
                                                        {
                                                                                                                             
                                                                die("No se encuentra el correo en la base de datos");
                                                        } 
                                                else {
                                                            
                                                    while ($valor = mysqli_fetch_array($result)) 
                                                    {
                                                       
                                                        $ver_ds = $valor['c_nombre'];
                                                        $ver_ds2 = $valor['c_apellidos'];
                                                        $ver_ds3 = $valor['c_email'];
                                                                    
                                                                
                   
                                                    }

                                                                
                                                    $datos="<p>Nombre: ".$ver_ds;
                                                    $datos.="<p>Apellidos: ".$ver_ds2;
                                                    $datos.="<p>Email: ".$ver_ds3;

                					                echo $datos;
                                                                            
                                                }	

      
                                            mysqli_close($conexion);


                                        ?>