import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-card">
        <h2>About VedaBalance</h2>
        <p>
          <span className="highlight">VedaBalance</span> is an AI-powered wellness
          companion designed to bring ancient Ayurvedic wisdom into modern life.
          It helps users discover their <strong>Prakriti</strong> (body-mind constitution),
          offering personalized diet, lifestyle, and balance guidance.
        </p>

        <p>
          This project was thoughtfully developed by{" "}
          <strong>Sujal Patel</strong> 🌿
          <br />
          <span className="details">
            Enrollment No: <strong>202203103510166</strong>
            <br />
            Branch: <strong>B.Tech Information Technology</strong>
            <br />
            Institute: <strong>AMTICS</strong>
          </span>
        </p>

        <p className="quote">
          “Balance is not something you find — it’s something you create.” 🌺
        </p>
      </div>
    </div>
  );
};

export default About;
