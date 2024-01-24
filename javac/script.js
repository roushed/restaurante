
window.onload = function() {

    carga_tabla();
    setTimeout("desbloquea()",2800);
    }
   
     function carga_tabla(){
        
        peticion_http_tabla = inicializa_xhr();
        peticion_http_tabla.onreadystatechange = procesaRespuesta_tabla;
        peticion_http_tabla.open("POST", "../carga_php/carga.php", true);
        peticion_http_tabla.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        peticion_http_tabla.send();
        
        
    }

   
    function procesaRespuesta_tabla() 
    {

        
        document.getElementById("contenido").style.display = "none";
       
	
       if(peticion_http_tabla.readyState == 4) 
        {
            if(peticion_http_tabla.status == 200) 
            {
 		
                var respuesta = peticion_http_tabla.responseText;
                document.getElementById("imagen").innerHTML = respuesta;

		
            
            }
        }
        

        
    }
    
    

    function inicializa_xhr() {
      if(window.XMLHttpRequest) {
        return new XMLHttpRequest(); 
      }
      else if(window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
        }
    } 


    function desbloquea(){
        document.getElementById("contenido").style.display = "block";
        document.getElementById("imagen").style.display = "none";

    }




