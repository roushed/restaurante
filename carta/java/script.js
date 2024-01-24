

const main=document.getElementById('contenidito');

const tabla=document.createElement('table');
tabla.setAttribute("id","tablita");
tabla.setAttribute("class","table table-hover table-sm table-active table-striped");
main.append(tabla);
const trprincipal=document.createElement('tr');
trprincipal.setAttribute('class','bg-dark text-white');
const datos="<th>Id Carta</th><th>Nombre</th><th>Descripcion</th><th>Precio plato</th><th>Tipo producto</th><th>Codigo Alergeno</th><th class='thinsertar' id='thinsertar'></th>";
trprincipal.innerHTML=datos;
tabla.append(trprincipal);
thinsertar=document.getElementById('thinsertar');
btninsertar=document.createElement('button');
btninsertar.setAttribute('id','insertar');
btninsertar.textContent="Insertar";
thinsertar.append(btninsertar);
tbody=document.createElement('tbody');
tabla.append(tbody);

let contador=0;

for(let i=0; i<3; i++){

    const terre=document.createElement('tr');
    tabla.append(terre);

    for(let z=0; z<6; z++){
        contador++;
        let codigo=contador.toString();

        const tede=document.createElement('td');
        tede.setAttribute('id',contador);
        terre.append(tede);


    }
    
	tbody.append(terre);
     
    const tedepanel=document.createElement('td');
    const imgeditar=document.createElement("img");
    imgeditar.setAttribute("class", "editar");
    imgeditar.setAttribute('src','./img/edit.jpg');
    tedepanel.append(imgeditar);
    
    let imgeliminar=document.createElement("img");
    imgeliminar.setAttribute("class", "eliminar");
    imgeliminar.setAttribute('src','./img/del.jpg');
    tedepanel.append(imgeliminar);
    
    terre.append(tedepanel);

}


const tablita=document.getElementById('tablita');
const insertar=document.getElementById('insertar');

insertar.addEventListener('click', inserta);

function inserta(){

    var elemento = tabla.rows.length; 
    var row=tabla.insertRow(elemento);

    for(let i=0;i<7;i++){
            
        var cell = row.insertCell(i);
        if(i<6){
            let codigo="val"+((i+1).toString());
           
            cell.innerHTML = "<input type='text' size='12' id='"+codigo+"'>";

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
  
    const nodoTd = e.target.parentNode; 
    const fila = nodoTd.parentNode.rowIndex; 
	tabla.removeChild(tabla.children[fila]);
}

eliminar.forEach(boton => {
	
	boton.addEventListener("click", elimina);
});



const editar = document.querySelectorAll(".editar");
const edita = (e)=> {

    const nodoTd = e.target.parentNode; 
    const fila = nodoTd.parentNode.rowIndex;
        
        for(let i=0; i<7; i++){
            if(i<6){
                let codigo="val"+((i+1).toString());
                let valor=tabla.rows[fila].cells[i].innerHTML;
                tablita.rows[fila].cells[i].innerHTML="<input type='text' size='8' value='"+valor+"' id='"+codigo+"'>";
            }else{

                tabla.rows[fila].cells[i].removeChild(tabla.rows[fila].cells[i].children[0]);
                tabla.rows[fila].cells[i].removeChild(tabla.rows[fila].cells[i].children[0]);
                
                const imgrabar=document.createElement("img");
                imgrabar.setAttribute("class", "grabar");
                imgrabar.setAttribute('src','./img/save.jpg');
                imgrabar.onclick=graba;
                tabla.rows[fila].cells[i].append(imgrabar);

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
        
        for(let i=0; i<7; i++){
  
            if(i<6){

                valor=tabla.rows[fila].cells[i].children[0].value;
                tabla.rows[fila].cells[i].innerHTML=valor;
    
                
            }else{
    
                tabla.rows[fila].cells[6].removeChild(tabla.rows[fila].cells[6].children[0]);

                const imgeditar=document.createElement("img");
                imgeditar.setAttribute("class", "editar");
                imgeditar.setAttribute('src','./img/edit.jpg');
                imgeditar.onclick=edita;
                tabla.rows[fila].cells[6].append(imgeditar);

                const imgeliminar=document.createElement("img");
                imgeliminar.setAttribute("class", "eliminar");
                imgeliminar.setAttribute('src','./img/del.jpg');
                imgeliminar.onclick=elimina;
                tabla.rows[fila].cells[6].append(imgeliminar);
               
            }
                   
        }

	
}

grabar.forEach(boton => {
	 
	boton.addEventListener("click", graba);
});







