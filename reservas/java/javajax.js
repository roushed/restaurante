
window.onload = function() {
    
    carga_tabla();
    }
    
     function carga_tabla(){
        
        peticion_http_tabla = inicializa_xhr();
        peticion_http_tabla.onreadystatechange = procesaRespuesta_tabla;
        peticion_http_tabla.open("POST", "./reservatabla.php", true);
        peticion_http_tabla.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        peticion_http_tabla.send();
        
        
    }

    function filtra_tabla(consulta){
        
        peticion_http_tabla = inicializa_xhr();
        query_string_alta = montar_filtro(consulta);
        peticion_http_tabla.onreadystatechange = procesaRespuesta_tabla;
        peticion_http_tabla.open("POST", "./reservatabla.php", true);
        peticion_http_tabla.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        peticion_http_tabla.send(query_string_alta);
        
        
    }

    function modificar_registro(editar, f){

        peticion_http_mod = inicializa_xhr();
        query_string_alta = montar_cadena(editar, f);
        peticion_http_mod.open("POST", "./editarreserva.php", true);
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
                a_cargar();
            }
        }
    }
    
    
    function montar_filtro(consulta){
        
        var query_string_alta_cadena = "consulta=" + encodeURIComponent(consulta) +
        "&nocache=";
        return query_string_alta_cadena;

    }

    function montar_cadena(editar, f)
    {
     
        const tabla=document.getElementById('tablita');
        const operador=editar;
        const id_reserva = tabla.rows[f].cells[0].innerHTML;
        const nombre = tabla.rows[f].cells[1].innerHTML;
        const apellidos = tabla.rows[f].cells[2].innerHTML;
        const email = tabla.rows[f].cells[3].innerHTML;
        const fecha = tabla.rows[f].cells[4].innerHTML;
        const hora = tabla.rows[f].cells[5].innerHTML;
        const personas= tabla.rows[f].cells[6].innerHTML;
        const estado= tabla.rows[f].cells[7].innerHTML;

        const query_string_alta_cadena = "id_reserva=" + encodeURIComponent(id_reserva) +
            "&nombre=" + encodeURIComponent(nombre) + 
            "&apellidos=" + encodeURIComponent(apellidos) +
            "&email=" + encodeURIComponent(email) +
            "&fecha=" + encodeURIComponent(fecha) +
            "&hora=" + encodeURIComponent(hora) +
            "&personas=" + encodeURIComponent(personas) +
            "&estado=" + encodeURIComponent(estado) +
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


  function a_cargar(){

    document.getElementById("div_filtrar").style.display = "none";
    const tablita=document.getElementById('tablita');
    let puedoinsertar=false;
    let consulta="";
    const btn_prueba=document.getElementById("btnprueba");
    const btn_x=document.getElementById("x");

    btn_prueba.addEventListener('click', ()=>{
        document.getElementById("div_filtrar").style.display = "block";

    });

    btn_x.addEventListener('click', ()=>{
        document.getElementById("div_filtrar").style.display = "none";
        
    });
    

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

        for(let i=4; i<9; i++){

            if(i<8){

                let valor=tablita.rows[fila].cells[i].innerHTML;
                let codigo="val"+((i+1).toString());

                    if(i!=7){

                        tablita.rows[fila].cells[i].innerHTML="<input type='text' size='10' value='"+valor+"' id='"+codigo+"'>";
                        
                    }else{

                        const spendiente = (valor == "pendiente") ?'SELECTED' : '';
                        const sanulado = (valor == "anulado") ?'SELECTED' : '';
                        const sterminado= (valor == "terminado") ?'SELECTED' : '';
                        tablita.rows[fila].cells[i].innerHTML="<select id='"+codigo+"'><option value='pendiente' "+spendiente+">pendiente</option><option value='anulado' "+sanulado+">anulado</option><option value='terminado' "+sterminado+">terminado</option></select>";
  
                    }
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
            
        for(let i=4; i<9; i++){

            if(i<8){

                valor=tablita.rows[fila].cells[i].children[0].value;
                tablita.rows[fila].cells[i].innerHTML=valor;
                        
            }else{
                    
                tablita.rows[fila].cells[8].removeChild(tablita.rows[fila].cells[8].children[0]);
                const imgeditar=document.createElement("img");
                imgeditar.setAttribute("class", "editar");
                imgeditar.setAttribute('src','./img/edit.jpg');
                imgeditar.onclick=edita;
                tablita.rows[fila].cells[8].append(imgeditar);

                const imgeliminar=document.createElement("img");
                imgeliminar.setAttribute("class", "eliminar");
                imgeliminar.setAttribute('src','./img/del.jpg');
                imgeliminar.onclick=elimina;
                tablita.rows[fila].cells[8].append(imgeliminar);
                    
            }
                        
        }
       
        modificar_registro("editar", fila); 
    }
  
    grabar.forEach(boton => {
        boton.addEventListener("click", graba);
    });
   

    document.getElementById('buscar').addEventListener('input', (e)=>{
        
        if(e.target.value.length != 0){  
            let num_filas=tablita.rows.length;
        
            for(let i=1; i<num_filas; i++){

                let nombre=tablita.rows[i].cells[1].innerText.toUpperCase();
                let correo=tablita.rows[i].cells[3].innerText.toUpperCase();
                if(!nombre.includes(e.target.value.toUpperCase()) && !correo.includes(e.target.value.toUpperCase())){
                    tablita.deleteRow(i);
                }
            }

        }else{
            carga_tabla();
        }

    });

}

    const campof=document.getElementById("fech_u")
    const campof1=document.getElementById("fech_des");
    const campof2=document.getElementById("fech_has");
    const fecha=document.getElementById('fecha1');
    const fecha2=document.getElementById('fecha2');
    const fecha3=document.getElementById('fecha3');
    const resultado=document.getElementById('resultados');
    const rango=document.getElementById('rango');
    const activar_r=document.getElementById('activar_r');
    const output = document.getElementById("demo");
    const filtro= document.getElementById("filtro");
    const ordenar= document.getElementById("ordenar");
    const btn_switch=document.getElementById("switch-label");
    const hora=document.getElementById('hora');
    const valor_ord=document.getElementById('valor');
    
    rango.oninput = function() {
        output.innerHTML = this.value;   
      }
    
    const habilitar=  (e)=> {

        switch (e.target.value) {
            case "1":
                campof.disabled=true;
                campof1.disabled=true;
                campof2.disabled=true;
              break;

            case "2":
                campof.disabled=false;
                campof1.disabled=true;
                campof2.disabled=true;
            break;

            case "3":
                campof.disabled=true;
                campof1.disabled=false;
                campof2.disabled=false; 
              break;     
        }      
    }

    const fechas=document.querySelectorAll('.fecha');
    fechas.forEach(boton => {
        boton.addEventListener("click", habilitar);
    });
    
    
    rango.addEventListener('click', ()=>{
    
        rango.disabled=false;
    
    });
    
    activar_r.addEventListener('click', ()=>{
    
        if(activar_r.checked){
            rango.disabled=false;
            output.innerHTML = rango.value;
    
        }else{
            rango.disabled=true;
            output.innerHTML = '';
        }  
    
    });
    
    ordenar.addEventListener('change', (e)=>{
        valor_ord.value="";
        if(e.target.value != ""){
            btn_switch.disabled=false;
            if(e.target.value != "r.re_fechahora" && e.target.value != "r.re_numpersonas"){
                valor_ord.disabled=false;
            }else{
                valor_ord.disabled=true;  
            }
        }else{ 
            btn_switch.disabled=true;
            valor_ord.disabled=true;
            btn_switch.checked=false;
        }
       
    });
    

    const filtra=()=>{

        const hora=document.getElementById('hora');
        let fechan=new Date(campof.value);
        let fechai=new Date(campof1.value);
        let fechaf=new Date(campof2.value);
        let check_r=true;

        if(!fecha.checked && !fecha2.checked && !fecha3.checked){
            resultado.innerHTML="<p>No se ha seleccionado el filtro de fechas</p>";
            check_r=false;
        }else{

            if(fecha2.checked){

                if(campof.value.length == 0){

                    resultado.innerHTML="<p>No se ha seleccionado la fecha</p>";
                    check_r=false;
                }

            }else if(fecha3.checked){
            
                if(campof1.value.length == 0 || campof2.value.length == 0){
                    resultado.innerHTML="<p>No se han seleccionado las fechas</p>";
                    check_r=false;

                }else{
                    if(fechai > fechaf){
                        resultado.innerHTML="<p>La fecha inicial debe de ser menor a la segunfa fecha</p>";
                        check_r=false;
                    } 

                }
            }    
        }


        if(check_r){

            let consulta=`SELECT r.re_id, c.c_nombre, c.c_apellidos, r.re_email, r.re_fechahora, r.re_hora, r.re_numpersonas, r.re_estado FROM reservas r, clientes c WHERE c.c_email=r.re_email`;
            let array_consulta=new Array();
    
           if(fecha2.checked){
                array_consulta.push(` AND r.re_fechahora='${campof.value}'`);

            }else if(fecha3.checked){
                array_consulta.push(` AND r.re_fechahora BETWEEN  '${campof1.value}' AND '${campof2.value}'`);
            }

            if(hora.value != "" ){
                    array_consulta.push(` AND r.re_hora='${hora.value}'`);
                
            }
        
            if(activar_r.checked){
                    array_consulta.push(` AND r.re_numpersonas=${rango.value}`);
    
            }
        
            if(filtro.value.length !=0){
                    array_consulta.push(` AND r.re_email='${filtro.value}'`);
                
            }

            if(valor_ord.value.length != 0){
                    array_consulta.push(` AND ${ordenar.value}='${valor_ord.value}'`);
                
            }
            
            if(ordenar.value.length != 0){
                array_consulta.push(` ORDER BY ${ordenar.value}`);
        
            }
            
            if(!btn_switch.disabled  && btn_switch.checked){
                array_consulta.push(` ASC`);
                
            }else if (!btn_switch.disabled && !btn_switch.checked){
                array_consulta.push(` DESC`);
               
            }

            array_consulta.unshift(consulta);
            consulta=array_consulta.join('');
            filtra_tabla(consulta);
            document.getElementById("div_filtrar").style.display = "none";
            resultado.innerHTML="";

                          
        }      
    }

    const filtrar=document.getElementById('filtrar');
    filtrar.addEventListener('click', filtra);

    






