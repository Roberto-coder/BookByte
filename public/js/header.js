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
    
    
    
});
    
