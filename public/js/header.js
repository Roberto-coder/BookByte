document.addEventListener('DOMContentLoaded', function() {
    let menu = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');
    const carrito = document.querySelector('.bag');
    const contenedorCompra = document.getElementById('contenedorCompra');
    const x = document.querySelector('#x'); 

    menu.onclick = function() {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('open');
    };
    
    carrito.addEventListener('click', function(event) {
        event.preventDefault();
        contenedorCompra.classList.toggle('none');
        mostrarElementosLista();
    });

    x.addEventListener('click', function() {
        contenedorCompra.classList.add('none');
    });
    
    async function mostrarElementosLista() {
        fetch('/carrito')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error de seleccion');
                }
                return response.json();
            })
            .then(data => {
                const carritoHTML = data.map(item => `
                    <div class="item-carrito">
                        <h4>${item.Nombre}</h4>
                        <p>Cantidad: ${item.cantidad}</p>
                        <p>Precio: ${item.PREC}</p>
                    </div>
                `).join('');
                contenedorCompra.innerHTML = carritoHTML;
            })
            .catch(err => {
                console.error('Error al obtener datos', err.message);
                contenedorCompra.innerHTML = `<p>Error al cargar el carrito.</p>`;
            });
    }
    
});
