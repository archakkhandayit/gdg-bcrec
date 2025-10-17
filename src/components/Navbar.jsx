import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Navbar.css";
import myLongLogo from "../assets/gdg_image.jpg";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Helper function to check active route
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <img src={myLongLogo} alt="GDGoC Logo" className="long-logo-image" />
      </div>

      {/* Hamburger button (for mobile) */}
      <button className="hamburger-menu-button" onClick={toggleMenu}>
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Nav Links */}
      <ul className={`navbar-links ${isMenuOpen ? "open z-10" : ""}`}>
        <li className={`navbar-link ${isActive("/") ? "active" : ""}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
        </li>

        <li className={`navbar-link ${isActive("/leaderboard") ? "active" : ""}`}>
          <Link to="/leaderboard" onClick={() => setIsMenuOpen(false)}>
            Leaderboard
          </Link>
        </li>

        <li className={`navbar-link ${isActive("/about") ? "active" : ""}`}>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
