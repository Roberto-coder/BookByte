

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
    updateGraphs(añoActual, mesActual);
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
        updateGraphs(year, month);
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
            //console.log(data)
            // Limpiar la tabla antes de actualizar
            $('#bookSalesTable tbody').empty();
            $('#authorSalesTable tbody').empty();
            $('#genreSalesTable tbody').empty();

            // Recorrer los datos de libros y agregar filas a la tabla
            for (var i = 0; i < data.libros.length; i++) {
                var libro = data.libros[i];
                $('#bookSalesTable tbody').append(`<tr><td>${formatDate(libro.fecha_registro)}</td><td>${libro.book_name}</td><td>${libro.repeticiones}</td></tr>`);
            }

            // Recorrer los datos de libros y agregar filas a la tabla
            for (var i = 0; i < data.autores.length; i++) {
                var autor = data.autores[i];
                $('#authorSalesTable tbody').append(`<tr><td>${formatDate(autor.fecha)}</td><td>${autor.book_author}</td><td>${autor.repeticiones}</td></tr>`);
            }

            // Recorrer los datos de libros y agregar filas a la tabla
            for (var i = 0; i < data.generos.length; i++) {
                var genero = data.generos[i];
                $('#genreSalesTable tbody').append(`<tr><td>${formatDate(genero.fecha_registro)}</td><td>${genero.book_genre}</td><td>${genero.repeticiones}</td></tr>`);
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
            console.log(data);
            // Libros
            var charDataBooks = data.libros.map(function(libro) {
                return libro.total_cantidad; 
            });
            // Gerero
            var charLabelGenre = data.generos.map(function(genero) {
                return genero.book_genre;
            });
        
            var charDataGenre = data.generos.map(function(genero) {
                return genero.repeticiones;
            });
            
            // Autor
            var charLabelAutor = data.autores.map(function(autor) {
                return autor.book_author;
            });
            var charDataAutor = data.autores.map(function(autor) {
                return autor.total_cantidad;
            });

            // Revisar si se ha creado un gráfico previamente y destruirlo
            if (window.myChart) {
                window.myChart.destroy();
            }

            // Ahora puedes usar charData para configurar tu gráfico
            const ctx = document.getElementById('myChart1').getContext('2d');
            window.myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                    datasets: [{
                        label: 'Ventas de Libro por Mes',
                        data: charDataBooks, 
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)', 
                            'rgba(54, 162, 235, 0.2)', 
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(199, 199, 199, 0.2)',
                            'rgba(83, 102, 255, 0.2)',
                            'rgba(255, 204, 102, 0.2)',
                            'rgba(102, 255, 178, 0.2)',
                            'rgba(255, 102, 255, 0.2)',
                            'rgba(255, 255, 102, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)', 
                            'rgba(54, 162, 235, 1)', 
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(199, 199, 199, 1)',
                            'rgba(83, 102, 255, 1)',
                            'rgba(255, 204, 102, 1)',
                            'rgba(102, 255, 178, 1)',
                            'rgba(255, 102, 255, 1)',
                            'rgba(255, 255, 102, 1)'
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
            const ctx2 = document.getElementById('myChart2').getContext('2d');
            window.myChart = new Chart(ctx2, {
                //doughnut and pie
                type: 'doughnut',
                data: {
                    labels: charLabelGenre,
                    datasets: [{
                        label: 'Generos mas vendidos del Año',
                        data: charDataGenre, 
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)', 
                            'rgba(54, 162, 235, 0.2)', 
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(199, 199, 199, 0.2)',
                            'rgba(83, 102, 255, 0.2)',
                            'rgba(255, 204, 102, 0.2)',
                            'rgba(102, 255, 178, 0.2)',
                            'rgba(255, 102, 255, 0.2)',
                            'rgba(255, 255, 102, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)', 
                            'rgba(54, 162, 235, 1)', 
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(199, 199, 199, 1)',
                            'rgba(83, 102, 255, 1)',
                            'rgba(255, 204, 102, 1)',
                            'rgba(102, 255, 178, 1)',
                            'rgba(255, 102, 255, 1)',
                            'rgba(255, 255, 102, 1)'
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
            const ctx3 = document.getElementById('myChart3').getContext('2d');
            window.myChart = new Chart(ctx3, {
                //doughnut and pie
                type: 'line',
                data: {
                    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                    datasets: [{
                        label: 'Ventas de Libros de Frank Herbert',
                        data: charDataAutor, 
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)', 
                            'rgba(54, 162, 235, 0.2)', 
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(199, 199, 199, 0.2)',
                            'rgba(83, 102, 255, 0.2)',
                            'rgba(255, 204, 102, 0.2)',
                            'rgba(102, 255, 178, 0.2)',
                            'rgba(255, 102, 255, 0.2)',
                            'rgba(255, 255, 102, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)', 
                            'rgba(54, 162, 235, 1)', 
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(199, 199, 199, 1)',
                            'rgba(83, 102, 255, 1)',
                            'rgba(255, 204, 102, 1)',
                            'rgba(102, 255, 178, 1)',
                            'rgba(255, 102, 255, 1)',
                            'rgba(255, 255, 102, 1)'
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
            console.error('Error al obtener los datos de los libros:', error);
        }
    });
}




