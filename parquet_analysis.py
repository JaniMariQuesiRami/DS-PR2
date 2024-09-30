import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Ruta al archivo Parquet
file_path = './data/1019715464.parquet'

# Cargar el archivo Parquet usando pandas
df = pd.read_parquet(file_path)

# Mostrar las columnas del archivo Parquet
print("Columnas del archivo:")
print(df.columns)

# Mostrar las primeras filas del archivo Parquet
print("\nPrimeras filas del archivo:")
print(df.head())

# 1. Análisis de valores faltantes (NaN)
missing_values = df.isnull().sum()
missing_percentage = df.isnull().mean() * 100
print("\nValores faltantes por columna (primeras 10):\n", missing_values.head(10))
print("\nPorcentaje de valores faltantes por columna (primeras 10):\n", missing_percentage.head(10))

# Eliminar columnas con más del 50% de valores faltantes, pero preservar las de la mano derecha
threshold = 0.5
right_hand_columns = [col for col in df.columns if 'right_hand' in col]
df_cleaned = df.dropna(thresh=int(df.shape[0] * (1 - threshold)), axis=1)

# Asegurarse de que las columnas de la mano derecha no se eliminen
for col in right_hand_columns:
    if col not in df_cleaned.columns:
        df_cleaned[col] = df[col]

# Imputar los valores faltantes restantes con interpolación (si es necesario)
df_cleaned = df_cleaned.interpolate(method='linear', axis=0).fillna(method='bfill').fillna(method='ffill')

# 2. Análisis de movimiento en puntos claves (mano derecha)
df_right_hand = df_cleaned[right_hand_columns]

# Calcular la diferencia entre fotogramas consecutivos
movement = df_right_hand.diff().fillna(0)

print("\nMovimiento de la mano derecha entre fotogramas (primeras 5 filas):\n", movement.head())

# 3. Visualización 3D del movimiento de la mano derecha
if all(col in df_cleaned.columns for col in ['x_right_hand_0', 'y_right_hand_0', 'z_right_hand_0']):
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')

    # Graficar el movimiento de la mano derecha en 3D para los primeros 50 frames
    ax.plot(df_cleaned['x_right_hand_0'][:50], df_cleaned['y_right_hand_0'][:50], df_cleaned['z_right_hand_0'][:50])
    ax.set_xlabel('Eje X')
    ax.set_ylabel('Eje Y')
    ax.set_zlabel('Eje Z')
    plt.title('Movimiento de la mano derecha en 3D (primeros 50 frames)')
    plt.show()
else:
    print("Las columnas para la mano derecha no están disponibles para la visualización en 3D.")

# 4. Estudio de los puntos faciales
face_columns = [col for col in df_cleaned.columns if 'face' in col]
df_face = df_cleaned[face_columns]
print("\nPuntos faciales en los primeros fotogramas:\n", df_face.head())

# 5. Análisis del rango de movimiento de las manos

# Rango de movimiento de la mano derecha
if 'x_right_hand_0' in df_cleaned.columns:
    right_hand_range = df_cleaned['x_right_hand_0'].max() - df_cleaned['x_right_hand_0'].min()
    print(f"\nRango de movimiento de la mano derecha: {right_hand_range}")
else:
    print("No se encontraron datos suficientes para calcular el rango de movimiento de la mano derecha.")

# Rango de movimiento de la mano izquierda
left_hand_columns = [col for col in df_cleaned.columns if 'left_hand' in col]
if 'x_left_hand_0' in df_cleaned.columns:
    left_hand_range = df_cleaned['x_left_hand_0'].max() - df_cleaned['x_left_hand_0'].min()
    print(f"Rango de movimiento de la mano izquierda: {left_hand_range}")
else:
    print("No se encontraron datos suficientes para calcular el rango de movimiento de la mano izquierda.")

# 6. Identificación de secuencias problemáticas (con más del 50% de NaNs antes de limpieza)
problematic_sequences = df[df.isnull().mean(axis=1) > 0.5]
print(f"\nSecuencias problemáticas con más del 50% de valores faltantes:\n", problematic_sequences)

# Guardar el DataFrame limpio en un nuevo archivo parquet
output_path = './data/cleaned_1019715464.parquet'
df_cleaned.to_parquet(output_path)
print(f"\nDatos limpios guardados en: {output_path}")
