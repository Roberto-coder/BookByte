import pool from '../config/database.js';

function buscarLibro(req, res, next) {
    const { isbn } = req.body;

    pool.query('SELECT * FROM books WHERE book_isbn = ?', [isbn], (error, results) => {
        if (error) {
            return next(error);
        }

        const book = results.length > 0 ? results[0] : null;

        if (!req.session.cart) {
            req.session.cart = [];
        }

        // Verificar si el libro ya está en el carrito
        const alreadyInCart = req.session.cart.some(item => item.book_isbn === isbn);

        if (book && !alreadyInCart) {
            req.session.cart.push(book);
        }

        const total = req.session.cart.reduce((acc, item) => acc + parseFloat(item.book_price), 0);

        res.render('Empleado/caja', { 
            addedBook: book, 
            cart: req.session.cart, 
            total: total.toFixed(2),
            error: book ? null : 'No se encontró el libro. Por favor, verifique el ISBN ingresado.'
        });
    });
}

function removeFromCart(req, res, next) {
    const { index } = req.body;

    if (!req.session.cart) {
        req.session.cart = [];
    }

    if (index >= 0 && index < req.session.cart.length) {
        req.session.cart.splice(index, 1);
    }

    const total = req.session.cart.reduce((acc, item) => acc + parseFloat(item.book_price), 0);

    res.render('Empleado/caja', { 
        cart: req.session.cart, 
        total: total.toFixed(2),
        addedBook: null,
        error: null
    });
}

function checkout(req, res, next) {
    // Lógica para el pago y limpieza del carrito
    req.session.cart = [];
    res.render('Empleado/caja', { 
        cart: [], 
        total: '0.00',
        addedBook: null,
        error: null,
        success: 'Pago realizado con éxito.'
    });
}

export default { buscarLibro, removeFromCart, checkout };
