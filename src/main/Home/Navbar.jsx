import React, { useState } from "react";
import { FaBars } from "react-icons/fa"; // Assuming you're using react-icons for the burger icon
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigate = useNavigate();

  return (
    <nav className="navbar" style={{ zIndex: 3 }}>
      <div className="navbar-left">
        <h4>Project</h4>
      </div>
      <div className="navbar-right">
        <ul className="nav-items" style={{ marginRight: 24 }}>
          <li className="nav-item" onClick={() => navigate("/")}>
            Home
          </li>
          <li className="nav-item" onClick={() => navigate("/coinlist")}>
            All Tokens
          </li>
          <li className="nav-item" onClick={() => navigate("/all")}>
            All Tokens Predictions
          </li>
          <li className="nav-item" onClick={() => navigate("/validator")}>
            Fraud Check Wallet address
          </li>
        </ul>

        <div className="menu-toggle" onClick={toggleMobileMenu}>
          <FaBars />
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav-items">
            <li className="nav-item" onClick={() => navigate("/")}>
              Home
            </li>
            <li className="nav-item" onClick={() => navigate("/coinlist")}>
              All Tokens
            </li>
            <li className="nav-item" onClick={() => navigate("/all")}>
              All Tokens Predictions
            </li>
            <li className="nav-item" onClick={() => navigate("/validator")}>
              Fraud Check Wallet address
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
