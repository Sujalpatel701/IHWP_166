// src/pages/PrakritiTest.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PrakritiTest.css";

const PrakritiTest = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    skin: "",
    body: "",
    hair: "",
    mindset: "",
    memory: "",
    emotions: "",
    diet: "",
    sleep: "",
    energy: "",
    weather: "",
    stress: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/prakriti/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (data.analysis) {
        navigate("/result", { state: { result: data } });
      } else {
        alert("Error generating analysis.");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Failed to connect to backend.");
    }
  };

  const traitOptions = {
    skin: ["Dry", "Oily", "Balanced, oily"],
    body: ["Thin", "Muscular", "Heavier"],
    hair: ["Dry, thin", "Oily, thinning", "Thick, oily"],
    mindset: ["Restless", "Intense", "Calm"],
    memory: ["Forgetful", "Sharp", "Slow but long-term"],
    emotions: ["Anxious", "Angry", "Content"],
    diet: ["Warm, dry foods", "Cold, spicy", "Light, sweet"],
    sleep: ["Light", "Moderate", "Deep"],
    energy: ["Variable", "High in bursts", "Steady"],
    weather: ["Warm", "Cool", "Warm and dry"],
    stress: ["Anxious", "Irritable", "Calm"],
  };

  return (
    <div className="prakriti-form-container">
      <h1 className="title">🪷 VedaBalance Prakriti Test</h1>
      <form className="prakriti-form" onSubmit={handleSubmit}>
        <div className="section">
          <h3>🧘‍♀️ Personal Information</h3>
          <input name="name" placeholder="Full Name" onChange={handleChange} required />
          <input name="age" type="number" placeholder="Age" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
        </div>

        <div className="section">
          <h3>🌿 Trait Questions</h3>
          {Object.entries(traitOptions).map(([trait, options]) => (
            <div key={trait} className="trait-field">
              <label>{trait.charAt(0).toUpperCase() + trait.slice(1)}:</label>
              <select name={trait} onChange={handleChange} required>
                <option value="">Select...</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Analyzing..." : "Generate My Ayurvedic Profile"}
        </button>
      </form>
    </div>
  );
};

export default PrakritiTest;
