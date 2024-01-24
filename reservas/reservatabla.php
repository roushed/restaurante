<?php
                                        
                                                                                             
         
                    $conexion = mysqli_connect('localhost','root','');
                    mysqli_select_db($conexion, 'restaurante');
      
                    if (!$conexion){
                        echo "No pudo conectarse a la BD: " . mysql_error();
                        exit();
                    }
                                                                                                      
                    if(isset($_POST['consulta'])){
                        
                        $consulta=$_POST['consulta'];

                    }else{

                        $consulta = "SELECT r.re_id, c.c_nombre, c.c_apellidos, r.re_email, r.re_fechahora, r.re_hora, r.re_numpersonas, r.re_estado FROM reservas r, clientes c WHERE c.c_email=r.re_email ORDER BY r.re_fechahora ASC";

                    }              
                  
                    
                    $result = mysqli_query($conexion,$consulta);
                    $contarl=0;
                    
                    if (mysqli_num_rows($result) == 0){
                                                   
                        echo "No se ha podido cargar la base de datos";
                        
                    }else {
                         
                        $datos="<thead> <tr class='bg-dark text-white'>";
                        $datos.="<th class='p-2'>Id Reserva</th><th class='p-2'>Nombre</th><th class='p-2'>Apellidos</th><th class='p-2'>Email</th><th class='p-2'>Fecha</th><th class='p-2'>Hora</th><th class='p-2'>Personas</th><th class='p-2'>Estado</th><th></th>";
                        $datos.="</tr>";     
                        $datos.="</thead>";
                        $datos.="<tbody id='tebody'>";
                        while ($valor = mysqli_fetch_array($result)) 
                        {
                                                                                
                            $datos.="<tr id='".$valor['re_id']."'>";
                            $datos.="<td>".$valor['re_id']."</td><td>".$valor['c_nombre']."</td><td>".$valor['c_apellidos']."</td><td>".$valor['re_email']."</td><td>".$valor['re_fechahora']."</td><td>".$valor['re_hora']."</td><td>".$valor['re_numpersonas']."</td><td>".$valor['re_estado']."</td>";
                            $datos.="<td class='panel'><img src='./img/edit.jpg' class='editar'> <img src='./img/del.jpg' class='eliminar'></td>";
                            $datos.="</tr>";                                                                                                                                      
                                                                
                         }

                                               
                         $datos.="</tbody>";
                         
                         echo $datos;
                                                                                               
                    }	
                                                    
                    mysqli_close($conexion);


?>

