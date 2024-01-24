
window.onload = function() {
    document.getElementById("contenido").style.display = "none";
    carga_tabla();
    setTimeout("desbloquea()",3000);

    }

    function desbloquea(){
       
        document.getElementById("imagen").style.display = "none";
        document.getElementById("contenido").style.display = "block";
    }
    
     function carga_tabla(){  
    
        peticion_http_tabla = inicializa_xhr();
        peticion_http_tabla.onreadystatechange = procesaRespuesta_tabla;
        peticion_http_tabla.open("POST", "./tablamenu.php", true);
        peticion_http_tabla.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        peticion_http_tabla.send();
        
        
    }


    function modificar_registro(editar, f){

        peticion_http_mod = inicializa_xhr();
        query_string_alta = montar_cadena(editar, f);
        peticion_http_mod.open("POST", "./editarmenu.php", true);
        peticion_http_mod.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        peticion_http_mod.send(query_string_alta);
        
        
    }

    

    function procesaRespuesta_tabla() 
    {
   
       if(peticion_http_tabla.readyState == 4) 
        {
            if(peticion_http_tabla.status == 200) 
            {
                var respuesta = peticion_http_tabla.responseText;
                document.getElementById("tablita").innerHTML = respuesta;
                prepara_tabla();
               
            
            }
        }
    }
    

    function montar_cadena(editar, f){

        const operador=editar;
        const tabla=document.getElementById('tablita');
        const id_menu = tabla.rows[f].cells[0].innerHTML;
        const precio = tabla.rows[f].cells[1].innerHTML;
        const tipo = tabla.rows[f].cells[2].innerHTML;
        const query_string_alta_cadena = "id_menu=" + encodeURIComponent(id_menu) +
                
                "&precio=" + encodeURIComponent(precio) +
                "&tipo=" + encodeURIComponent(tipo) +
                "&operador=" + encodeURIComponent(operador) +
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



    function prepara_tabla(){

        document.getElementById("cuadro_c").style.display = "none";
        const tabla=document.getElementById('tablita');
        const insertar=document.getElementById('insertar');
        let puedoinsertar=false;
        let fila=0;

        document.getElementById("x").addEventListener('click', ()=>{
        document.getElementById("cuadro_c").style.display = "none";
        });
        

        insertar.addEventListener('click',(e)=>{
            puedoinsertar=true;
            const elemento = tabla.rows.length; 
            const row=tabla.insertRow(elemento);
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            
                $.ajax(
                    'recogeidmenu.php',
                    {
                        success: function(data) {

                        cell1.innerHTML = data;
                        },
                        error: function() {
                    
                        }
                    }
                );

        
            cell2.innerHTML = "<input type='text' size='5' id='val2'>";
            cell3.innerHTML = "<input type='text' size='14' id='val3'>";
            const imgedit=document.createElement('img');
            imgedit.setAttribute('class','grabar');
            imgedit.setAttribute('src','./img/save.jpg')
            imgedit.onclick=graba;
            cell4.append(imgedit);
                
        });

        const eliminar = document.querySelectorAll(".eliminar");
        const elimina=  (e)=> {
        
            const opcion = confirm("¿Desea eliminar el registro?");
            if (opcion) {
            
                var nodoTd = e.target.parentNode; 
                var fila = nodoTd.parentNode.rowIndex; 
                modificar_registro("eliminar", fila);
                tabla.deleteRow(fila);
                document.getElementById("tabla_c").innerHTML="";
            } 
                
        }
    
        eliminar.forEach(boton => {
            boton.addEventListener("click", elimina);
        });




        const editar = document.querySelectorAll(".editar");
        const edita = (e)=> {
            
            const nodoTd = e.target.parentNode; 
            const fila = nodoTd.parentNode.rowIndex; 
            valor2=tabla.rows[fila].cells[1].innerHTML;
            valor3=tabla.rows[fila].cells[2].innerHTML;
            
                tabla.rows[fila].cells[1].innerHTML="<input type='text' size='5' value='"+valor2+"' id='val2'>";
                tabla.rows[fila].cells[2].innerHTML="<input type='text'  size='14' value='"+valor3+"' id='val3'>";
                tabla.rows[fila].cells[3].removeChild(tabla.rows[fila].cells[3].children[0]);
                tabla.rows[fila].cells[3].removeChild(tabla.rows[fila].cells[3].children[0]);
                tabla.rows[fila].cells[3].removeChild(tabla.rows[fila].cells[3].children[0]);
                const imgrabar=document.createElement("img");
                imgrabar.setAttribute("class", "grabar");
                imgrabar.setAttribute('src','./img/save.jpg');
                imgrabar.onclick=graba;
                tabla.rows[fila].cells[3].append(imgrabar);


        }
    
        editar.forEach(boton => {
            boton.addEventListener("click", edita);
        });


        const grabar = document.querySelectorAll(".grabar");
        grabar.forEach(boton => boton.style.display = "none");
        const graba=  (e)=> {
            
            const nodoTd = e.target.parentNode; 
            const fila = nodoTd.parentNode.rowIndex; 
            valor2=document.getElementById('val2').value;
            valor3=document.getElementById('val3').value;
            
            if(valor2.substring(0, valor2.length - 1).trim().length == 0){

                alert("El campo se encuentra vacio");
                    
            }else if(isNaN(valor2.substring(0, valor2.length - 1)) ){

                alert("Solo se admiten valores numéricos");

            }else if(!isNaN(valor3)){

                alert("Se deben de introducir letras");
                
            }else{
                    
                tabla.rows[fila].cells[1].innerHTML=valor2;
                tabla.rows[fila].cells[2].innerHTML=valor3;
                tabla.rows[fila].cells[3].removeChild(tabla.rows[fila].cells[3].children[0]);
                const imgeditar=document.createElement("img");
                imgeditar.setAttribute("class", "editar");
                imgeditar.setAttribute('src','./img/edit.jpg');
                imgeditar.onclick=edita;
                tabla.rows[fila].cells[3].append(imgeditar);

                const imgeliminar=document.createElement("img");
                imgeliminar.setAttribute("class", "eliminar");
                imgeliminar.setAttribute('src','./img/del.jpg');
                imgeliminar.onclick=elimina;
                tabla.rows[fila].cells[3].append(imgeliminar);

                const imgver=document.createElement("img");
                imgver.setAttribute("class", "ver");
                imgver.setAttribute('src','./img/vista.jpg');
                imgver.onclick=ver;
                tabla.rows[fila].cells[3].append(imgver);
                    
                if(puedoinsertar){

                    modificar_registro("insertar",fila);
                    puedoinsertar=false;  
                }else{

                    modificar_registro("editar", fila);
                    
                }

            }
                
        }
    
        grabar.forEach(boton => {
            boton.addEventListener("click", graba);
        });


        const vista = document.querySelectorAll(".ver");
        const ver=  (e)=> {
            
                var nodoTd = e.target.parentNode; 
                var fila = nodoTd.parentNode.rowIndex; 
                let cod_menu=tabla.rows[fila].cells[0].innerHTML;
                consulta_cartas(cod_menu);
                document.getElementById("cuadro_c").style.display = "block";
        
            } 

        vista.forEach(boton => {
        
            boton.addEventListener("click", ver);
        });

    
              
}
   
    
    
            

    
    




    
    


























