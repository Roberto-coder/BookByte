

// Definir el rango de años 
var startYear = 2020;
var endYear = 2030;

var yearSelect = document.getElementById("year");

// 
for (var year = startYear; year <= endYear; year++) {
    var option = document.createElement("option");
    option.text = year;
    option.value = year;
    yearSelect.add(option);
}

document.addEventListener('DOMContentLoaded', function() {
    // Obtener la fecha actual
    var fechaActual = new Date();
    var añoActual = fechaActual.getFullYear();
    var mesActual = fechaActual.getMonth() + 1; // Los meses van de 0 a 11, por eso se suma 1

    // Establecer los valores predeterminados en los campos de selección
    document.getElementById('year').value = añoActual;
    document.getElementById('month').value = mesActual;

    updateReports(añoActual, mesActual);
});

jQuery(document).ready(function() {
    // Función para actualizar los reportes de ventas para libros
    jQuery('#year, #month').change(function() {
        var year = jQuery('#year').val();
        var month = jQuery('#month').val();
        // Aquí puedes realizar una solicitud AJAX para obtener los datos del servidor según el año y el mes seleccionados
        // Luego, actualiza la tabla de ventas para libros con los nuevos datos
        updateReports(year, month);
        //updateAuthorSalesReport(year, month);
        //updateGenreSalesReport(year, month);
        console.log(year + month)
    });
});

function updateReports(year, month) {
    
    jQuery.ajax({
        url: '/gerente',
        method: 'GET',
        data: {
            year: year,
            month: month
        },
        success: function(data) {
            console.log(data)
            // Limpiar la tabla antes de actualizar
            $('#bookSalesTable tbody').empty();

            // Recorrer los datos de libros y agregar filas a la tabla
            for (var i = 0; i < data.libros.length; i++) {
                var libro = data.libros[i];
                $('#bookSalesTable tbody').append(`<tr><td>${libro.fecha_registro}</td><td>${libro.book_name}</td><td>${libro.repeticiones}</td></tr>`);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error al obtener los datos de libro:', error);
        }
    });
}


// Datos para el gráfico
var data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
    datasets: [{
        label: "Ventas por mes",
        backgroundColor: "blue",
        data: [65, 59, 80, 81, 56, 55]
    }]
  };
  
  // Configuración del gráfico
  var options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
  };
  
  // Crear el gráfico
  var ctx1 = document.getElementById('myChart1').getContext('2d');
  var myChart1 = new Chart(ctx1, {
    type: 'bar',
    data: data,
    options: options
  });
  
  // Crear el gráfico
  var ctx2 = document.getElementById('myChart2').getContext('2d');
  var myChart2 = new Chart(ctx2, {
    type: 'pie',
    data: data,
    options: options
  });
  
      // Crear el gráfico
  var ctx3 = document.getElementById('myChart3').getContext('2d');
  var myChart3 = new Chart(ctx3, {
    type: 'line',
    data: data,
    options: options
  });
  


