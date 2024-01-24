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
        
        peticion_tabla = inicializa_xhr();
        peticion_tabla.onreadystatechange = respuesta_tabla;
        peticion_tabla.open("POST", "./tablalergenos.php", true);
        peticion_tabla.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        peticion_tabla.send();
        
        
    }


    function modificar_registro(editar, f){

        peticion_modificar = inicializa_xhr();
        contenido_post = montar_cadena(editar, f);
        peticion_modificar.open("POST", "./editaralergeno.php", true);
        peticion_modificar.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        peticion_modificar.send(contenido_post);
        
    }

    
    
    function respuesta_tabla() 
    {
            
       if(peticion_tabla.readyState == 4) 
        {
            if(peticion_tabla.status == 200) 
            {
                var respuesta = peticion_tabla.responseText;
                a_cargar(respuesta);
               
            
            }
        }
    }


    function montar_cadena(editar, f)
    {

        const tabla=document.getElementById('tablita');
        var operador=editar;
        var al_id = tabla.rows[f].cells[0].innerHTML;
        var al_descripcion = tabla.rows[f].cells[1].innerHTML;
        var string_post = "id_alergeno=" + encodeURIComponent(al_id) +
            "&descripcion=" + encodeURIComponent(al_descripcion) +
            "&operador=" + encodeURIComponent(operador) + 
            "&nocache=";
            
            return string_post;
              
    }
    
    
    
    
    function inicializa_xhr() {
      if(window.XMLHttpRequest) {
        return new XMLHttpRequest(); 
      }
      else if(window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
        }
    } 


function a_cargar(respuesta){
 
    const losdatos_s=respuesta.split("_");
    const contenido=document.getElementById('contenidito');
    const tabla=document.createElement('table');
    tabla.setAttribute('id','tablita');
    tabla.setAttribute('class','table table-hover table-sm table-active table-striped border border-secondary bg-light');
    const thead=document.createElement('thead');
    tabla.append(thead);
    
    const trth=document.createElement('tr');
    trth.setAttribute('class', 'bg-dark text-white');
    thead.append(trth);
    const th1=document.createElement('th');
    th1.setAttribute('class','p-2');
    th1.textContent="Id alergeno";
    const th2=document.createElement('th');
    th2.setAttribute('class','p-2')
    th2.textContent="Descripcion";
    const th3=document.createElement('th');
    th3.setAttribute('class','thinsertar');
    
    const btninsertar=document.createElement('button');
    btninsertar.textContent='Insertar';
    btninsertar.setAttribute('id', 'insertar');
    th3.append(btninsertar);
    trth.append(th1);
    trth.append(th2);
    trth.append(th3);
    const tbody=document.createElement('tbody');
    tbody.setAttribute('id', 'tebody');
    tabla.append(tbody);

    for(let i=0; i<losdatos_s.length-1; i++){

        let terre=document.createElement('tr');
        let losdatos_s2=losdatos_s[i].split(";");
        
        for(let z=0; z<losdatos_s2.length; z++){
            
            let tede=document.createElement('td');
            tede.innerHTML=losdatos_s2[z];
            terre.append(tede);
        }

        let tedepanel=document.createElement('td');
        tedepanel.setAttribute('class', 'panel');
        let imageditar=document.createElement('img');
        imageditar.setAttribute('src','./img/edit.jpg');
        imageditar.setAttribute('class', 'editar');
        tedepanel.append(imageditar);
        let imageliminar=document.createElement('img');
        imageliminar.setAttribute('src','./img/del.jpg');
        imageliminar.setAttribute('class', 'eliminar');
        tedepanel.append(imageliminar);

        terre.append(tedepanel);
        tbody.append(terre);

    }
    contenido.append(tabla);

    const tablita=document.getElementById('tablita');
    const insertar=document.getElementById('insertar');
    let puedoinsertar=false;
    insertar.addEventListener('click', inserta);

    function inserta(){
        puedoinsertar=true;
        const elemento = tablita.rows.length; 
        const row=tablita.insertRow(elemento);

        for(let i=0;i<3;i++){
                
            var cell = row.insertCell(i);

            if(i<2){

                if(i!=0){
                    let codigo="val"+((i+1).toString());
                    const texto=document.createElement('input');
                    texto.setAttribute('type','text');
                    texto.setAttribute('size','12');
                    texto.setAttribute('id',codigo);
                    cell.append(texto);

                }else{
                    
                    $.ajax(
                        'recogeidalergeno.php',
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

            const nodoTd = e.target.parentNode; 
            const fila = nodoTd.parentNode.rowIndex; 
            modificar_registro("eliminar", fila);  
            tablita.children[1].removeChild(tablita.children[1].children[fila-1]);

        }
    
        
    }
    
    eliminar.forEach(boton => {
      
        boton.addEventListener("click", elimina);
    });



    const editar = document.querySelectorAll(".editar");
    
    const edita = (e)=> {

        const nodoTd = e.target.parentNode; 
        const fila = nodoTd.parentNode.rowIndex;
            
            for(let i=1; i<3; i++){
                
                if(i<2){
                    
                    let valor=tablita.rows[fila].cells[i].innerText;
                    let codigo="val"+((i+1).toString());
                    tablita.rows[fila].cells[i].innerText="";

                    const texto=document.createElement('input');
                    texto.setAttribute('type','text');
                    texto.setAttribute('size','12');
                    texto.setAttribute('value', valor);
                    texto.setAttribute('id', codigo);
                    
                    tablita.rows[fila].cells[i].append(texto);
                   
                                                           
                }else{

                    
                    tablita.rows[fila].cells[i].removeChild(tablita.rows[fila].cells[i].children[0]);
                    tablita.rows[fila].cells[i].removeChild(tablita.rows[fila].cells[i].children[0]);
                    
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
        
        const nodoTd = e.target.parentNode; 
        const fila = nodoTd.parentNode.rowIndex;
            
        if(!isNaN(tablita.rows[fila].cells[1].children[0].value)){
            alert("Se debe introducir letras");

        }else{


                for(let i=0; i<3; i++){
            
                    if(i<2){

                        
                        if(i!=0){
                            valor=tablita.rows[fila].cells[i].children[0].value;
                            tablita.rows[fila].cells[i].textContent=valor;

                        }else{
                            
                            valor=tablita.rows[fila].cells[i].innerText;
                            tablita.rows[fila].cells[i].textContent=valor;

                        }
                      
                        
                    }else{
            
                    
                        tablita.rows[fila].cells[2].removeChild(tablita.rows[fila].cells[2].children[0]);

                        const imgeditar=document.createElement("img");
                        imgeditar.setAttribute("class", "editar");
                        imgeditar.setAttribute('src','./img/edit.jpg');
                        imgeditar.onclick=edita;
                        tablita.rows[fila].cells[2].append(imgeditar);


                        const imgeliminar=document.createElement("img");
                        imgeliminar.setAttribute("class", "eliminar");
                        imgeliminar.setAttribute('src','./img/del.jpg');
                        imgeliminar.onclick=elimina;
                        tablita.rows[fila].cells[2].append(imgeliminar);
                    
                    }        
            
                }

                if(puedoinsertar){

                    modificar_registro("insertar", fila);
                    puedoinsertar=false;
                    location.reload()
        
                }else{
        
                    modificar_registro("editar", fila);
                    location.reload()
        
                }
            }
        
    }
   
    grabar.forEach(boton => {
        
        boton.addEventListener("click", graba);
    });

    
    }