
document.getElementById('listnumber').style.display="none";
document.getElementById('habilitap').style.display="none";
    

    const posicionate=(inicio)=>{

        for(let i=inicio; i<6; i++){

            let codigo="tn"+(i+1).toString();
            if(!document.getElementById(codigo).disabled){

                document.getElementById(codigo).focus();
                break;

            }
       }

    }

    const encuentra_casilla=(inicio)=>{

        for(let i=inicio; i<6; i++){

            let codigo="tn"+(i+1).toString();
            if(!document.getElementById(codigo).disabled){
                document.getElementById(codigo).focus();
                break;

            }else{

                posiciones.push('*');

            }

       }


    }

const resetea_casillas=()=>{
    
    if(document.getElementById("tn1").disabled && !document.getElementById("tn2").disabled){
        
        posiciones.splice(1, posiciones.length);
        replace=cadena.slice(0, 1);
        cadena=replace;


    }else if(document.getElementById("tn1").disabled  && document.getElementById("tn2").disabled){
        
        posiciones.splice(2, posiciones.length);
        replace=cadena.slice(0, 2);
        cadena=replace;


    }else{

        posiciones.splice(0, posiciones.length);
        cadena='';

    }


}


    let cadena='';
    let id_tn='';
    const array_intro=new Array();
    const posiciones=[];
    let num_r;
 
    for(let t=0; t<9; t++){
           
        let cod=(t+1).toString();
        do{
            num_r=Math.floor(Math.random()*(10-1)+1);
            
        }while(array_intro.includes(num_r));

        array_intro.push(num_r);
     
        let celda= document.getElementById(cod);
        celda.innerHTML=num_r;
       
        celda.addEventListener("click", ()=>{
         
            document.getElementById(id_tn).value=" ";
            document.getElementById(id_tn).classList.add("puntos")
        
            switch(id_tn){

                case "tn1":
                    posiciones.push(celda.innerText);
                    cadena+=celda.innerText;
                    encuentra_casilla(1);           
                    break;

                case "tn2":
                    posiciones.push(celda.innerText);   
                    cadena+=celda.innerText;
                    encuentra_casilla(2);
                    break;

                case "tn3":
                    posiciones.push(celda.innerText);
                    cadena+=celda.innerText;
                    encuentra_casilla(3);
                    break;

                case "tn4":
                    posiciones.push(celda.innerText);
                    cadena+=celda.innerText;
                    encuentra_casilla(4);
                    break;

                case "tn5":
                    posiciones.push(celda.innerText);
                    cadena+=celda.innerText;
                    encuentra_casilla(5);
                    break;

                case "tn6":
                    posiciones.push(celda.innerText);
                    cadena+=celda.innerText;
                    break;
            
            }
        
        });
            
    }

    const borrar=document.getElementById('del');
    borrar.innerText="DEL";
    borrar.addEventListener('click', ()=>{
        
        for(let i=6;i>0; i--){
            let codigo=(i).toString();
            if(!document.getElementById("tn"+codigo).disabled){
              
                document.getElementById("tn"+codigo).classList.remove("puntos");
                document.getElementById("tn"+codigo).focus();

            }    
            
        }

        resetea_casillas();
    });

        
        for(let i=0; i<6; i++){
            let cod_t=(i+1).toString();
            let tn=document.getElementById("tn"+cod_t);
            tn.addEventListener('focus', (obj) => {
                id_tn=obj.target.id;
                obj.target.value="";
                obj.target.style.background = 'orange';
               
                
            });

        }
        
        
        for (let n=0; n<6; n++){
            let cod_t=(n+1).toString();
            let tn=document.getElementById('tn'+cod_t);
    
            tn.addEventListener('blur', (obj) => {
    
                obj.target.value="";
                obj.target.style.background = '';
                      
            });
        }

        
        const enviado=document.getElementById('enviado');
        const pass_reg="123";
        let intento=1;
        let existecorreo=false;
        let empieza_validar=false;
        let validado=false;

        enviado.addEventListener('click', () =>{
       
            if(document.getElementById('email').value.length == 0){
              
                document.getElementById("errorc").innerText="*No se ha introducido el correo";
                validado=false;
            
            }else{

                document.getElementById("errorc").innerText="";
                existecorreo=true;
        
            }

            if(existecorreo){
              
                document.getElementById('habilitap').style.display="block"; 
                document.getElementById('listnumber').style.display="block";
                
                if(intento!=0){
                
                    encuentra_casilla(0);
                    intento--;
                }

                if(empieza_validar){
                    let completado=true;
                    
                    for(let i=0; i<6; i++){

                        let cod_t=(i+1).toString();
                        let tn=document.getElementById('tn'+cod_t);

                        if(tn.value.length == 0){

                            validado=false;
                            completado=false;

                            break;

                        }else{
                            document.getElementById("errorp").innerText="";

                        }
                    }
                    
                    if(completado){
                        
                            validado=true;
                    }else{

                        resetea_casillas();
                        document.getElementById("errorp").innerText="*Algun campo de la contraseña se encuentra vacia";
                    }
              
                }
            
                empieza_validar=true;
            
            }

        if(validado){
                                    
         
            let cadena_as=posiciones.join('');
            document.getElementById('escondido').value=cadena_as;
            document.getElementById("formulario").submit();
              
            
        }else{
          
            posicionate(0);
     
        }
        
        cadena=''; 
        
    });
        



    const array_numeros=new Array(6);
    for(i=0;i<array_numeros.length; i++){
    
        array_numeros[i]="";
    
    }
    
    let contador=0;
    let max3=0;

    while(contador < array_numeros.length){
    
        var salida=Math.floor(Math.random()*array_numeros.length);
            
            if(max3<3){
                if(array_numeros[salida] == ""){
                    array_numeros[salida]="*";
                    max3++;
                }
            
            }else{

                break;

            }
            
        contador++;             
    }


   for(i=0;i<array_numeros.length; i++){
        let codigo=(i+1).toString();
        document.getElementById("tn"+codigo).value=" ";
        document.getElementById("tn"+codigo).type="text";
        if(array_numeros[i] == "*"){
            document.getElementById("tn"+codigo).classList.add('asteriscos');
            document.getElementById("tn"+codigo).disabled=true;
            

        }

   }
    
     
   

     
   
    