
document.getElementById('container').style.display="none";
window.onload = function(){
    
    
    setInterval(function(){
        
        document.getElementById('container').style.display="block";
        document.getElementById('svg').style.display="none";

        
    }, 1000);
    
    
    
 };
    
    
   

let index = 0;
    
const listaimg = ["./img/comida_3.jpg", "./img/comida_4.jpg", "./img/comida_5.jpg", "./img/comida_2.jpg", "./img/image_ppli.jpg"];

$(function() {
  
    setInterval(changeImage, 5000);
    
});

function changeImage() {
   
    $('.fondo2').fadeOut(1000, function() {
        $('.fondo2').css("background-image", 'url(' + listaimg[index] + ')');
    }).fadeIn(1000);
   
              
   index++;
                  
   if(index == 5)
      index = 0;
    
   
}










    













