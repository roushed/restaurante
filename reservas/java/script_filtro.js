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
    const hora=document.getElementById("hora");
    const minu=document.getElementById("minu"); 
    
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
        if(ordenar.value != ""){
            btn_switch.disabled=false;
        }else{
            btn_switch.disabled=true;
            btn_switch.checked=false;
        }
       
    });
    
    
    const filtra=()=>{
        (hora.value);
        (minu.value);
        let consulta=`SELECT * FROM reservas `;
        let array_consulta=new Array();
        let check_r=true;

       if(fecha2.checked){
            if(campof.value.length != 0){
                array_consulta.push(` WHERE re_fechahora='${campof.value}'`);
            }else{
                check_r=false;
            }   
        }else if(fecha3.checked){
   
            array_consulta.push(` WHERE re_fechahora BETWEEN  '${campof1.value}' AND '${campof2.value}'`);
        }else{
            check_r=false;
        }
        
        if(activar_r.checked){
            
            if(array_consulta.length !=0){
                array_consulta.push(` AND re_numpersonas=${rango.value}`);
            }else{
                array_consulta.push(` WHERE re_numpersonas=${rango.value}`);
            }
        }
    
        if(filtro.value.length !=0){
             
            if(array_consulta.length !=0){
            array_consulta.push(` AND re_email='${filtro.value}'`);
            }else{
                array_consulta.push(` WHERE re_email='${filtro.value}'`);
            }
        }
    
        if(ordenar.value.length != 0){
            array_consulta.push(` ORDER BY ${ordenar.value}`);
        }
        

        if(!btn_switch.disabled  && btn_switch.checked){
            array_consulta.push(` ASC`);
            
        }else if (!btn_switch.disabled && !btn_switch.checked){
            array_consulta.push(` DESC`);
        }

        if(check_r){
            array_consulta.unshift(consulta);
            consulta=array_consulta.join('');
            filtra_tabla(consulta);
            document.getElementById("div_filtrar").style.display = "none";
            resultado.innerHTML="";
         
        }else{
            resultado.innerHTML="<p>No se ha seleccionado el filtro de fechas</p>";
        }
        
    }

    const filtrar=document.getElementById('filtrar');
    filtrar.addEventListener('click', filtra);