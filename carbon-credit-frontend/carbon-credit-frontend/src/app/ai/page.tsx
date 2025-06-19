"use client";
import React, { useState } from "react";

export default function AIPredictor() {
  const [form, setForm] = useState({
    area_hectares: "",
    duration_years: "",
    baseline_emissions: "",
    expected_emission_reduction: "",
    location: "",
    emission_factor: "",
    project_type: "reforestation",
  });

  const [result, setResult] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/ai/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        area_hectares: parseFloat(form.area_hectares),
        duration_years: parseInt(form.duration_years),
        baseline_emissions: parseFloat(form.baseline_emissions),
        expected_emission_reduction: parseFloat(form.expected_emission_reduction),
        emission_factor: parseFloat(form.emission_factor),
      }),
    });

    const data = await res.json();
    setResult(data.predicted_carbon_credits ?? null);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>AI Carbon Credit Estimator</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input type="number" step="0.01" placeholder="Area (hectares)" value={form.area_hectares} onChange={(e) => setForm({ ...form, area_hectares: e.target.value })} required />
        <input type="number" placeholder="Duration (years)" value={form.duration_years} onChange={(e) => setForm({ ...form, duration_years: e.target.value })} required />
        <input type="number" step="0.01" placeholder="Baseline Emissions" value={form.baseline_emissions} onChange={(e) => setForm({ ...form, baseline_emissions: e.target.value })} required />
        <input type="number" step="0.01" placeholder="Expected Emission Reduction" value={form.expected_emission_reduction} onChange={(e) => setForm({ ...form, expected_emission_reduction: e.target.value })} required />
        <input type="number" step="0.01" placeholder="Emission Factor" value={form.emission_factor} onChange={(e) => setForm({ ...form, emission_factor: e.target.value })} required />
        <input type="text" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
        <select value={form.project_type} onChange={(e) => setForm({ ...form, project_type: e.target.value })}>
          <option value="reforestation">Reforestation</option>
          <option value="methane_capture">Methane Capture</option>
          <option value="electric_mobility">Electric Mobility</option>
        </select>
        <button type="submit" style={{ background: "#007bff", color: "white", padding: "0.5rem", border: "none", borderRadius: "6px" }}>
          Predict Carbon Credits
        </button>
      </form>

     {typeof result === "number" && !isNaN(result) && (
  <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
    Estimated Carbon Credits: {result.toFixed(2)} CRX
  </p>
)}

    </div>
  );
}
