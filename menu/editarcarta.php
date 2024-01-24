<?php
                 $operador=$_POST['operador'];
                 $id_carta_int=intval($_POST['id_carta']);
                 $id_menu_int=intval($_POST['id_menu']);
                 $nombre=$_POST['nombre'];
                 $descripcion=$_POST['descripcion'];
                 $precio=$_POST['precioplato'];
                 $tipo=$_POST['tipoproducto'];
                 $idalergeno=$_POST['idalergeno'];
                                      
                $conexion = mysqli_connect('localhost','root','');
                mysqli_select_db($conexion, 'restaurante');
                                        
                
                    if (!$conexion) 
                        {
                            echo "No pudo conectarse a la BD: " . mysql_error();
                            exit();
                        }
                                        

                    switch ($operador) {
                        
                        case 'insertar':
                                                                                 
                            $consulta="INSERT INTO cartas_menus SET cm_id=0, cm_id_cartas=$id_carta_int , cm_id_menus=".$id_menu_int;
                            $result = mysqli_query($conexion,$consulta);
                            
                        break;

                        case 'eliminar':
                           
                            $consulta="DELETE FROM cartas_menus WHERE cm_id_cartas=".$id_carta_int;
                            $result = mysqli_query($conexion,$consulta);
                           
                        break;

                        case 'comprobar':
                           
                            $consulta="SELECT * FROM cartas_menus WHERE cm_id_cartas=$id_carta_int AND cm_id_menus=$id_menu_int";
                            $result = mysqli_query($conexion,$consulta);
                           
                            if (mysqli_num_rows($result)>0) 
                            {                        
                                echo 0;
                            }else{
                                echo 1;
                            }
                           
                            break;
                    }
                        
                                
                    mysqli_close($conexion);


?>