from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import joblib

app = FastAPI()

# Load the model
try:
    model = joblib.load("model.pkl")
    print(f"✅ Model loaded: {type(model)}")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

# Define the request schema
class InputFeatures(BaseModel):
    area_hectares: float
    duration_years: int
    baseline_emissions: float
    expected_emission_reduction: float
    location: str
    emission_factor: float
    project_type: str

# Encode project_type as integer
def encode_project_type(ptype: str) -> int:
    mapping = {'methane_capture': 0, 'reforestation': 1, 'electric_mobility': 2}
    return mapping.get(ptype.lower(), 0)

# Prediction endpoint
@app.post("/predict")
def predict(data: InputFeatures):
    try:
        if model is None:
            return {"error": "Model not loaded. Check model.pkl file."}

        # Construct feature array
        features = np.array([[ 
            data.area_hectares,
            data.duration_years,
            data.baseline_emissions,
            data.expected_emission_reduction,
            data.emission_factor,
            encode_project_type(data.project_type)
        ]])

        # Make prediction
        prediction = model.predict(features)

        return {"predicted_carbon_credits": float(prediction[0])}

    except Exception as e:
        print("❌ Internal Error:", str(e))
        return {"error": str(e)}
