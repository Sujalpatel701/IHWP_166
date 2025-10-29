import React from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../components/Chat"; // Import Chat Component
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* 🌿 Hero Section */}
      <div className="hero">
        <h1>Find Your Natural Balance 🌿</h1>
        <p>
          Discover your <strong>Prakriti</strong> and bring harmony to your
          lifestyle with <strong>VedaBalance</strong>.
        </p>
      </div>

      {/* 💬 Chat Section */}
      <div className="chat-section">
        <Chat />
      </div>

      {/* 🌸 Footer */}
      <footer>
        © {new Date().getFullYear()} VedaBalance · Embrace Your Harmony 🌺
      </footer>
    </div>
  );
};

export default Home;
