<?php
                 $operador=$_POST['operador'];
                 $id_alergeno_int=intval($_POST['id_alergeno']);
                 $descripcion=$_POST['descripcion'];
    
                $conexion = mysqli_connect('localhost','root','');
                mysqli_select_db($conexion, 'restaurante');
                                        

                    if (!$conexion) 
                        {
                            echo "No pudo conectarse a la BD: " . mysql_error();
                            exit();
                        }
                                        
                      
                    switch ($operador) {
                        case 'editar':
                            $consulta = "UPDATE alergenos SET al_descripcion='".$descripcion."' WHERE al_id=".$id_alergeno_int;    
                        break;

                        case 'insertar':
                            $consulta ="INSERT INTO alergenos SET al_id=$id_alergeno_int, al_descripcion='".$descripcion."'";
                        break;

                        case 'eliminar':
                           $consulta="DELETE FROM alergenos WHERE al_id=".$id_alergeno_int;
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