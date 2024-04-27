
import math
import random
from sklearn.datasets import load_iris, load_wine, load_diabetes

def hold_out_dataset(dataset, dataset_name):
    X = dataset.data
    y = dataset.target

    # Porcentaje de datos a incluir en el conjunto de prueba (por ejemplo, 20%)
    test_size = 0.2

    # Obtener el número de ejemplos de datos de prueba
    test_data_size = int(len(X) * test_size)

    # Generar índices aleatorios para los datos de prueba
    test_indices = random.sample(range(len(X)), test_data_size)

    # Inicializar listas para conjuntos de entrenamiento y prueba
    train_data, test_data = [], []

    # Separar los datos en conjuntos de entrenamiento y prueba
    for i in range(len(X)):
        if i in test_indices:
            test_data.append(list(X[i]) + [y[i]])
        else:
            train_data.append(list(X[i]) + [y[i]])

    # Verificar si los conjuntos son disjuntos
    train_set = set([tuple(i) for i in train_data])
    test_set = set([tuple(i) for i in test_data])
    assert len(train_set.intersection(test_set)) == 0

    clasificaciones_correctas = []
    for elemento in test_data:
        menor_distancia = float('inf')
        clasificacion = None
        for eltrain in train_data:
            distancia = math.sqrt(sum((a - b) ** 2 for a,b in zip(elemento[:-1], eltrain[:-1])))
            if distancia < menor_distancia:
                menor_distancia = distancia
                clasificacion = eltrain[-1]
        if clasificacion == elemento[-1]:
            clasificaciones_correctas.append(elemento)

    if dataset_name == "iris":
        clasificaciones = {0: 'setosa', 1: 'versicolor', 2: 'virginica'}
        for clasele in clasificaciones_correctas:
            clasele[-1] = clasificaciones[clasele[-1]]

    print(f'Los elementos clasificados correctamente para {dataset_name} son: ' + str(clasificaciones_correctas))

# Cargar el conjunto de datos Iris y aplicar Hold Out
iris_dataset = load_iris()
hold_out_dataset(iris_dataset, "iris")

# Cargar el conjunto de datos Wine y aplicar Hold Out
wine_dataset = load_wine()
hold_out_dataset(wine_dataset, "wine")

# Cargar el conjunto de datos Diabetes y aplicar Hold Out
diabetes_dataset = load_diabetes()
hold_out_dataset(diabetes_dataset, "diabetes")