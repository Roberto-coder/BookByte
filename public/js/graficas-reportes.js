

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

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Añade un cero si el mes es de un solo dígito
    let day = date.getDate().toString().padStart(2, '0'); // Añade un cero si el día es de un solo dígito

    return `${year}-${month}-${day}`;
}

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

    });
});

function updateReports(year, month) {
    
    jQuery.ajax({
        url: '/gerente',
        method: 'GET',
        dataType: 'json',
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
                $('#bookSalesTable tbody').append(`<tr><td>${formatDate(libro.fecha_registro)}</td><td>${libro.book_name}</td><td>${libro.repeticiones}</td></tr>`);
            }

        },
        error: function(xhr, status, error) {
            console.error('Error al obtener los datos de libro:', error);
        }
    });
}

function updateGraphs(year, month) {
    
    jQuery.ajax({
        url: '/gerenteGraficas',
        method: 'GET',
        data: {
            year: year,
            month: month
        },
        success: function(data) {
            console.log(data)

            // Manipular los datos recibidos para obtener charData
            var charData = data.libros.map(function(libro) {
                return libro.repeticiones; // Suponiendo que 'repeticiones' contiene los datos que quieres mostrar en el gráfico
            });

            // Ahora puedes usar charData para configurar tu gráfico
            const ctx = document.getElementById('myChart1').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Libro 1', 'Libro 2', 'Libro 3'], // Supongamos que estas son las etiquetas de los libros
                    datasets: [{
                        label: 'Ventas por libro',
                        data: charData, 
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)', 
                            'rgba(54, 162, 235, 0.2)', 
                            'rgba(255, 206, 86, 0.2)' 
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)', 
                            'rgba(54, 162, 235, 1)', 
                            'rgba(255, 206, 86, 1)' 
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true // Comienza el eje Y desde cero
                        }
                    }
                }
            });

        },
        error: function(xhr, status, error) {
            console.error('Error al obtener los datos de libro:', error);
        }
    });
}


// Datos para el gráfico
var data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
    datasets: [{
        label: "Ventas por mes",
        data: charData,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
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
  /*var ctx1 = document.getElementById('myChart1').getContext('2d');
  var myChart1 = new Chart(ctx1, {
    type: 'bar',
    data: data,
    options: options
  });*/
  
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
  


