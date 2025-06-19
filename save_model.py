from sklearn.ensemble import RandomForestRegressor
import numpy as np
import joblib

# Sample training data
X = np.array([
    [100, 5, 500, 150, 0.9, 1],
    [200, 10, 800, 300, 1.1, 2],
    [150, 7, 600, 200, 1.0, 0]
])
y = np.array([1200, 2500, 1800])

# Train model
model = RandomForestRegressor()
model.fit(X, y)

# Save the model correctly
joblib.dump(model, "model.pkl")
print("✅ New sklearn model saved!")
