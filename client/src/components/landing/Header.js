import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import "./header.css";

const HeaderBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    if (cookies.AuthToken) {
      setIsLoggedIn(true);
    }
  }, [cookies]);

  // Handle logout
  const handleLogout = () => {
    removeCookie("AuthToken");
    removeCookie("Email");
    setIsLoggedIn(false);

    // Redirect to login page
    window.location.href = "/";
  };

  // Toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header-bar">
      <div className="logo-and-title">
        <h1 className="title">RideCo-Grocery</h1>
      </div>
      <div className="login-register-buttons">
        <span className="clickable-text">
          <a href="/mylists" className="clickable-text">
            My lists
          </a>
        </span>
        <span className="clickable-text">
          <a href="/sharedlists" className="clickable-text">
            Shared lists
          </a>
        </span>
        {isLoggedIn ? (
          <>
            <span className="clickable-text" onClick={handleLogout}>
              Logout
            </span>
          </>
        ) : (
          <>
            <span className="clickable-text">
              <a href="/login" className="clickable-text">
                Login
              </a>
            </span>
            <span className="clickable-text">
              <a href="/register" className="clickable-text">
                Register
              </a>
            </span>
          </>
        )}
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <span>&#9776;</span>
      </div>
      {isMenuOpen && (
        <div className="menu-expanded">
          <span className="clickable-text">
            <a href="/mylists" className="clickable-text">
              My lists
            </a>
          </span>
          <span className="clickable-text">
            <a href="/sharedlists" className="clickable-text">
              Shared lists
            </a>
          </span>
          {isLoggedIn ? (
            <span className="clickable-text" onClick={handleLogout}>
              Logout
            </span>
          ) : (
            <>
              <span className="clickable-text">Login</span>
              <span className="clickable-text">Register</span>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default HeaderBar;
