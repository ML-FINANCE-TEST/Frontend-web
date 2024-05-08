import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
          <li className="nav-item" onClick={() => navigate("/fear")}>
            Fear and Greed
          </li>
          <li className="nav-item" onClick={() => navigate("/exchange")}>
            Exchange Rates
          </li>
          <li className="nav-item" onClick={() => navigate("/converter")}>
            Currency Converter
          </li>
          <li className="nav-item" onClick={() => navigate("/crypto")}>
            Crypto
          </li>
          <li className="nav-item" onClick={() => navigate("/etf")}>
            ETFs
          </li>
          <li className="nav-item" onClick={() => navigate("/mf")}>
            Mutual Funds
          </li>
          <li className="nav-item" onClick={() => navigate("/indices")}>
            Indices
          </li>
          <li className="nav-item" onClick={() => navigate("/metals")}>
            Metals
          </li>
        </ul>

        <div className="menu-toggle" onClick={toggleMobileMenu}>
          <FaBars />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu" style={{ overflowY: "scroll" }}>
          <ul
            className="mobile-nav-items"
            style={{ maxHeight: "90vh", overflowY: "auto" }}
          >
            <li className="nav-item" onClick={() => navigate("/")}>
              Home
            </li>
            <li className="nav-item" onClick={() => navigate("/coinlist")}>
              All Tokens
            </li>
            <li className="nav-item" onClick={() => navigate("/all")}>
              All Tokens Predictions
            </li>
            <li className="nav-item" onClick={() => navigate("/fear")}>
              Fear and Greed
            </li>
            <li className="nav-item" onClick={() => navigate("/exchange")}>
              Exchange Rates
            </li>
            <li className="nav-item" onClick={() => navigate("/converter")}>
              Currency Converter
            </li>
            <li className="nav-item" onClick={() => navigate("/crypto")}>
              Crypto
            </li>
            <li className="nav-item" onClick={() => navigate("/etf")}>
              ETFs
            </li>
            <li className="nav-item" onClick={() => navigate("/mf")}>
              Mutual Funds
            </li>
            <li className="nav-item" onClick={() => navigate("/indices")}>
              Indices
            </li>
            <li className="nav-item" onClick={() => navigate("/metals")}>
              Metals
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
