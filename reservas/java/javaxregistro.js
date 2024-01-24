
    window.onload = function() {
    
    document.getElementById("reservar").disabled = true;
    }
        
    function carga_Inserta(){
           
        peticion_http_mod = inicializa_xhr();
        query_string_alta = montar_consulta();
        peticion_http_mod.onreadystatechange = procesaRespuesta_tabla;
        peticion_http_mod.open("POST", "./insertareserva.php", true);
        peticion_http_mod.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        peticion_http_mod.send(query_string_alta);

    }

    function procesaRespuesta_tabla() {
        
        if(peticion_http_mod.readyState == 4){
            if(peticion_http_mod.status == 200) {
                const respuesta = peticion_http_mod.responseText;
                if(respuesta == 0){
                    document.getElementById('msg_error').innerHTML="No se encuentra registrado el correo para realizar reserva";

                }else if(respuesta == 1){

                    document.getElementById('contenido').innerHTML="<h3 class='mensaje_registro'>Has realizado una reserva!!!</h3>";
                }
                            
            }
        }
    }
                      
    function montar_consulta(){
        const email = document.getElementById('email').value;
        const fecha = document.getElementById('fechres').value;
        const hora = document.getElementById('hora').value;
        const personas = document.getElementById('personas').value;
        const query_string_alta_cadena =

            "&email=" + encodeURIComponent(email) +
            "&fecha=" + encodeURIComponent(fecha) +
            "&hora=" + encodeURIComponent(hora) +
            "&personas=" + encodeURIComponent(personas) +
            "&nocache=";
                    
        return query_string_alta_cadena;           
    }
        
    function inicializa_xhr() {
            
        if(window.XMLHttpRequest) {
            return new XMLHttpRequest(); 
        }
        else if(window.ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
    } 
            

    const reservar=document.getElementById('reservar');
    reservar.addEventListener('click', () =>{

        let validar=true;
        const lista_atrib=new Array('email', 'fechres', 'hora');
        for(let i=0; i<lista_atrib.length; i++){
            let atributo=document.getElementById(lista_atrib[i]).value;

            if(atributo.length == 0){
                document.querySelector("."+lista_atrib[i]).innerHTML='*';
                validar=false;
            }else{

                switch (lista_atrib[i]) {
                    case 'email':

                        var patron=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                        if (!patron.test(document.getElementById('email').value)){
                            document.querySelector("."+lista_atrib[i]).innerHTML="*La dirección email es incorrecta";
                            validar=false;             
                        }else{
                            document.querySelector("."+lista_atrib[i]).innerHTML='';
                        }
                        break;

                    default:
                        document.querySelector("."+lista_atrib[i]).innerHTML='';
                }   
            }
            
        }

        if(validar){
            carga_Inserta();       
            document.getElementById("imagen").style.display = "none";
        }

    });

    const comprueba=document.getElementById("comprueba");
    comprueba.addEventListener('click', (e)=>{
        const fecha=document.getElementById('fechres').value;
        const hora=document.getElementById('hora').value;
    
        if(fecha.length == 0 || hora.length == 0){
            document.getElementById("msg_error").innerHTML="Debes de seleccionar Fecha y Hora";
        }else{
            f=new Date(fecha);
            fecha_res=f.toISOString().split('T')[0];
            hoy=new Date();
            f_actual=hoy.toISOString().split('T')[0];
            
            if(fecha_res<f_actual){
                document.getElementById("msg_error").innerHTML="*La fecha seleccionada es anterior a la actual";
            }else{
                document.getElementById("msg_error").innerHTML="";        
                $.ajax(
                    'total_mesas.php',
                    {
                        success: function(response) {
                        
                        recoge_Comersales(response);
                        },
                        error: function() {
                        
                        }
                    }
                );
                
                function recoge_Comersales(total_m){
                    
                    $.ajax({
                        data:{
                            "fecha" : fecha,
                            "hora" : hora
                            }, 
                        url:   'recoge_comersales.php', 
                        type:  'post', 
                        success:  function (response) { 
                            
                            let suma=0;
                            let datos=``;
                            if(response == 0){
                                let todas_l=total_m*4;
                                datos+=`<label><b>Comersales:</b></label>`;
                                datos+=`<select id='personas'>`;
                                for(let i=1; i<=todas_l; i++){ 
                                    datos+=`<option value='${i}'>${i}</option>`;
                                }
                                datos+=`</select>`;
                                document.getElementById("comersales").innerHTML=datos;
                                document.getElementById("reservar").disabled = false;
                            }else{

                                const recorte=response.substring(0, response.length - 1);
                                l_comersales=recorte.split("_");
                                    
                                for(let i=0; i<l_comersales.length; i++){
                                    suma+=parseInt(l_comersales[i]);
                                }

                                let mesas_o=Math.round(suma/4);
                                let mesas_l=(total_m-mesas_o);
                                let comersales_l=mesas_l*4;
                        
                                if(comersales_l != 0){
                                    datos+=`<label><b>Comersales:</b></label>`;
                                    datos+=`<select id='personas'>`;
                                    
                                    for(let i=1; i<=comersales_l; i++){
                                        datos+=`<option value='${i}'>${i}</option>`;
                                    }
                    
                                    datos+=`</select>`;
                                    document.getElementById("comersales").innerHTML=datos;
                                    document.getElementById("reservar").disabled = false;
                                }else{

                                    document.getElementById("msg_error").innerHTML="Ya se encuentra todo reservado";

                                }
                            
                            }
                        
                        }
                    });
                }
            }
        }

    });


