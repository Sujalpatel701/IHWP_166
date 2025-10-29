// src/pages/ResultPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResultPage.css";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result } = location.state || {};

  if (!result) {
    return (
      <div className="result-container">
        <h2>No result found 😔</h2>
        <button onClick={() => navigate("/test")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="result-container">
      <h1>🌼 Your Ayurvedic Reflection</h1>
      <h3 className="constitution">
        Primary Constitution: <span>{result.constitution}</span>
      </h3>
      <div className="ai-analysis">{result.analysis}</div>

      <button className="back-btn" onClick={() => navigate("/test")}>
        Take Test Again
      </button>
    </div>
  );
};

export default ResultPage;
