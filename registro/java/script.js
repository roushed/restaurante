$(function() {
    $( "#datepicker" ).datepicker();
    });
    
    $("#datepicker").datepicker({
    firstDay: 1
    });


document.getElementById("envio").addEventListener('click', Validar);



function Validar() {
    
    const array_errores=[];
    document.getElementById("errordni").innerText="";
    document.getElementById("datepicker").style.borderColor="none";
    const testDate = document.getElementById("datepicker").value;
    const telefono =document.getElementById("tel").value;
    const nombre=document.getElementById("nom").value;
    const apellidos=document.getElementById("ape").value;
    const password=document.getElementById("pass").value;
    const passwordrep=document.getElementById("reppass").value;
    const dni=document.getElementById("dni").value;
    const direccion=document.getElementById("dir").value;
    const email=document.getElementById("email").value;
    let checkp=false;  
    let check=document.getElementById("acept");
    const email_reg="pepe@gmail.com";
   
    

    if (nombre.length == 0 ){

        document.getElementById("errorn").innerText="*No se ha introducido nombre";
        document.getElementById("nom").classList.add("form-red");
        array_errores.push("nombre");
    
      
       
       
    }else{
        var regex = new RegExp("^[a-zA-Z ]+$");
        
        if (!regex.test(nombre)) {
            
            document.getElementById("errorn").innerText="*Nombre no admite valores numéricos";
            document.getElementById("nom").classList.add("form-red");
         
            
            array_errores.push("nombre");

            
            
           
          }
        

        else if(nombre.length<2){

            document.getElementById("errorn").innerText="*Nombre deberá tener mínimo 2 caracteres";
            document.getElementById("nom").classList.add("form-red");
        
           
            array_errores.push("nombre");
           

        }else{
            document.getElementById("errorn").innerText="";
            document.getElementById("nom").classList.remove("form-red");
            
            
           

        }

    
    }


    if (apellidos.length == 0){

        
        document.getElementById("errora").innerText="*No se ha introducido apellidos";
        document.getElementById("ape").classList.add("form-red");
        array_errores.push("apellidos");

        
       
        
    }else{

      
        var regex = new RegExp("^[a-zA-Z ]+$");
        
        if (!regex.test(apellidos)) {
            
            document.getElementById("errora").innerText="*Apellidos no admite valores numéricos";
            document.getElementById("ape").classList.add("form-red");
        
            array_errores.push("apellidos");
            
           
          
        }

        else if(apellidos.length<2){

            document.getElementById("errora").innerText="*Apellidos deberá tener mínimo 2 caracteres";
            document.getElementById("ape").classList.add("form-red");
       
            array_errores.push("apellidos");
            

        }else{
            document.getElementById("errora").innerText="";
            document.getElementById("ape").classList.remove("form-red");
            
        }
        

    }

   
    if (password.length == 0){

        
        document.getElementById("errorp").innerText="*Se debe de introducir password";
        document.getElementById("pass").classList.add("form-red");
        array_errores.push("password");
            
    }else{
            
        var patron = /[0-9]/;
        const lista=password.split("");
        let errore=false;

        if(isNaN(password)){

        
            document.getElementById("errorp").innerText="*Solo se admiten valores numéricos";
            document.getElementById("pass").classList.add("form-red");
            document.getElementById("pass").value="";
            array_errores.push("password");


        }else{


            if(password.length !=6){

                document.getElementById("errorp").innerText="*El password debe contener 6 caracteres";
                document.getElementById("pass").classList.add("form-red");
                document.getElementById("pass").value="";
                array_errores.push("password");
                    
    
            }

            else{
               
                for(let i=0; i<lista.length; i++){

                    const repetidos=lista.filter(obj => obj == lista[i]);
                    
                    if(repetidos.length>2){
                                               
                        errore=true;
                        break;
                    }
                    
    
                }
                
                if (errore){

                    document.getElementById("errorp").innerText="*No se puede repetir más de 2 veces el mismo numero";
                    document.getElementById("pass").classList.add("form-red");
                    document.getElementById("pass").value="";
                    array_errores.push("password");

                }else{

                    document.getElementById("errorp").innerText="";
                    document.getElementById("pass").classList.remove("form-red");
                    checkp=true;
                    

                }
                
            }
            
        }
          
    
    
    }

        if (checkp){


            if(passwordrep.length == 0){

                document.getElementById("errorp2").innerText="*Debes de repetir el password";
                document.getElementById("reppass").classList.add("form-red");
                document.getElementById("reppass").value="";
                document.getElementById("reppass").focus();
                array_errores.push("password2");
           


            }else{

                if(isNaN(passwordrep)){

        
                    document.getElementById("errorp2").innerText="*Solo se admiten valores numéricos";
                    document.getElementById("reppass").classList.add("form-red");
                    document.getElementById("reppass").value="";
                    array_errores.push("password");
        
        
                }else{

                    if(password != passwordrep){

                        document.getElementById("errorp2").innerText="*El password debe de coincidir";
                        document.getElementById("reppass").classList.add("form-red");
                        document.getElementById("reppass").value="";
                        document.getElementById("reppass").focus();
                        array_errores.push("password2");
                    
    
    
    
                    }else{
                        document.getElementById("errorp2").innerText="";
                        document.getElementById("reppass").classList.remove("form-red");
    
                        
                    }


                }

                
            
            }
        } 



    if(dni.length == 0){
        document.getElementById("errordni").innerText="*Se debe introducir el DNI";
        document.getElementById("dni").classList.add("form-red");
        array_errores.push("dni");

    }else{
        
      
        let expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
           
        if(expresion_regular_dni.test (dni) == true){
            let numero = dni.substr(0,dni.length-1);
            let letr = dni.substr(dni.length-1,1);
            numero = numero % 23;
            let letra='TRWAGMYFPDXBNJZSQVHLCKET';
            letra=letra.substring(numero,numero+1);
            if (letra!=letr.toUpperCase()) {
                document.getElementById("errordni").innerText="*DNI erroneo, no corresponden los digitos";
              
                document.getElementById("dni").classList.add("form-red");
                array_errores.push("dni");
                
            }else{
              
                document.getElementById("dni").classList.remove("form-red");

            }
        }else{
            document.getElementById("errordni").innerText="*DNI erroneo, formato no valido";
          
            document.getElementById("dni").classList.add("form-red");
            array_errores.push("dni");
           

        }
    }


        
    if(testDate.length == 0){
        document.getElementById("errorf").innerText="*No se ha introducido la fecha";
        document.getElementById("datepicker").classList.add("form-red");
        array_errores.push("fecha");
        

    }else{

        var date_regex = /^([012][1-9]|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/;
        if (!date_regex.test(testDate)) {
        
            document.getElementById("errorf").innerText="*Debes de introducir correctamente la fecha";
            document.getElementById("datepicker").classList.add("form-red");
            array_errores.push("fecha");
           
     
        }

        else{
            
            const fecha_u=new Date(testDate.split('/').reverse().join('/'));
            const fecha_rec=new Date();
            
            const edad=(fecha_u.getTime()-fecha_rec.getTime()) /1000/ (3600 * 24);
           
            const diferencia=Math.abs(Math.round(edad/365.25));
            if(fecha_u > fecha_rec){

                document.getElementById("errorf").innerText="*La fecha nac debe de ser anterior a la actual";
                document.getElementById("datepicker").classList.add("form-red");
                array_errores.push("fecha");
            
           
            }else if(diferencia> 0 &&diferencia < 10){
                
                document.getElementById("errorf").innerText="*Eres demasiado pequeñin";
                document.getElementById("datepicker").classList.add("form-red");
                array_errores.push("fecha");

            }else{

                document.getElementById("errorf").innerText="";
                document.getElementById("datepicker").classList.remove("form-red");
            }
            

           
        }
        


    }


    
    if(telefono.length == 0){
        document.getElementById("errort").innerText="*No se ha introducido el teléfono";
        document.getElementById("tel").classList.add("form-red");
        array_errores.push("telefono");
       
    }else{

        if (isNaN(telefono)){

        
            document.getElementById("errort").innerText="*En telefono solo se admiten números";
            
            document.getElementById("tel").classList.add("form-red");
            array_errores.push("telefono");
          
        
        }else{
            
            if(telefono.length != 9){
            document.getElementById("errort").innerText="*En teléfono se debe introducir 9 dígitos";
         
            document.getElementById("tel").classList.add("form-red");
            array_errores.push("telefono");
           


            }else{
               
                patronTel = /^[9|6]{1}([\d]{2}[-]*){3}[\d]{2}$/;
                compTel = patronTel.test(telefono);
                if(!compTel){
                   
                    document.getElementById("errort").innerText="*Formato de teléfono incorrecto";
         
                    document.getElementById("tel").classList.add("form-red");
                    array_errores.push("telefono");

                }else{
                document.getElementById("errort").innerText="";
                document.getElementById("tel").classList.remove("form-red");
                }

            }

        }
    }

    if(direccion.length == 0){
        document.getElementById("errord").innerText="*No se ha introducido la dirección";
        document.getElementById("dir").classList.add("form-red");
        array_errores.push("direccion");
       

    }else{

        if(!isNaN(direccion)){

            document.getElementById("errord").innerText="*Se deben de introducir letras en dirección";
        
            document.getElementById("dir").classList.add("form-red");
            array_errores.push("direccion");
          
        }else{
            document.getElementById("errord").innerText="";
            document.getElementById("dir").classList.remove("form-red");
            
        }

    }

    if(email.length == 0){
        document.getElementById("errore").innerText="*Debes de introducir el email";
        document.getElementById("email").classList.add("form-red");
        array_errores.push("email");
        
       

    }else{

        var patron=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!patron.test(email)){
            document.getElementById("errore").innerText="*La dirección email es incorrecta";
           
            document.getElementById("email").classList.add("form-red");
            array_errores.push("email");
            
            
        }else{

           
            document.getElementById("errore").innerText="";
            document.getElementById("email").classList.remove("form-red");
                
            
        }

    }


         
    if(array_errores.length == 0){
       
        document.getElementById("msgerror").innerText="";

        if(!check.checked){
            alert("No se han aceptado los terminos y condiciones");
           
           
        }else{
                  
            alert("Usted se ha registrado correctamente \n Nombre:"+nombre+"\n Apellidos:"+apellidos+"\n Correo:"+email);
            document.getElementById('form').submit();

        }
          
           
    }else{

        document.getElementById("msgerror").innerText="No se ha completado correctamente";

    }
    
      
    
}



let index = 0;
    
const listaimg = ["./img/comida_3.jpg", "./img/comida_4.jpg", "./img/comida_5.jpg", "./img/comida_2.jpg"];

$(function() {
  
    setInterval(changeImage, 5000);
    
});

function changeImage() {
   
    $('.fondo2').fadeOut(1000, function() {
        $('.fondo2').css("background-image", 'url(' + listaimg[index] + ')');
    }).fadeIn(1000);
   
   
              
   index++;
                  
   if(index == 4)
      index = 0;
    
    
}


