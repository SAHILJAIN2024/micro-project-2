import pandas as pd
import joblib
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

# Load the dataset
df = pd.read_csv("carbon_credit_projects_india.csv")
df = df.dropna()

# Define feature columns and target
feature_columns = [
    "area_hectares",
    "duration_years",
    "baseline_emissions",
    "expected_emission_reduction",
    "emission_factor"
]
target_column = "carbon_credits_generated"

X = df[feature_columns]
y = df[target_column]

# Split and train
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)

# Save the trained model
joblib.dump(model, "model.pkl")
print("✅ Model saved as model.pkl")
