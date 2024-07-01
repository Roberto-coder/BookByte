document.addEventListener('DOMContentLoaded', function() {
    let menu = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');
    const carrito = document.querySelector('.bag');
    const logout = document.querySelector('.logout');
    const contenedorCompra = document.getElementById('contenedorCompra');
    const x = document.querySelector('#x'); 
    const favoritos = document.querySelector('.fav');
    const contenedorFavs = document.getElementById('contenedorFavs');
    const x2 = document.querySelector('#x2'); 
    const apartados = document.querySelector('.apartado');
    const contenedorApartado = document.getElementById('contenedorApartado');
    const x3 = document.querySelector('#x3'); 
  
    menu.onclick = function() {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('open');
    };
    
    carrito.addEventListener('click', function(event) {
        event.preventDefault();
        contenedorCompra.classList.toggle('none');
    });

    x.addEventListener('click', function() {
        contenedorCompra.classList.add('none');
    });
    favoritos.addEventListener('click', function(event) {
        event.preventDefault();
        contenedorFavs.classList.toggle('none');
    });
    
    x2.addEventListener('click', function() {
        contenedorFavs.classList.add('none');
    });
    apartados.addEventListener('click', function(event) {
        event.preventDefault();
        contenedorApartado.classList.toggle('none');
    });
    
    x3.addEventListener('click', function() {
        contenedorApartado.classList.add('none');
    });
    
    
    
});
    
