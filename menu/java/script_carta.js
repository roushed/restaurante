
let cod_menu="";
let fila=0;
let validar=true;

function consulta_cartas(id_menu){

    peticion_http_tabla = inicializa_xhr();
    query_string_alta = montar_idmenu(id_menu);
    peticion_http_tabla.onreadystatechange = respuesta_Cartas;
    peticion_http_tabla.open("POST", "./tablacarta.php", true);
    peticion_http_tabla.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    peticion_http_tabla.send(query_string_alta);


}

function respuesta_Cartas(){

    if(peticion_http_tabla.readyState == 4) 
    {
        if(peticion_http_tabla.status == 200) 
        {
            var respuesta = peticion_http_tabla.responseText;
            document.getElementById("tabla_c").innerHTML = respuesta;
            carga_Panel();
           
        
        }
    }

}

function montar_idmenu(id_menu){

    cod_menu=id_menu;
    var query_string_alta_cadena = "id_menu=" + encodeURIComponent(cod_menu) +
    "&nocache=";
    return query_string_alta_cadena;

}


function modificar_carta(editar, f){

    peticion_http_mod = inicializa_xhr();
    query_string_alta = montar_cadena_c(editar, f);
    peticion_http_mod.onreadystatechange = respuestaRegistro;
    peticion_http_mod.open("POST", "./editarcarta.php", true);
    peticion_http_mod.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    peticion_http_mod.send(query_string_alta);


}

function respuestaRegistro(){

    if(peticion_http_tabla.readyState == 4) 
    {
        if(peticion_http_tabla.status == 200) 
        {

            var respuesta = peticion_http_mod.responseText;
           
            if(respuesta == 0){
                validar=false;
            }else if(respuesta== 1){
                validar=true;
            }
      
        }
    }
    
}


function montar_cadena_c(editar, f){
   

    const tabla=document.getElementById('tabla_c');
   
    const operador=editar;
    const id_carta = tabla.rows[f].cells[0].innerHTML;
    const nombre = tabla.rows[f].cells[1].innerHTML;
    const descripcion = tabla.rows[f].cells[2].innerHTML;
    const precioplato = tabla.rows[f].cells[3].innerHTML;
    const tipoproducto = tabla.rows[f].cells[4].innerHTML;
    const idalergeno = tabla.rows[f].cells[5].innerHTML;


    const query_string_alta_cadena = "id_carta=" + encodeURIComponent(id_carta) +
        "&id_menu=" + encodeURIComponent(cod_menu) +
        "&nombre=" + encodeURIComponent(nombre) + 
        "&descripcion=" + encodeURIComponent(descripcion) +
        "&precioplato=" + encodeURIComponent(precioplato) +
        "&tipoproducto=" + encodeURIComponent(tipoproducto) +
        "&idalergeno=" + encodeURIComponent(idalergeno) +
        "&operador=" + encodeURIComponent(operador) +
        "&nocache=";
        
        return query_string_alta_cadena;


}

function mostrar_ns_carta(){

    peticion_http_tabla = inicializa_xhr();
    peticion_http_tabla.onreadystatechange = respuesta_ns_carta;
    peticion_http_tabla.open("POST", "./muestranscarta.php", true);
    peticion_http_tabla.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    peticion_http_tabla.send();



}

function respuesta_ns_carta(){

    if(peticion_http_tabla.readyState == 4) 
    {
        if(peticion_http_tabla.status == 200) 
        {
            var respuesta = peticion_http_tabla.responseText;
            document.getElementById("ns_cartas").innerHTML = respuesta;
           
        }
    }

}

function imprime_datos_carta(valor){
    
    peticion_http_tabla = inicializa_xhr();
    query_string_alta = cargar_datos_carta(valor);
    peticion_http_tabla.onreadystatechange = respuesta_datos_carta;
    peticion_http_tabla.open("POST", "./muestradatoscarta.php", true);
    peticion_http_tabla.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    peticion_http_tabla.send(query_string_alta);

}

function cargar_datos_carta(valor){

    var query_string_alta_cadena = "id_carta=" + encodeURIComponent(valor) +
    "&nocache=";
    
    return query_string_alta_cadena;

}

function respuesta_datos_carta(){

    if(peticion_http_tabla.readyState == 4) 
    {
        if(peticion_http_tabla.status == 200) 
        {
        
            const tabla=document.getElementById('tabla_c');
            var respuesta = peticion_http_tabla.responseText;
            respuesta=respuesta.split(",");
            let cont=2;

            for(let i=0; i<respuesta.length; i++){           

                        if(i != 0){
                            if(i != 5){
                                tabla.rows[fila].cells[cont].innerHTML=respuesta[i];
                                cont++;
                            }else{
                                tabla.rows[fila].cells[cont].innerHTML=respuesta[i];
                            }
                           
                        }else{
                            tabla.rows[fila].cells[i].innerHTML=respuesta[i];
                        }       
            }
           
        }
    }

}

function carga_Panel(){

thinsertar=document.getElementById('thinsertar');
btninsertar=document.createElement('button');
btninsertar.setAttribute('id','insertar');
btninsertar.textContent="Insertar";
btninsertar.onclick=inserta;
thinsertar.append(btninsertar);
const tablita=document.getElementById('tabla_c');
const insertar=document.getElementById('insertar');

    insertar.addEventListener('click', inserta);
    function inserta(){
       
        const elemento = tablita.rows.length; 
        const row=tablita.insertRow(elemento);

        for(let i=0;i<7;i++){
                
            var cell = row.insertCell(i);
            if(i<6){

                let codigo="val"+((i+1).toString());
                if(i == 1){

                    cell.innerHTML = "<select id='ns_cartas'></select>";
                }                  

            }else{

                const imgedit=document.createElement('img');
                imgedit.setAttribute('class','grabar');
                imgedit.setAttribute('src','./img/save.jpg')
                imgedit.onclick=graba;
                cell.append(imgedit);
                
            }
        }
        mostrar_ns_carta();

        document.getElementById('ns_cartas').addEventListener('change', (e) =>{
            let valor=e.target.value;
            var nodoTd = e.target.parentNode; 
            fila = nodoTd.parentNode.rowIndex;
            
            imprime_datos_carta(valor);

        });

    }
    
    const eliminar = document.querySelectorAll(".eliminar");

    const elimina=  (e)=> {
        
        const opcion=confirm("¿Desea eliminar el registro?");

        if (opcion){

            var nodoTd = e.target.parentNode; 
            var fila = nodoTd.parentNode.rowIndex; 

            modificar_carta("eliminar", fila);
            tablita.children[1].removeChild(tablita.children[1].children[fila-1]);

        }
        
    }
   
    eliminar.forEach(boton => {
       
        boton.addEventListener("click", elimina);
    });

    
    const grabar = document.querySelectorAll(".grabar");
    const graba=  (e)=> {
        
        const nodoTd = e.target.parentNode; 
        const fila = nodoTd.parentNode.rowIndex;
            
        modificar_carta("comprobar",fila);
        setTimeout(function(){

        if(!validar){

            alert("Ya se ha añadido un mismo producto");
                  
        }else{

            for(let i=1; i<7; i++){
                
                if(i<6){
  
                    if(i == 1){
                            
                                
                        var valor = tablita.rows[fila].cells[i].children[0].options[tablita.rows[fila].cells[i].children[0].selectedIndex].innerHTML;
                        tablita.rows[fila].cells[i].innerHTML=valor;
                    }

                }else{
                
                        
                    tablita.rows[fila].cells[6].removeChild(tablita.rows[fila].cells[6].children[0]);
                        
                    const imgeliminar=document.createElement("img");
                    imgeliminar.setAttribute("class", "eliminar");
                    imgeliminar.setAttribute('src','./img/del.jpg');
                    imgeliminar.onclick=elimina;
                    tablita.rows[fila].cells[6].append(imgeliminar);
                    modificar_carta("insertar",fila);
                        
                }
                            
                
            }
        }
    }, 1500);
    }
}