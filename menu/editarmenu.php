<?php
                 $operador=$_POST['operador'];
                 $id_menu=$_POST['id_menu'];
                 $id_menu_int=intval($_POST['id_menu']);
                 $id_carta=$_POST['id_carta'];
                 $precio=$_POST['precio'];
                 $tipo=$_POST['tipo'];
                                            
                                                                                             
            
                    $conexion = mysqli_connect('localhost','root','');
                    mysqli_select_db($conexion, 'restaurante');
                                        

                    if (!$conexion) 
                        {
                            echo "No pudo conectarse a la BD: " . mysql_error();
                            exit();
                        }
                                        
                      
                        
                    switch ($operador) {
                        case 'editar':
                            $consulta = "UPDATE menus SET me_precio='".$precio."' , me_tipo='".$tipo."' WHERE me_id=".$id_menu_int;    
                        break;

                        case 'insertar':
                            $consulta ="INSERT INTO menus SET me_id=0, me_precio='".$precio."' , me_tipo='".$tipo."'";
                        break;

                        case 'eliminar':
                           $consulta="DELETE FROM menus WHERE me_id=".$id_menu_int;
                        break;
                    }
                        
                                            
              
                    
                    $result = mysqli_query($conexion,$consulta);
                    
                     if($result){

                        echo "Se ha realizado";


                     }else{

                        echo "Error";

                     }                                                                        
                    	
                                                    
                    mysqli_close($conexion);


?>
