
                                        
                                        <?php
                                        
                                            header('Content-Type: text/html; charset=ISO-8859-1');

                                            $GLOBALS['DB_IP'] = 'localhost';
                                            $GLOBALS['DB_USER'] = 'root';
                                            $GLOBALS['DB_PASS'] = '';
                                            $GLOBALS['DB_NAME'] = 'restaurante';
                                            $conexion = mysqli_connect($GLOBALS['DB_IP'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASS']);
                                            mysqli_select_db($conexion, $GLOBALS['DB_NAME']);
                                                                                       
                                            if (!$conexion){
                                                echo "No pudo conectarse a la BD: " . mysql_error();
                                                exit();
                                            }
                                            
                                            $php_pass = $_POST['cadenapass'];
                                            $php_email= $_POST['email'];
                                            echo $php_pass;

                                            $consulta = "SELECT * FROM clientes WHERE c_email = '$php_email'";
                                            $result = mysqli_query($conexion,$consulta);
                                            $contarl=0;
                                                if (mysqli_num_rows($result) == 0) 
                                                        {
                                              
                                                            header('Location:./errorbd.php');
                                                        } 
                                                else{} 
                                                       
                                                    while ($valor = mysqli_fetch_array($result)) 
                                                    {
                                      
                                                        $ver_ds = $valor['c_password'];
                                                        $rol = $valor['c_rol'];
                                                                                                                                                                                         
                                                        for($i=0; $i<strlen($php_pass); $i++){
                                                                    
                                                            if($ver_ds[$i] != $php_pass[$i]){
    
                                                                continue;
                                                            }
                                                            else{
    
                                                                $contarl++;
                                                            }
               
                                                        }
    
                                                        if($contarl != 3){
    
                                                            header('Location:./error.php');
                                                            
                                                            
                                                        }else{

                                                            switch ($rol) {
                                                                case "user":
                                                                    header('Location:./success_cli.php');
                                                                    break;
                                                                case "admin":
                                                                    header('Location:./success.php');
                                                                    break;
                                                             
                                                            }
    
                                                        }               
                                                    }
                                                                                                                                                                         
                                            mysqli_close($conexion);


                                        ?>
                                        
                                    