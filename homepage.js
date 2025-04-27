import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleEnterSpace = () => {
    navigate("/create-space");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">SpaceRoom</div>
          <div className="nav-buttons">
            <button className="nav-btn" onClick={handleLogin}>
              Login
            </button>
            <button className="nav-btn signup-btn" onClick={handleSignup}>
              Signup
            </button>
          </div>
        </div>
      </nav>

      {/* Background Image */}
      <img
        className="background-img"
        src="/assets/officebg.jpg"
        alt="2D Virtual Space"
        onError={(e) => {
          e.target.style.display = "none";
          console.warn("Image not found");
        }}
      />

      {/* Main Content */}
      <div className="overlay">
        <h1 className="headline">
          Welcome to <span className="brand">SpaceRoom</span>
        </h1>
        <p className="tagline">
          A 2D virtual world where work, fun, and interaction collide.
        </p>

        <button onClick={handleEnterSpace} className="enter-btn">
          Enter Your Space
        </button>

        {/* Features Section */}
        <section className="features">
          <div className="feature">
            <h3>🚶 Move Freely</h3>
            <p>
              Navigate your avatar in real-time, just like in the real world.
            </p>
          </div>

          <div className="feature">
            <h3>💬 Real Conversations</h3>
            <p>
              Talk and interact based on proximity, just like in-person
              gatherings.
            </p>
          </div>

          <div className="feature">
            <h3>🛠️ Custom Spaces</h3>
            <p>Create your own rooms, events, or coworking floors in a snap.</p>
          </div>

          <div className="feature">
            <h3>📅 Host Events</h3>
            <p>Plan workshops, team building, and hangouts effortlessly.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          © 2025 SpaceRoom. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
