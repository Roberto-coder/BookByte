$(document).ready(function() {
    $('.star').on('click', function() {
      var ratingValue = $(this).data('value');
      var bookId = 1; // Reemplazar con el ID real del libro
  
      // Marcar las estrellas seleccionadas
      $('.star').each(function(index) {
        if (index < ratingValue) {
          $(this).addClass('active');
        } else {
          $(this).removeClass('active');
        }
      });
  
      // Llamada AJAX para actualizar la calificación en la base de datos
      $.ajax({
        url: '/ranking', // Ruta para manejar la actualización de calificación
        method: 'POST',
        data: {
          bookId: bookId,
          rating: ratingValue
        },
        success: function(response) {
          alert('¡Calificación guardada con éxito!');
        },
        error: function(xhr, status, error) {
          console.error('Error al guardar la calificación:', error);
        }
      });
    });
  });
  