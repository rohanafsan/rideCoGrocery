import "./auth.css";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const AuthComponent = () => {
  // State variables
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const [confirmPass, setConfirmPass] = useState("");

  // Check if the email entered is valid
  const isValidEmail = (value) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  // Handle form submission
  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();

    if (!isValidEmail(email) && email != "") {
      setError("Invalid email format");
      return;
    }

    if (pass !== confirmPass) {
      // Setting error message
      setError("Passwords do not match");
      return;
    } else {
      console.log("Register");
      console.log(name, email, pass);
    }

    if (email === "" || pass === "") {
      setError("Please fill in all fields");
      return;
    }

    // Send request to backend tp create a new user
    const response = await fetch(`http://localhost:8000/users/register`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, pass }),
    });

    // Handle response from backend and refresh page
    const data = await response.json();
    if (data.message) {
      setError(data.message);
    } else {
      console.log(data);
      // refresh to specific page
      window.location.href = "/login";
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>Create a grocery account</h2>
          <input
            type="email"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
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

          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPass(e.target.value)}
            required
          />

          <button
            type="submit"
            className="create-button"
            onClick={(e) => handleSubmit(e, "users/register")}
          >
            <FontAwesomeIcon icon={faLock} className="fa-Icon" />
            Create Account
          </button>
          {error && <p>{error}</p>}
          <a href="/login">Already have an account? Log in.</a>
        </form>
      </div>
    </div>
  );
};

export default AuthComponent;
