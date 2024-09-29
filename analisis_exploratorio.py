# Importación de las librerías necesarias
import pandas as pd
import numpy as np
import os
from collections import Counter
import matplotlib.pyplot as plt
import seaborn as sns
from pandas_profiling import ProfileReport

# Crear carpeta de salida
output_dir = './output/'
os.makedirs(output_dir, exist_ok=True)

# Cargar los datos
train_data = pd.read_csv('./data/train.csv')
supplemental_metadata = pd.read_csv('./data/supplemental_metadata.csv')

# Información sobre el conjunto de datos
num_phrases = len(train_data['phrase'].unique())
avg_words_per_phrase = train_data['phrase'].apply(lambda x: len(x.split())).mean()

# Participante con más frases
participant_phrase_count = train_data['participant_id'].value_counts()
top_participant = participant_phrase_count.idxmax()
top_participant_count = participant_phrase_count.max()

# Promedio de frases por participante
avg_phrases_per_participant = train_data.groupby('participant_id')['phrase'].count().mean()

# Palabra más repetida en todas las frases
all_words = ' '.join(train_data['phrase']).split()
most_common_word = Counter(all_words).most_common(1)[0]

# Letra más utilizada en todas las frases
all_letters = ''.join(train_data['phrase']).replace(' ', '')
most_common_letter = Counter(all_letters).most_common(1)[0]

# Resultados
print(f"Total de frases únicas: {num_phrases}")
print(f"Promedio de palabras por frase: {avg_words_per_phrase:.2f}")
print(f"Participante con más frases: {top_participant} ({top_participant_count} frases)")
print(f"Promedio de frases por participante: {avg_phrases_per_participant:.2f}")
print(f"Palabra más común: '{most_common_word[0]}' (Aparece {most_common_word[1]} veces)")
print(f"Letra más común: '{most_common_letter[0]}' (Aparece {most_common_letter[1]} veces)")

# Guardar resultados en un archivo de texto
with open(os.path.join(output_dir, 'resumen_datos.txt'), 'w') as f:
    f.write(f"Total de frases únicas: {num_phrases}\n")
    f.write(f"Promedio de palabras por frase: {avg_words_per_phrase:.2f}\n")
    f.write(f"Participante con más frases: {top_participant} ({top_participant_count} frases)\n")
    f.write(f"Promedio de frases por participante: {avg_phrases_per_participant:.2f}\n")
    f.write(f"Palabra más común: '{most_common_word[0]}' (Aparece {most_common_word[1]} veces)\n")
    f.write(f"Letra más común: '{most_common_letter[0]}' (Aparece {most_common_letter[1]} veces)\n")

# Gráficos relevantes

# Frecuencia de frases por participante (Top 10 participantes)
top_10_participants = participant_phrase_count.head(10).sort_values(ascending=False)
plt.figure(figsize=(10, 5))
sns.barplot(x=top_10_participants.index, y=top_10_participants.values)
plt.xticks(rotation=90)
plt.title('Top 10 participantes con más frases')
plt.savefig(os.path.join(output_dir, 'top_participantes_frases.png'))

# Palabras más comunes
most_common_words = Counter(all_words).most_common(10)
plt.figure(figsize=(10, 5))
sns.barplot(x=[word[0] for word in most_common_words], y=[word[1] for word in most_common_words])
plt.xticks(rotation=90)
plt.title('Top 10 palabras más comunes')
plt.savefig(os.path.join(output_dir, 'top_palabras_comunes.png'))

# Letras más comunes
most_common_letters = Counter(all_letters).most_common(10)
plt.figure(figsize=(10, 5))
sns.barplot(x=[letter[0] for letter in most_common_letters], y=[letter[1] for letter in most_common_letters])
plt.title('Top 10 letras más comunes')
plt.savefig(os.path.join(output_dir, 'top_letras_comunes.png'))

# **Creación de la columna 'word_count' para la cantidad de palabras por frase**
if 'word_count' not in train_data.columns:
    train_data['word_count'] = train_data['phrase'].apply(lambda x: len(x.split()))

# Distribución de la cantidad de palabras por frase
plt.figure(figsize=(10, 5))
sns.histplot(train_data['word_count'], bins=20)
plt.title('Distribución de la cantidad de palabras por frase')
plt.xlabel('Cantidad de palabras por frase')  # Etiqueta corregida para el eje x
plt.ylabel('Cantidad de frases')  # Etiqueta corregida para el eje y
plt.savefig(os.path.join(output_dir, 'distribucion_palabras_por_frase.png'))

# Participantes únicos por frase (cuántos participantes hicieron cada frase)
participants_per_phrase = train_data.groupby('phrase')['participant_id'].nunique()
plt.figure(figsize=(10, 5))
sns.histplot(participants_per_phrase, bins=20)
plt.title('Distribución de participantes únicos por frase')
plt.xlabel('Número de participantes por frase')  # Etiqueta corregida
plt.ylabel('Cantidad de frases')  # Etiqueta corregida
plt.savefig(os.path.join(output_dir, 'distribucion_participantes_por_frase.png'))
