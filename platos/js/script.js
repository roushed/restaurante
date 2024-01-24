
const array_gen=new Array();
let datos="";
const array_categorias=new Array("primero", "segundo", "bebida", "postre");


$.ajax(
    'platotabla.php',
    {
        success: function(data) {
        
          const cadena_l=data.split("_");
          for(let i=0; i<cadena_l.length; i++){

            let cadena_l2=cadena_l[i].split(";");
            array_gen.push(cadena_l2);
        }
        
        
        for(let i=0; i<array_categorias.length; i++){
        
            const array_cat=array_gen.filter(obj => obj[3] == array_categorias[i]);
            datos+=`<table border='1'>`;
            datos+=`<tr><th colspan='3'><b class='f_dancing'>${array_categorias[i].toUpperCase()}</b></th></tr>`;
            for(let a=0;a<array_cat.length; a++){
                datos+=`<tr>`;
                for(let b=0; b<array_cat[a].length; b++){
                    if(b != 3){
                        if(b == 2){
        
                            datos+=`<td>${array_cat[a][b]}€</td>`;
        
                        }else{
        
                            datos+=`<td>${array_cat[a][b]}</td>`;
                        }
                    
                    }
                    
                }
                datos+=`</tr>`;
        
            }
            datos+=`</table>`;
            
        }
        
        document.getElementById("contenido").innerHTML=datos;

    
        },
        error: function() {
          
        }
     }
);

