from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import json
import time
from flask_cors import CORS  

app = Flask(__name__)
CORS(app)


with open('./models/data/preprocessed_seq2seq.json', 'r') as f:
    preprocessed_seq2seq = json.load(f)

with open('./models/data/preprocessed_transformer.json', 'r') as f:
    preprocessed_transformer = json.load(f)

with open('./models/data/preprocessed_ctc.json', 'r') as f:
    preprocessed_ctc = json.load(f)

def load_model(model_path):
    interpreter = tf.lite.Interpreter(model_path=model_path)
    interpreter.allocate_tensors()
    return interpreter

@app.route('/<model>/predict', methods=['POST'])
def predict(model):
    print(f"Making prediction for model: {model}")
    try:
        data = request.json
        record_id = data.get('record_id')
        phrase = data.get('phrase')
        
        if model == 'seq2seq':
            preprocessed_data = preprocessed_seq2seq
            model_path = './models/seq2seq/model.tflite'
            accuracy = 0.76
        elif model == 'transformer':
            preprocessed_data = preprocessed_transformer
            model_path = './models/transformer/model.tflite'
            accuracy = 0.43
        elif model == 'ctc':
            preprocessed_data = preprocessed_ctc
            model_path = './models/ctc/model.tflite'
            accuracy = 0.93
        else:
            return jsonify({"error": "Invalid model"}), 400
        
        if record_id not in preprocessed_data:
            raise ValueError("Invalid record ID")
        
        interpreter = load_model(model_path)
        input_data = np.array(preprocessed_data[record_id]['features'], dtype=np.float32)
        
        return run_inference(interpreter, input_data)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

def run_inference(interpreter, input_data):
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()
    output_data = interpreter.get_tensor(output_details[0]['index'])

    return jsonify({"prediction": output_data.tolist()})


if __name__ == '__main__':
    print("🧠 magical ASL recognition models running!")
    app.run(debug=True)
