<?php
                                        
                                                                                             
               
                    $conexion = mysqli_connect('localhost','root','');
                    mysqli_select_db($conexion, 'restaurante');
                                        

                    if (!$conexion) 
                        {
                            echo "No pudo conectarse a la BD: " . mysql_error();
                            exit();
                        }
                                        
                                                                                      
                    $consulta = "SELECT * FROM menus ORDER BY me_id ASC";
                    $result = mysqli_query($conexion,$consulta);
                    $contarl=0;
                    if (mysqli_num_rows($result) == 0){
                    
                                                          
                            echo "No se ha podido cargar la base de datos";
                        
                    }else {
                        
                        
                        $datos="<thead> <tr class='bg-dark text-white'>";
                        $datos.="<th>Id Menu</th><th>Precio</th><th>Tipo Menu</th><th><input type='button' value='Insertar' id='insertar'></th>";
                        $datos.="</tr>";     
                        $datos.="</thead>";
                        $datos.="<tbody>";
                        while ($valor = mysqli_fetch_array($result)) 
                        {
                                                    
                                                    
                         $datos.="<tr id='".$valor['me_id']."'>";
                         $datos.="<td>".$valor['me_id']."</td><td>".$valor['me_precio']." €</td><td>".$valor['me_tipo']."</td>";
                         $datos.="<td class='panel'><img src='./img/edit.jpg' class='editar'> <img src='./img/del.jpg' class='eliminar'> <img src='./img/vista.jpg' class='ver'></td>";
                         $datos.="</tr>";
                                                     
                                      
                         }

                                               
                         $datos.="</tbody>";
                         
                         echo $datos;
                                                                                               
                    }	
                                                    
                      
                    mysqli_close($conexion);


?>

