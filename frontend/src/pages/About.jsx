import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-card">
        <h2>About VedaBalance</h2>
        <p>
          <span>VedaBalance</span> is your AI-powered companion for holistic
          well-being, blending the timeless wisdom of Ayurveda with modern
          technology.
          <br />
          <br />
          Discover your <strong>Prakriti</strong>, receive personalized diet and
          lifestyle recommendations, and stay balanced — physically, mentally,
          and spiritually.
        </p>
        <p className="quote">
          “Balance is not something you find, it’s something you create.” 🌺
        </p>
      </div>
    </div>
  );
};

export default About;
