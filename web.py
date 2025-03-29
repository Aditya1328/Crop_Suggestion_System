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
    try:
        data = request.get_json()
        input_data = np.array([[data["N"], data["P"], data["K"], data["temperature"],
                                data["humidity"], data["ph"], data["rainfall"]]])
        
        prediction = rfc.predict(input_data)
        decoded_prediction = le.inverse_transform(prediction)[0]

        return jsonify({"prediction": decoded_prediction})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    

if __name__ == '__main__':
    app.run(debug=True)