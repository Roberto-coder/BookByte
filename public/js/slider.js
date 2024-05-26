const btnLeft = document.querySelector(".btn-left"),
      btnRight = document.querySelector(".btn-right"),
      btnLeftProduct = document.querySelector(".btn-left-product"),
      btnRightProduct = document.querySelector(".btn-right-product"),
      slider = document.querySelector("#slider"),
      sliderSection = document.querySelectorAll(".slider-section"),
      contenedorCompra = document.getElementById('contenedorCompra'),   
      favoritos = document.querySelector(".favs");
document.querySelector('.bag').addEventListener('click', function() {
    document.getElementById('informacionCompra').style.display = 'block';
});
    
document.getElementById('x').addEventListener('click', function() {
    document.getElementById('informacionCompra').style.display = 'none';
});
document.querySelectorAll('.favs').forEach(item => {
    item.addEventListener('click', function() {
        document.getElementById('informacionCompra').style.display = 'block'; // Asegúrate de que este es el comportamiento deseado
    });
});

btnLeft.addEventListener("click", e => moveToLeft())
btnRight.addEventListener("click", e => moveToRight())

setInterval(() => {
    moveToRight()
}, 3000);


let operacion = 0,
    counter = 0,
    widthImg = 100 / sliderSection.length;

function moveToRight() {
    if (counter >= sliderSection.length-1) {
        counter = 0;
        operacion = 0;
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "none";
        return;
    } 
    counter++;
    operacion = operacion + widthImg;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "all ease .6s"
    
}  

function moveToLeft() {
    counter--;
    if (counter < 0 ) {
        counter = sliderSection.length-1;
        operacion = widthImg * (sliderSection.length-1)
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "none";
        return;
    } 
    operacion = operacion - widthImg;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "all ease .6s"
    
    
}   



