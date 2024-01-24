const ejecuta=document.getElementById('ejecuta');
ejecuta.addEventListener('click', ()=>{



        peticion_http_mod = inicializa_xhr();
        query_string_alta = montar_cadena();
        peticion_http_mod.onreadystatechange = procesaRespuesta3;
        peticion_http_mod.open("POST", "./tablajax.php", true);
        peticion_http_mod.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        peticion_http_mod.send(query_string_alta);
        
        
    });
    
    function procesaRespuesta3() 
    {
    
        
       if(peticion_http_mod.readyState == 4) 
        {
            if(peticion_http_mod.status == 200) 
            {
                var respuesta = peticion_http_mod.responseText;
                document.getElementById("conte").innerHTML = respuesta;
              
            }
        }
    }
    
    
    function montar_cadena()
    {
    
    
    var ds_j = document.getElementById("mail").value;
    
    var query_string_alta_cadena = "mail=" + encodeURIComponent(ds_j);
            
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
       


