import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🌿 VedaBalance
        </Link>

        <div className="nav-links">
          {[
            { to: "/", label: "Home" },
            { to: "/test", label: "Prakriti Test" },
            { to: "/about", label: "About" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <Link to="/test" className="nav-btn">
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
