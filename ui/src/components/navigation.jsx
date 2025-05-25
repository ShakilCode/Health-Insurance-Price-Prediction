import React, { useState } from "react";

export const Navigation = () => {
  // for the mob size
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav id="custom-menu" className="custom-navbar">
      <div className="custom-container">
        <div className="custom-navbar-header">
          {/* Toggle Button */}
          <button
            type="button"
            className={`custom-navbar-toggle ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="custom-bar"></span>
            <span className="custom-bar"></span>
            <span className="custom-bar"></span>
          </button>

          {/* Navbar Brand */}
          <a className="custom-navbar-brand" href="#home">
            MHIPP
          </a>
        </div>

        {/* Navbar Links */}
        <div className={`custom-navbar-collapse ${menuOpen ? "active" : ""}`}>
          <ul className="custom-nav">
            <li><a href="#features" className="custom-link">Features</a></li>
            <li><a href="#about" className="custom-link">About</a></li>
            <li><a href="#services" className="custom-link">Services</a></li>
            <li><a href="#portfolio" className="custom-link">Prediction</a></li>
            <li><a href="#testimonials" className="custom-link">Testimonials</a></li>
            <li><a href="#feedback" className="custom-link">Feedback</a></li>
            <li><a href="#contact" className="custom-link">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
