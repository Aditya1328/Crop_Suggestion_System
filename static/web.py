from flask import Flask, request, jsonify ,render_template
import numpy as np
import pickle

# Load the model and label encoder
with open('model.pkl', 'rb') as model_file:
    rfc = pickle.load(model_file)
with open('label_encoder.pkl', 'rb') as le_file:
    le = pickle.load(le_file)

app = Flask(__name__)
@app.route('/')
def home():
    return render_template("index.html")

@app.route('/predict', methods=['POST'])
def predict():
    # Get data from the frontend as JSON
    data = request.json
    N = data['N']
    P = data['P']
    K = data['K']
    temperature = data['temperature']
    humidity = data['humidity']
    ph = data['ph']
    rainfall = data['rainfall']

    # Create the feature array
    input_data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
    
    # Predict and decode the label
    pred = rfc.predict(input_data)
    decoded_pred = le.inverse_transform(pred)
    
    return jsonify({'prediction': decoded_pred[0]})

if __name__ == '__main__':
    app.run(debug=True)