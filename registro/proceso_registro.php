<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="./css/style.css">
    <link rel="stylesheet" href="../cssc/style.css">
    <link rel="shortcut icon" href="../cssc/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">
    <link rel="shortcut icon" href="../cssc/favicono.ico"/>
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
                <a class="w-100 hover-shadow font-italic" href="../indice/index.html">INICIO</a>
            </div>
            <div class="col-3 col-md-2 secciones">
                <a class="w-100 hover-shadow font-italic" href="./registro.html">REGISTRO</a>
            </div>
            <div class="col-3 col-md-2 secciones">
                <a class="w-100 hover-shadow font-italic" href="../inicio_sesion/iniciosesion.html">INICIO SESIÓN</a>
            </div>
            <div class="col-3 col-md-2 secciones">
                <a class="w-100 hover-shadow font-italic" href="../reservas/reservas.html">RESERVA</a>
            </div>
            <div class="col-3 col-md-2 secciones">
                <a class="w-100 hover-shadow font-italic" href="">HISTORIA</a>
            </div>
            <div class="col-3 col-md-2 secciones">
                <a class="w-100 hover-shadow font-italic" href="">CONTACTO</a>
            </div>
        
        </div>

        
        <div class="row portada">
            
            <div class="col-12 mh-30 fondot" >
              
            </div>

        
        </div>
       
        <div class="row text-white bg-dark p-1 " >


        </div>


        <div class="row">
            
            <div class="col-12 contenidor pt-4">

               <div class="border m-1 bg-white mb-4">
                <h2 class="text-center p-4">Proceso de Registro:</h2>

                    <div class="contenido p-3">

                        <?php

                            if(isset($_POST["nom"])){            
                                header('Content-Type: text/html; charset=ISO-8859-1');
                                $GLOBALS['DB_IP'] = 'localhost';
                                $GLOBALS['DB_USER'] = 'root';
                                $GLOBALS['DB_PASS'] = '';
                                $GLOBALS['DB_NAME'] = 'restaurante';

                                $conexion = mysqli_connect($GLOBALS['DB_IP'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASS']);
                                mysqli_select_db($conexion, $GLOBALS['DB_NAME']);

                                if (!$conexion) 
                                {
                                    echo "No pudo conectarse a la BD: " . mysql_error();
                                    exit();
                                }


                                $nombre=$_POST["nom"];
                                $apellido=$_POST["ape"];
                                $password=$_POST["pass"];
                                $dni=$_POST["dni"];
                                $fecha=$_POST["fechnac"];
                                $fecha_s = explode("/", $fecha);
                                $fecha_r=array_reverse($fecha_s);
                                $fecha_j=join("-",$fecha_r);
                                $telefono=$_POST["tel"];
                                $direccion=$_POST["dir"];
                                $email=$_POST["email"];
                    
                                $consultas = "SELECT * FROM clientes WHERE c_email='".$email."'";
                                $results = mysqli_query($conexion,$consultas);
                                                    
                                if($results){
                                
                                    if(mysqli_num_rows($results) >0){
                                        echo "<center><p>Ya existe el correo $email</center></p>";
                                        echo "<p><center><a href='./registro.html'> Volver </a></center></p>";
                                    
                                    }else{
                                    
                                        $consulta = "INSERT INTO clientes SET c_nombre='".$nombre."', c_apellidos='".$apellido."' , c_password='".$password."' , c_dni='".$dni."' , c_fechanac='".$fecha_j."' ,  c_email='".$email."' , c_telefono='".$telefono."' , c_direccion='".$direccion."' , c_rol='user' , c_puntos='0'";
                                        $result = mysqli_query($conexion,$consulta);
                                        
                                        if($result){
                                            echo "<center><p>Hola $nombre!! Usted se ha registrado en el restaurante Scarlatti.</center></p>";
                                            echo "<p><center><a href='../indice/index.html'> Volver </a></center></p>";
                                                            
                                        }else{
                                            echo "Error, no se ha podido contactart con la bbdd";
                                        }     
                                    }

                                }else{
                                    echo "Error, no se se puede consultar con la bbdd";
                                }

                                mysqli_close($conexion);

                            }
                        ?>


                    </div>

                            <div class="row mt-4 justify-content-center d-flex">
                                <div class="fondo2">
                                  
                                </div>
                    
                    
                            </div>

                        </form>
                    </div>
                    
 
            </div>


        </div>

 
        <div class="row bg-dark">
            
            <div class="col-7 p-3 footer text-white">
                © Scarlatti Restaurant 2022. All Rights Reserved. 
            </div>
            <div class="col-1 p-3 text-white">Siguenos:</div>
            <div class="col-1 p-3"><img class="icosf" src="../imgc/facebook.png" width="5%" height="5%"/></div>
            <div class="col-1 p-3"><img class="icosf" src="../imgc/twitter.png" width="5%" height="5%"/></div>
            <div class="col-1 p-3"><img class="icosf" src="../imgc/instagram.png" width="5%" height="5%"/></div>
            </div>

        
        </div>


    </div>
    <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
    <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
    <script type="text/javascript" src="./java/traduccion_es.js"></script>
    <script src="./java/script.js" defer></script>
</body>
</html>