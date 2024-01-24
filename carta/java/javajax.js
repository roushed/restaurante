window.onload = function() {
    document.getElementById("contenido").style.display = "none";
    carga_tabla();
    setTimeout("desbloquea()",3000);
    
    }
    

    function desbloquea(){
       
        document.getElementById("imagen").style.display = "none";
        document.getElementById("contenido").style.display = "block";
    }
    let valor_s;
    let nombres = [];

     function carga_tabla(){
        
        peticion_http_tabla = inicializa_xhr();
        peticion_http_tabla.onreadystatechange = procesaRespuesta_tabla;
        peticion_http_tabla.open("POST", "./cartabla.php", true);
        peticion_http_tabla.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        peticion_http_tabla.send();
        
        
    }

    function modificar_registro(editar, f){

        peticion_http_mod = inicializa_xhr();
        query_string_alta = montar_cadena(editar, f);
        peticion_http_mod.onreadystatechange = procesaRespuesta3;
        peticion_http_mod.open("POST", "./editarcarta.php", true);
        peticion_http_mod.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        peticion_http_mod.send(query_string_alta);
        
        
    }

    function procesaRespuesta3() 
    {
        
            
       if(peticion_http_mod.readyState == 4) 
        {
            if(peticion_http_mod.status == 200) 
            {
                const respuesta = peticion_http_mod.responseText;
             
            }
        }
    }
    
    function procesaRespuesta_tabla() 
    {
   
            
       if(peticion_http_tabla.readyState == 4) 
        {
            if(peticion_http_tabla.status == 200) 
            {
                
                var respuesta = peticion_http_tabla.responseText;
                document.getElementById("tablita").innerHTML = respuesta;
                a_cargar();
              
            
            }
        }
    }
    
    function montar_filtro(valor){
        var lista_at=new Array('ca_id', 'ca_nombre', 'ca_precioplato');
        var query_string_alta_cadena = "valor=" + encodeURIComponent(lista_at[valor]) +
            "&nocache=";
            
            return query_string_alta_cadena;


    }

  
    
    function montar_cadena(editar, f)
    {
       

        const tabla=document.getElementById('tablita');
    
        const operador=editar;
        const id_carta = tabla.rows[f].cells[0].innerHTML;
        const nombre = tabla.rows[f].cells[1].innerText;
        const descripcion = tabla.rows[f].cells[2].innerHTML;
        const precioplato = tabla.rows[f].cells[3].innerHTML;
        const tipoproducto = tabla.rows[f].cells[4].innerHTML;
   
        lnombres=nombres.join(" ");
        var idalergeno=lnombres;

   

    var query_string_alta_cadena = "id_carta=" + encodeURIComponent(id_carta) +
            "&nombre=" + encodeURIComponent(nombre) + 
            "&descripcion=" + encodeURIComponent(descripcion) +
            "&precioplato=" + encodeURIComponent(precioplato) +
            "&tipoproducto=" + encodeURIComponent(tipoproducto) +
            "&idalergeno=" + encodeURIComponent(idalergeno) +
            "&operador=" + encodeURIComponent(operador) +
            "&nocache=";
            
            return query_string_alta_cadena;
            
            
    }

    function carga_alergenos(){
     
        peticion_http_tabla = inicializa_xhr();
        peticion_http_tabla.onreadystatechange = respuesta_alergenos;
        peticion_http_tabla.open("POST", "./cargalergenos.php", true);
        peticion_http_tabla.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        peticion_http_tabla.send();
        
        
    }

    function respuesta_alergenos(){

        if(peticion_http_tabla.readyState == 4) 
        {
            if(peticion_http_tabla.status == 200) 
            {
                var respuesta = peticion_http_tabla.responseText.trim();
                
                respuesta=respuesta.split(" ");
             
              
                for(let z=0; z<respuesta.length; z++){
                   

                    if(valor_s.indexOf(respuesta[z]) != -1){

                        document.getElementById("lista_al").innerHTML+=`<img src='./alergenos/${respuesta[z]}.png' width='20%' height='20%'></img><input type='checkbox' value='${respuesta[z]}' id='${respuesta[z]}' checked>`;

                    }else{
                        
                        document.getElementById("lista_al").innerHTML+=`<img src='./alergenos/${respuesta[z]}.png' width='20%' height='20%'></img><input type='checkbox' value='${respuesta[z]}' id='${respuesta[z]}'>`;

                    }
                    
    
                }
         
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


  function a_cargar(){
    
    thinsertar=document.getElementById('thinsertar');
    btninsertar=document.createElement('button');
    btninsertar.setAttribute('id','insertar');
    btninsertar.textContent="Insertar";
    thinsertar.append(btninsertar);
    const tablita=document.getElementById('tablita');
    const insertar=document.getElementById('insertar');
    let puedoinsertar=false;
 

    insertar.addEventListener('click', inserta);

    function inserta(){
        puedoinsertar=true;
        var elemento = tablita.rows.length; 
        
        var row=tablita.insertRow(elemento);

        for(let i=0;i<7;i++){
                
            var cell = row.insertCell(i);
            if(i<6){
                
                let codigo="val"+((i+1).toString());

                if(i != 4){
                    
                    if(i != 0){

                        if(i == 5){
                            
                            cell.innerHTML="<div id='lista_al'></div>";
                            $.ajax(
                                'cargalergenos.php',
                                {
                                    success: function(data) {
                                     
                                      data=data.trim().split(" ");
                                      for(let i=0; i<data.length; i++){
                                      document.getElementById('lista_al').innerHTML+=`<img src='./alergenos/${data[i]}.png' width='20%' height='20%'><input type='checkbox' value='${data[i]}'>`;
                                      }
                                    },
                                    error: function() {
                                      
                                    }
                                 }
                              );
                                                    
                        }else{
                           

                            cell.innerHTML = "<input type='text' size='12' id='"+codigo+"'>";
                            
                        }
                    }else{

                        $.ajax(
                            'recogeidcarta.php',
                            {
                                success: function(data) {

                                  tablita.rows[elemento].cells[0].innerText=data;
                                },
                                error: function() {
                                  
                                }
                             }
                        );

                        
                    }
                }else{

                cell.innerHTML="<select id='"+codigo+"'><option value='primero'>primero</option><option value='segundo'>segundo</option><option value='postre'>postre</option><option value='bebida'>bebida</option></select>";
                }

            }else{

                const imgedit=document.createElement('img');
                imgedit.setAttribute('class','grabar');
                imgedit.setAttribute('src','./img/save.jpg')
                imgedit.onclick=graba;
                cell.append(imgedit);
                
            }
        }


    }
    
    const eliminar = document.querySelectorAll(".eliminar");
    
    const elimina=  (e)=> {
	
        const opcion=confirm("¿Desea eliminar el registro?");

        if (opcion){

            var nodoTd = e.target.parentNode; 
            var fila = nodoTd.parentNode.rowIndex; 

            modificar_registro("eliminar", fila);
            tablita.children[1].removeChild(tablita.children[1].children[fila-1]);

        }
    
        
    }
   
    eliminar.forEach(boton => {
        
        boton.addEventListener("click", elimina);
    });



    const editar = document.querySelectorAll(".editar");
    
    const edita = (e)=> {
    
        var nodoTd = e.target.parentNode; 
        var fila = nodoTd.parentNode.rowIndex;
            
            for(let i=1; i<7; i++){

                if(i<6){

                    let valor=tablita.rows[fila].cells[i].innerText;
                    let codigo="val"+((i+1).toString());
                    
                    if(i != 4){

                        if(i == 5){

                            valor=tablita.rows[fila].cells[i].lastChild.value;
                           
                            tablita.rows[fila].cells[i].innerHTML="<div id='lista_al'></div>";
                            valor_s=valor.split('');
                            carga_alergenos();
    
                        }else{
                       
                      
                   
                        tablita.rows[fila].cells[i].innerHTML="<input type='text' size='12' value='"+valor+"' id='"+codigo+"'>";
                        }

                    }else{

                       
                        var opciones = ["primero", "segundo", "postre", "bebida"];
                        var selectHTML = "<select id='" + codigo + "'>";
                        
                        opciones.forEach(opcion => {
                            var selected = valor === opcion ? 'SELECTED' : '';
                            selectHTML += "<option value='" + opcion + "' " + selected + ">" + opcion + "</option>";
                        });
                        
                        selectHTML += "</select>";
                        tablita.rows[fila].cells[i].innerHTML = selectHTML;

                    }
                        
                }else{
                    while (tablita.rows[fila].cells[i].children.length > 0) {
                        tablita.rows[fila].cells[i].removeChild(tablita.rows[fila].cells[i].children[0]);
                    }
                 
                    const imgrabar=document.createElement("img");
                    imgrabar.setAttribute("class", "grabar");
                    imgrabar.setAttribute('src','./img/save.jpg');
                    imgrabar.onclick=graba;
                    tablita.rows[fila].cells[i].append(imgrabar);

                }
            }
          
        
    }
  
    editar.forEach(boton => {
      
        boton.addEventListener("click", edita);
    });



    const grabar = document.querySelectorAll(".grabar");

    const graba=  (e)=> {
        
        var nodoTd = e.target.parentNode; 
        var fila = nodoTd.parentNode.rowIndex;
            
        let precio=tablita.rows[fila].cells[3].children[0].value;
            
            

            if(!isNaN(tablita.rows[fila].cells[1].children[0].value) || !isNaN(tablita.rows[fila].cells[2].children[0].value)){
                alert("Se debe introducir caracteres tipo letra");
            }else if(precio.substring(0, precio.length - 1).trim().length == 0){
                alert("Campos numérico vacio");
            }else if($('input[type=checkbox]:checked').length==0){                          
                alert("No se ha seleccionado ningun check"); 
            }else if(isNaN(precio.substring(0, precio.length - 1))){             
                alert("Se debe introducir valores numéricos");
            }else{

                for(let i=1; i<7; i++){
                   
                    if(i<6){
                        
                        if(i!=5){

                            let valor = (i === 6 && !puedoinsertar) ? tablita.rows[fila].cells[i].innerText : tablita.rows[fila].cells[i].children[0].value;
                            tablita.rows[fila].cells[i].innerHTML = valor;
                       
                        }else{

                            nombres=[];
                            let casillas = document.querySelectorAll("input[type='checkbox']")
                            casillas.forEach(c =>{
                                if(c.checked){
                               
                                    nombres.push(c.value)
                                }
                                
                            });
                                
                          
                            tablita.rows[fila].cells[i].innerHTML=``;
                            for(let z=0; z<nombres.length; z++){
                                tablita.rows[fila].cells[i].innerHTML+=`<img src='./alergenos/${nombres[z]}.png' width='20%' height='20%'>`;
                            }
                            tablita.rows[fila].cells[i].innerHTML+=`<input type='hidden' value='${nombres}'>`;
                                         
                        }
            
                        
                    }else{
            
                    
                        tablita.rows[fila].cells[6].removeChild(tablita.rows[fila].cells[6].children[0]);

                        const imgeditar=document.createElement("img");
                        imgeditar.setAttribute("class", "editar");
                        imgeditar.setAttribute('src','./img/edit.jpg');
                        imgeditar.onclick=edita;
                        tablita.rows[fila].cells[6].append(imgeditar);


                        const imgeliminar=document.createElement("img");
                        imgeliminar.setAttribute("class", "eliminar");
                        imgeliminar.setAttribute('src','./img/del.jpg');
                        imgeliminar.onclick=elimina;
                        tablita.rows[fila].cells[6].append(imgeliminar);
                    
                    }
                        
        
                }

                if(puedoinsertar){
                    modificar_registro("insertar", fila);
                    puedoinsertar=false;
                }else{
                    modificar_registro("editar", fila);
                }
            }
        
    }
   
    grabar.forEach(boton => {

        boton.addEventListener("click", graba);
    });

    
  }

  document.getElementById('filtro').addEventListener('change', (e)=>{

    const valor=e.target.value;
    peticion_http_tabla = inicializa_xhr();
    query_string_alta = montar_filtro(valor);
    peticion_http_tabla.onreadystatechange = procesaRespuesta_tabla;
    peticion_http_tabla.open("POST", "./cartabla.php", true);
    peticion_http_tabla.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    peticion_http_tabla.send(query_string_alta);


  });