from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import json

app = Flask(__name__)

# Cargar datos preprocesados específicos si los tienes
with open('preprocessed_seq2seq.json', 'r') as f:
    preprocessed_seq2seq = json.load(f)

with open('preprocessed_transformer.json', 'r') as f:
    preprocessed_transformer = json.load(f)

with open('preprocessed_ctc.json', 'r') as f:
    preprocessed_ctc = json.load(f)

def load_model(model_path):
    interpreter = tf.lite.Interpreter(model_path=model_path)
    interpreter.allocate_tensors()
    return interpreter

# Endpoint para el modelo Seq2Seq
@app.route('/seq2seq/predict', methods=['POST'])
def predict_seq2seq():
    data = request.json
    record_id = data.get('record_id')
    
    if record_id not in preprocessed_seq2seq:
        return jsonify({"error": "Invalid record ID"}), 400

    interpreter = load_model('./models/seq2seq/model.tflite')
    input_data = np.array(preprocessed_seq2seq[record_id]['features'], dtype=np.float32)
    
    return run_inference(interpreter, input_data)

# Endpoint para el modelo Transformer
@app.route('/transformer/predict', methods=['POST'])
def predict_transformer():
    data = request.json
    record_id = data.get('record_id')
    
    if record_id not in preprocessed_transformer:
        return jsonify({"error": "Invalid record ID"}), 400

    interpreter = load_model('./models/transformer/model.tflite')
    input_data = np.array(preprocessed_transformer[record_id]['features'], dtype=np.float32)
    
    return run_inference(interpreter, input_data)

# Endpoint para el modelo CTC
@app.route('/ctc/predict', methods=['POST'])
def predict_ctc():
    data = request.json
    record_id = data.get('record_id')
    
    if record_id not in preprocessed_ctc:
        return jsonify({"error": "Invalid record ID"}), 400

    interpreter = load_model('./models/ctc/model.tflite')
    input_data = np.array(preprocessed_ctc[record_id]['features'], dtype=np.float32)
    
    return run_inference(interpreter, input_data)

def run_inference(interpreter, input_data):
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()
    output_data = interpreter.get_tensor(output_details[0]['index'])

    return jsonify({"prediction": output_data.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
