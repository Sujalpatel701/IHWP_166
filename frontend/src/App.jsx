import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    sleep_pattern: "",
    appetite: "",
    energy_levels: "",
    stress_handling: "",
    body_type: "",
    preferences: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await axios.post("http://127.0.0.1:8000/analyze_prakriti", formData);
      setResult(res.data.prakriti_report || res.data);
    } catch (err) {
      console.error(err);
      setError("Error fetching Prakriti analysis. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">🕉️ Ayurvedic Prakriti Analyzer</h1>
      <form className="form" onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label>{key.replace("_", " ").toUpperCase()}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Prakriti"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result-card">
          <h2>Your Prakriti Analysis</h2>
          {typeof result === "string" ? (
            <p>{result}</p>
          ) : (
            <>
              <h3>Type: {result.prakriti_type}</h3>
              <p>{result.summary}</p>

              <h4>🍽️ Diet Recommendations</h4>
              <p><strong>Favorable Foods:</strong> {result.diet_recommendations?.favorable_foods.join(", ")}</p>
              <p><strong>To Avoid:</strong> {result.diet_recommendations?.to_avoid.join(", ")}</p>

              <h4>🕰️ Daily Routine</h4>
              <ul>
                {Object.entries(result.daily_routine || {}).map(([key, val]) => (
                  <li key={key}><strong>{key.replace("_", " ")}:</strong> {val}</li>
                ))}
              </ul>

              <h4>🌿 Lifestyle Tips</h4>
              <ul>
                {result.lifestyle_tips?.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
