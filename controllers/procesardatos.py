import numpy as np
from sklearn.datasets import load_iris
from sklearn.datasets import load_diabetes
import os

def distancia_euclidiana(punto1, punto2):
    return np.sqrt(np.sum((punto1 - punto2) ** 2))

 

# Función para evaluar el modelo 1NN
def evaluar_modelo(modelo, datos_prueba, etiquetas_prueba):
    datos_entrenamiento, etiquetas_entrenamiento = modelo
    precision = 0
    
    for i in range(len(datos_prueba)):
        punto_prueba = datos_prueba[i]
        etiqueta_prueba = etiquetas_prueba[i]
        
        # Inicializamos la distancia mínima y la etiqueta del vecino más cercano
        distancia_minima = float('inf')
        etiqueta_vecino_cercano = None
        
        for j in range(len(datos_entrenamiento)):
            punto_entrenamiento = datos_entrenamiento[j]
            distancia = distancia_euclidiana(punto_prueba, punto_entrenamiento)
            
            if distancia < distancia_minima:
                distancia_minima = distancia
                etiqueta_vecino_cercano = etiquetas_entrenamiento[j]
        
        # Comparamos la etiqueta del vecino más cercano con la etiqueta real
        if etiqueta_vecino_cercano == etiqueta_prueba:
            precision += 1
    
    # Devolvemos la precisión, que es la fracción de ejemplos de prueba clasificados correctamente.
    return precision / len(datos_prueba)

#Divicion de los datos para el modelo de 10-Fold Cross-Validation
def dividir_en_folds(datos, etiquetas, num_folds):
    tamaño_fold = len(datos) // num_folds
    folds = []
    for i in range(0, len(datos), tamaño_fold):
        datos_fold = datos[i:i + tamaño_fold]
        etiquetas_fold = etiquetas[i:i + tamaño_fold]
        folds.append((datos_fold, etiquetas_fold))
    return folds

indice=0

#Uso de arreglos para la indicacion del cargado de datos como su nombres para la muestra
datasets = [load_iris,load_diabetes]
banco=["Iris Dataset","Diabetes Dataset"]

for load_dataset in datasets:
    
    # Cargar el conjunto de datos 
    datos = load_dataset()
    X = datos.data
    y = datos.target
    
    # Imprime las caracteristicas del Banco de datos Iris
    print("\nEl banco de datos:",banco[indice],"\n")
    print("Conjunto de características (X):")
    print(X[:10])
    print("Etiquetas de clases (y):")
    print(y[:10])
    
    #Lista donde se almacenara la suma de los resultados de la validacion de cada vuelta
    metricas = []
    
    #se divide los Folds para la validacion
    folds = dividir_en_folds(X, y, num_folds=10)
    numero=1
    
    # Realiza la validación cruzada de 10-fold
    for i in range(10):
     
        # Se inicialisan las listas
        datos_entrenamiento = []
        etiquetas_entrenamiento = []
     
        # Se guarda como la parte de prueba el fold que coicida con el contador
        datos_prueba, etiquetas_prueba = folds[i]

        for j in range(10):
            #Y con la condicion de que j no sea i se puede incluir los demas datos exepto lo de prueba en los datos de entrenamiento
            if j != i:
                datos_fold, etiquetas_fold = folds[j]
                datos_entrenamiento.extend(datos_fold)
                etiquetas_entrenamiento.extend(etiquetas_fold)
     
        # Se colocan los datos de entrenamiento y evaluacion
        modelo = datos_entrenamiento, etiquetas_entrenamiento
        exactitud = evaluar_modelo(modelo, datos_prueba, etiquetas_prueba)
        metricas.append(exactitud)
     
        # Se indica aqui el valor dado en el modelo como el numero de fold que se este pasando
        print("\nValidacion ",numero)
        print(":",exactitud*100)
        numero=numero+1

    # Calcula las métricas promedio de rendimiento
    exactitud_promedio = sum(metricas) / len(metricas)
    print("\nExactitud promedio:", exactitud_promedio*100)
    indice=indice+1


