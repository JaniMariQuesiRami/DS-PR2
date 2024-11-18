# Reconocimiento del Deletreo Manual en Lenguaje de Señas Americano

Este proyecto desarrolla un modelo de inteligencia artificial capaz de reconocer y traducir el deletreo manual del lenguaje de señas americano (ASL) a texto, contribuyendo a la accesibilidad tecnológica para personas sordas o con dificultades auditivas.

## Problema
El acceso limitado a herramientas de reconocimiento de lenguaje de señas crea barreras significativas para millones de personas. Este proyecto aborda este problema al entrenar modelos que interpretan gestos en texto con alta precisión.

## Objetivos
- **General:** Crear un modelo que reconozca y traduzca el deletreo manual de ASL a texto con alta precisión.
- **Específicos:**
  - Lograr una precisión mínima del 80% en la traducción.
  - Optimizar el tiempo de inferencia por gesto a menos de 300 ms.
  - Implementar preprocesamiento y aumentación de datos para mejorar la robustez.

## Modelos Evaluados
Se evaluaron tres arquitecturas principales:
- **Transformer:** Manejo de relaciones a largo plazo en secuencias.
- **Seq2Seq:** Transformación de secuencias de entrada a salida.
- **CTC:** Reconocimiento de secuencias con longitudes variables.

El modelo basado en CTC mostró los mejores resultados en precisión y generalización.

## Datos Utilizados
El conjunto de datos incluye coordenadas espaciales de landmarks extraídas de videos mediante MediaPipe Holistic, con información estructurada para identificar gestos de manos, cara y cuerpo.

## Tecnologías
- **Frontend:** React con diseño basado en Neumorphism.
- **Backend:** Flask, TensorFlow Lite, y PyTorch.
- **Herramientas:** Kaggle para manejo de datos, GitHub para control de versiones.

## Resultados
El modelo CTC logró identificar con precisión frases cortas y nombres, mientras que otros modelos como Transformer y Seq2Seq presentaron limitaciones con secuencias específicas.

## Futuras Mejoras
- Incorporar modelos avanzados como Transformers preentrenados (BERT, GPT).
- Implementar procesamiento en tiempo real para aplicaciones de video.
- Desplegar la solución en la nube para ampliar su alcance.

## Repositorio
El código fuente y documentación están disponibles en: [GitHub](https://github.com/JaniMariQuesiRami/DS-PR2)
