import React from "react";
import "./landing.css";
import { Link } from "react-router-dom";

import background from "../../img/background.jpg";
import { useCookies } from "react-cookie";

// Simple landing page with background image and buttons redirecting users to login or signup
const Landing = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const email = cookies.Email;

  return (
    <div
      className="landing-page"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="landing-content">
        <h1 className="landing-title">
          All your grocery list needs, in one place.
        </h1>
        <div className="landing-buttons">
          <Link to="/mylists" className="landing-button">
            Start listing
          </Link>
          {!email && !authToken && (
            <Link to="/signup" className="landing-button">
              Sign up to start sharing
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
