<?php
                                        
                                                                                             
              
                    $conexion = mysqli_connect('localhost','root','');
                    mysqli_select_db($conexion, 'restaurante');

                    if (!$conexion) 
                        {
                            echo "No pudo conectarse a la BD: " . mysql_error();
                            exit();
                        }
                                        

                    $id_menu=intval($_POST['id_menu']);
                           
                    $consulta = "SELECT c.* FROM cartas c, menus m, cartas_menus cm WHERE cm.cm_id_cartas=c.ca_id AND cm.cm_id_menus=m.me_id AND cm.cm_id_menus=$id_menu";
                    $result = mysqli_query($conexion,$consulta);
                    $contarl=0;
                    if (mysqli_num_rows($result) == 0){
        
                            $datos= $datos="<thead> <tr class='bg-dark text-white'>";
                            $datos.="<th class='p-2'>Id Carta</th><th class='p-2'>Nombre Carta</th><th class='p-2'>Descripcion</th><th class='p-2'>Precio</th><th class='p-2'>Tipo</th><th class='p-2'>Id alergeno</th><th class='thinsertar' id='thinsertar'></th>";
                            $datos.="</tr>";     
                            $datos.="</thead>";
                            $datos.="<tbody id='tebody'>";             
                            $datos.="<tr>";
                            $datos.="<td colspan='7'>&nbsp</td>";
                            $datos.="</tr>";                 
                            $datos.="</tbody>";

                            echo $datos;
                        
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
                                while($valor_al = mysqli_fetch_array($result_al))
                                {

                                    $datos_al.="<img src='../carta/alergenos/".$valor_al['cal_id_alergeno'].".png' width='20%' height='20%'></img>";
                                
                                }      
                                                        
                                                        
                                $datos.="<tr id='".$valor['ca_id']."'>";
                                $datos.="<td>".$valor['ca_id']."</td><td>".$valor['ca_nombre']."</td><td>".$valor['ca_descripcion']."</td><td>".$valor['ca_precioplato']." €</td><td>".$valor['ca_tipoproducto']."</td><td>$datos_al</td>";
                                $datos.="<td class='panel'><img src='./img/del.jpg' class='eliminar'></td>";
                                $datos.="</tr>";
                                                        
                                  
                            }

                                                
                            $datos.="</tbody>";
                            echo $datos;
                                                                                               
                        }	
                                                    
                      
                         mysqli_close($conexion);


?>

