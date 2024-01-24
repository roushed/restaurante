<?php
                                        
                                                                                             
                  
                    $conexion = mysqli_connect('localhost','root','');
                    mysqli_select_db($conexion, 'restaurante');
                                        
                    if (!$conexion) 
                        {
                            echo "No pudo conectarse a la BD: " . mysql_error();
                            exit();
                        }
                                        
                    $valor="ca_id";
                        
                    if(isset($_POST['valor'])){

                        $valor=$_POST['valor'];
                    }


                    $consulta = "SELECT * FROM cartas  ORDER BY $valor ASC";
                    $result = mysqli_query($conexion,$consulta);
                    $contarl=0;
                    if (mysqli_num_rows($result) == 0){
                                                                                         
                        echo "No se ha podido cargar la base de datos";
                        
                    }else {
                        
                        
                        $datos="<thead> <tr class='bg-dark text-white'>";
                        $datos.="<th class='p-2'>Id Carta</th><th class='p-2'>Nombre Carta</th><th class='p-2'>Descripcion</th><th class='p-2'>Precio</th><th class='p-2'>Tipo</th><th class='p-2'>Id alergeno</th><th class='thinsertar' id='thinsertar'></th>";
                        $datos.="</tr>";     
                        $datos.="</thead>";
                        $datos.="<tbody id='tebody'>";
                        while ($valor = mysqli_fetch_array($result)) 
                        {
                                                    
                            $consulta_al="SELECT cal_id_alergeno FROM cartas_alergenos WHERE cal_id_carta=".$valor['ca_id'];
                            $result_al = mysqli_query($conexion,$consulta_al);
                            $datos_al="";
                            $total="";
                            while($valor_al = mysqli_fetch_array($result_al))
                            {

                                
                                $datos_al.="<img src='./alergenos/".$valor_al['cal_id_alergeno'].".png' width='20%' height='20%'></img>";
                                $total.=$valor_al['cal_id_alergeno'];
                            }      
                            $datos_al.="<input type='hidden' value='$total'>";                     
                            $datos.="<tr id='".$valor['ca_id']."'>";
                            $datos.="<td>".$valor['ca_id']."</td><td>".$valor['ca_nombre']."</td><td>".$valor['ca_descripcion']."</td><td>".$valor['ca_precioplato']." €</td><td>".$valor['ca_tipoproducto']."</td><td>".$datos_al."</td>";
                            $datos.="<td class='panel'><img src='./img/edit.jpg' class='editar'> <img src='./img/del.jpg' class='eliminar'></td>";
                            $datos.="</tr>";
                                                                                                                                                                                            
                         }

                                               
                         $datos.="</tbody>";
                         echo $datos;
                                                                                               
                        }	
                                                    
                         mysqli_close($conexion);


?>

