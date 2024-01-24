const nombres_menu=new Array();
const array_menu=new Array();


$.ajax(
    'menutabla.php',
    {
        success: function(data) {
          
            const cadena_m=data.split("_");

            for(let i=0; i<cadena_m.length; i++){

                let cadena_ms=cadena_m[i].split(";");
                array_menu.push(cadena_ms);
            }

            for(let i=0; i<array_menu.length; i++){

                if (!nombres_menu.includes(array_menu[i][0])) {
                    nombres_menu.push(array_menu[i][0]);        
                }

            }

            datos2=`<div class='menus'>`;
            for(let i=0; i<nombres_menu.length; i++){
                datos2+=`<table border='1'>`;
                const filtrado=array_menu.filter(obj => obj[0] == nombres_menu[i]);
                datos2+=`<tr><th><b class='f_dancing'>${nombres_menu[i]}</b></th></tr>`;
                
                for(let a=0;a<filtrado.length; a++){
                
                    datos2+=`<tr><td>${filtrado[a][1]}</td></tr>`; 
                }
                
                datos2+=`<tr>`;  
                datos2+=`<td><b>Precio:</b> ${filtrado[0][2]} €</td>`;
                datos2+=`</tr>`;
                datos2+=`</table>`;
            }
        
            datos2+="</div>";
            document.getElementById("contenido").innerHTML+=datos2;
        },
            error: function() {
            }
    }
);























