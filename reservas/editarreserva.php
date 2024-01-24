<?php
                 $operador=$_POST['operador'];
                 $id_reserva_int=intval($_POST['id_reserva']);
                 $nombre=$_POST['nombre'];
                 $apellidos=$_POST['apellidos'];
                 $email=$_POST['email'];
                 $fecha=$_POST['fecha'];
                 $hora=$_POST['hora'];
                 $personas=$_POST['personas'];
                 $estado=$_POST['estado'];

                                                                                             
                   
                $conexion = mysqli_connect('localhost','root','');
                mysqli_select_db($conexion, 'restaurante');

                if (!$conexion){
                    echo "No pudo conectarse a la BD: " . mysql_error();
                    exit();
                }
                                        
    
                switch ($operador) {
                    case 'editar':
                        $consulta = "UPDATE reservas SET  re_fechahora='".$fecha."', re_hora='".$hora."', re_numpersonas=".$personas.", re_estado='".$estado."' WHERE re_id=".$id_reserva_int.";";                            
                        break;
                      
                    case 'eliminar':
                        $consulta="DELETE FROM reservas WHERE re_id=".$id_reserva_int;
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