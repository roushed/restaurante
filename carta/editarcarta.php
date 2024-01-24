<?php
                 $operador=$_POST['operador'];
                 $id_carta_int=intval($_POST['id_carta']);
                 $id_menu_int=intval($_POST['id_menu']);
                 $nombre=$_POST['nombre'];
                 $descripcion=$_POST['descripcion'];
                 $precio=$_POST['precioplato'];
                 $tipo=$_POST['tipoproducto'];
                 $alergenos=$_POST['idalergeno'];
                 $idalergeno=explode(" ", $alergenos);
                                                                                                  
           
                $conexion = mysqli_connect('localhost','root','');
                mysqli_select_db($conexion, 'restaurante');
                                        
                   
                    if (!$conexion) 
                        {
                            echo "No pudo conectarse a la BD: " . mysql_error();
                            exit();
                        }
                                        
                     
                        
                    switch ($operador) {
                        case 'editar':
                            $consulta = "UPDATE cartas SET ca_nombre='".$nombre."' , ca_descripcion='".$descripcion."' , ca_precioplato='".$precio."' , ca_tipoproducto='".$tipo."' WHERE ca_id=".$id_carta_int.";";
                            $result = mysqli_query($conexion,$consulta);
                            
                            $consultad="DELETE FROM cartas_alergenos WHERE cal_id_carta=".$id_carta_int.";";
                            $result = mysqli_query($conexion,$consultad);
                            $consulta3="";
                            for($i=0; $i<count($idalergeno); $i++){
                                
                                $consulta3="INSERT INTO cartas_alergenos SET cal_id=0 ,cal_id_carta =".$id_carta_int.", cal_id_alergeno =".intval($idalergeno[$i])."; ";
                                $result = mysqli_query($conexion,$consulta3);
                                
                            }
                            
                           
                        break;

                        case 'insertar':
                            $consulta ="INSERT INTO cartas SET ca_id=0, ca_nombre='".$nombre."' , ca_descripcion='".$descripcion."' , ca_precioplato='".$precio."' , ca_tipoproducto='".$tipo."';";
                            $result = mysqli_query($conexion,$consulta);
                           
                            $consulta_id = "SELECT MAX(ca_id)  AS max_page FROM cartas";
                            $result = mysqli_query($conexion,$consulta_id);
                            $id_fila = mysqli_fetch_array($result);
                            $id_carta_int=intval($id_fila["max_page"]);
                            
                            $consulta3="";
                            for($i=0; $i<count($idalergeno); $i++){
                                
                                $consulta3="INSERT INTO cartas_alergenos SET cal_id=0 ,cal_id_carta =".$id_carta_int.", cal_id_alergeno =".intval($idalergeno[$i])."; ";
                                $result = mysqli_query($conexion,$consulta3);
                                
                            }
                            
                        break;

                        case 'eliminar':
                           $consulta="DELETE FROM cartas WHERE ca_id=".$id_carta_int;
                           $result = mysqli_query($conexion,$consulta);
                        break;
                    }
                        
                                            
                     if($result){

                        echo "Se ha realizado";

                     }else{

                        echo "Error";

                     }                                                                        
                    	                                                  
                    mysqli_close($conexion);


?>