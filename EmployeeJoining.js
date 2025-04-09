import React, { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import "./index.css";

const EmployeeJoining = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="employee-joining-container">
      <div className="employee-joining-card">
        <div className="employee-header">
          <span className="employee-title">Employee Joining Interface</span>
          <div className="employee-login">
            Login / Signup <FaUserFriends />
          </div>
        </div>

        <h2 className="employee-welcome">Welcome to Virtual Office!</h2>
        <p className="employee-subtitle">
          <strong>Enter your Data:</strong>
        </p>

        <label className="employee-label">Name:</label>
        <input
          type="text"
          className="employee-input"
          placeholder="Enter your name"
        />

        <label className="employee-label">Role:</label>
        <input
          type="text"
          className="employee-input"
          placeholder="Enter your role"
        />

        <label className="employee-label">Upload your image:</label>
        <div className="employee-upload">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
          />
          {image && <img src={image} alt="Preview" className="image-preview" />}
        </div>

        <button className="employee-button">Continue</button>
      </div>
    </div>
  );
};

export default EmployeeJoining;
