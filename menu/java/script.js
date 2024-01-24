const tabla=document.getElementById('tablita');
const insertar=document.getElementById('insertar');


let fila=0;


insertar.addEventListener('click',(e)=>{

    const elemento = tabla.rows.length; 
  
    const row=tabla.insertRow(elemento);

    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
 

    cell1.innerHTML = "<input type='text' size='5' id='val1'>";
    cell2.innerHTML = "<input type='text' size='5' id='val2'>";
    cell3.innerHTML = "<input type='text' size='5' id='val3'>";
    cell4.innerHTML = "<input type='text' size='14' id='val4'>";
       
    const imgedit=document.createElement('img');
    imgedit.setAttribute('class','grabar');
    imgedit.setAttribute('src','./img/save.jpg')
    imgedit.onclick=graba;
    cell5.append(imgedit);
               
  
});

const eliminar = document.querySelectorAll(".eliminar");

const elimina=  (e)=> {
  
    const nodoTd = e.target.parentNode; 
    const fila = nodoTd.parentNode.rowIndex; 
    tabla.deleteRow(fila);
	
}

eliminar.forEach(boton => {

	boton.addEventListener("click", elimina);
});



const editar = document.querySelectorAll(".editar");
const edita = (e)=> {

    const nodoTd = e.target.parentNode; 
    const fila = nodoTd.parentNode.rowIndex; 

      
        valor1=tabla.rows[fila].cells[0].innerHTML;
        valor2=tabla.rows[fila].cells[1].innerHTML;
        valor3=tabla.rows[fila].cells[2].innerHTML;
        valor4=tabla.rows[fila].cells[3].innerHTML;
        tabla.rows[fila].cells[0].innerHTML="<input type='text' size='5' value='"+valor1+"' id='val1'>";
        tabla.rows[fila].cells[1].innerHTML="<input type='text' size='5' value='"+valor2+"' id='val2'>";
        tabla.rows[fila].cells[2].innerHTML="<input type='text'  size='5' value='"+valor3+"' id='val3'>";
        tabla.rows[fila].cells[3].innerHTML="<input type='text' size='14' value='"+valor4+"' id='val4'>";
        tabla.rows[fila].cells[4].removeChild(tabla.rows[fila].cells[4].children[0]);
        tabla.rows[fila].cells[4].removeChild(tabla.rows[fila].cells[4].children[0]);
        const imgrabar=document.createElement("img");
        imgrabar.setAttribute("class", "grabar");
        imgrabar.setAttribute('src','./img/save.jpg');
        imgrabar.onclick=graba;
        tabla.rows[fila].cells[4].append(imgrabar);

	
}

editar.forEach(boton => {
	boton.addEventListener("click", edita);
});



const grabar = document.querySelectorAll(".grabar");
grabar.forEach(boton => boton.style.display = "none");

const graba=  (e)=> {
    

    const nodoTd = e.target.parentNode; 
    const fila = nodoTd.parentNode.rowIndex; 

    valor1=document.getElementById('val1').value;
    valor2=document.getElementById('val2').value;
    valor3=document.getElementById('val3').value;
    valor4=document.getElementById('val4').value;
    
    tabla.rows[fila].cells[0].innerHTML=valor1;
    tabla.rows[fila].cells[1].innerHTML=valor2;
    tabla.rows[fila].cells[2].innerHTML=valor3;
    tabla.rows[fila].cells[3].innerHTML=valor4;
    tabla.rows[fila].cells[4].removeChild(tabla.rows[fila].cells[4].children[0]);

    const imgeditar=document.createElement("img");
    imgeditar.setAttribute("class", "editar");
    imgeditar.setAttribute('src','./img/edit.jpg');
    imgeditar.onclick=edita;
    tabla.rows[fila].cells[4].append(imgeditar);

    const imgeliminar=document.createElement("img");
    imgeliminar.setAttribute("class", "eliminar");
    imgeliminar.setAttribute('src','./img/del.jpg');
    imgeliminar.onclick=elimina;
    tabla.rows[fila].cells[4].append(imgeliminar);
       
	
}

grabar.forEach(boton => {
	
       
	boton.addEventListener("click", graba);
});


























