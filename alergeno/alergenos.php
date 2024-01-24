<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="./css/style.css">
    <link rel="stylesheet" href="../cssc/style.css">
    <link rel="stylesheet" href="../cssc/fadein.css">
    <link rel="shortcut icon" href="../cssc/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">
    <link rel="shortcut icon" href="../cssc/favicono.ico"/>
    <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
    <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
</head>
<body>
    <div class="container">
    

        <div class="row">

            <div class="col-12 bg-dark mt-2">
                <center><img src="../imgc/titulo.png"></center>
            </div>
            


        </div>

        <div class="row text-white bg-dark p-3 " >
            
            <div class="col-3 col-md-2 secciones">
                <a class="w-100 hover-shadow font-italic display-6" href="../indice/index.html">Inicio</a>
            </div>
            <div class="col-3 col-md-2 secciones">
                <a class="w-100 hover-shadow font-italic" href="./registro.html">Registro</a>
            </div>
            <div class="col-3 col-md-2 secciones">
                <a class="w-100 hover-shadow font-italic" href="../inicio_sesion/iniciosesion.html">Inicio Sesión</a>
            </div>
            <div class="col-3 col-md-2 secciones">
                <a class="w-100 hover-shadow font-italic" href="../reservas/reservas.html">Reserva</a>
            </div>
            <div class="col-3 col-md-2 secciones">
                <a class="w-100 hover-shadow font-italic" href="">Historia</a>
            </div>
            <div class="col-3 col-md-2 secciones">
                <a class="w-100 hover-shadow font-italic" href="">Contacto</a>
            </div>
        
        </div>

        
        <div class="row portada">
            
            <div class="col-12 mh-30 fondot" >
              
            </div>

        </div>
       
        <div class="row text-white bg-dark p-1 " >
        </div>


        <div class="row bg-white">
            
            <div class="col-12 contenidor text-center">
                <h2 class="text-center p-4 registro">Alergenos:</h2>
                <div class="d-flex justify-content-center m-5" id='contenidito'>
                    <table id="tablita" class="table table-hover table-sm table-active table-striped">

                    <?php
                                        
                        $conexion = mysqli_connect('localhost','root','');
                        mysqli_select_db($conexion, 'restaurante');
                                                            
                        if (!$conexion) 
                        {
                            echo "No pudo conectarse a la BD: " . mysql_error();
                            exit();
                        }
                                                            
                                                                        
                        $consulta = "SELECT * FROM alergenos ORDER BY al_id ASC";
                        $result = mysqli_query($conexion,$consulta);
                        $contarl=0;
                                        if (mysqli_num_rows($result) == 0){
                                    
                                                echo "No se ha podido cargar la base de datos";
                                            
                                        }else {
                                            
                                            $datos="<thead> <tr class='bg-dark text-white'>";
                                            $datos.="<th class='p-2'>Id alergeno</th><th class='p-2'>Descripcion</th><th class='thinsertar' id='thinsertar'></th>";
                                            $datos.="</tr>";     
                                            $datos.="</thead>";
                                            $datos.="<tbody id='tebody'>";
                                            while ($valor = mysqli_fetch_array($result)) 
                                            {
                                                                        
                                                                        
                                                $datos.="<tr id='".$valor['al_id']."'>";
                                                $datos.="<td>".$valor['al_id']."</td><td>".$valor['al_descripcion']."</td>";
                                                $datos.="<td class='panel'><img src='./img/edit.jpg' class='editar'> <img src='./img/del.jpg' class='eliminar'></td>";
                                                $datos.="</tr>";
                                                                                                                                                                                                                                        
                                             }
                    
                                                                   
                                             $datos.="</tbody>";
                                             echo $datos;
                                                                                                                   
                                            }	
                                                                        
                                             mysqli_close($conexion);
                    
                    ?>

                    </table>
                </div>
                                 
            </div>
        
        </div>
            
        <div class="row bg-dark">
            
            <div class="col-7 p-3 footer text-white textfoot">
                © Scarlatti Restaurant 2022. All Rights Reserved. 
            </div>
            <div class="col-1 p-3 text-white textfoot">Siguenos:</div>
            <div class="col-1 p-3"><img class="icosf" src="../imgc/facebook.png" width="5%" height="5%"/></div>
            <div class="col-1 p-3"><img class="icosf" src="../imgc/twitter.png" width="5%" height="5%"/></div>
            <div class="col-1 p-3"><img class="icosf" src="../imgc/instagram.png" width="5%" height="5%"/></div>
            </div>

        
        </div>


    </div>
    <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
    <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
    <script type="text/javascript" src="./java/traduccion_es.js"></script>
    
</body>
</html>