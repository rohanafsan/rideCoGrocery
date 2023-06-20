import "./auth.css";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faLock } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  // State variables
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);

  // Check if the email entered is valid
  const isValidEmail = (value) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  // Handle form submission, login user and set cookies
  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();

    if (!isValidEmail(email) && email != "") {
      setError("Invalid email format");
      return;
    }

    if (email === "" || pass === "") {
      setError("Please fill in all fields");
      return;
    }

    const userInfo = {
      email: email,
      password: pass,
    };

    // Send request to backend to login user
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_HOST}/users/login`,
      {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      }
    );

    // Handle response from backend and show error/refresh page
    const data = await response.json();
    if (data.message) {
      setError(data.message);
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);
      window.location.href = "/";
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>Log in to you grocery account</h2>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <button
            type="submit"
            className="create-button"
            onClick={(e) => handleSubmit(e, "users/login")}
          >
            <FontAwesomeIcon icon={faLock} className="fa-Icon" />
            Log In
          </button>
          {error && <p>{error}</p>}
          <a href="/list">Don't have an account? Sign up.</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
