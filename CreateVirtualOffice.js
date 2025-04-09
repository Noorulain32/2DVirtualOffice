import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateVirtualOffice = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState("modern");
  const [size, setSize] = useState("5-15");
  const [officeName, setOfficeName] = useState("");
  const [officeUrl, setOfficeUrl] = useState("");

  return (
    <div className="virtual-office-container">
      <div className="virtual-office-card">
        <h2 className="virtual-office-title">Create Virtual Office!</h2>

        <label className="virtual-office-label">Theme</label>
        <div className="virtual-office-options">
          <label className="virtual-office-radio">
            <input
              type="radio"
              name="theme"
              value="modern"
              checked={theme === "modern"}
              onChange={() => setTheme("modern")}
            />
            Modern
          </label>
          <label className="virtual-office-radio">
            <input
              type="radio"
              name="theme"
              value="casual"
              checked={theme === "casual"}
              onChange={() => setTheme("casual")}
            />
            Casual
          </label>
        </div>

        <label className="virtual-office-label">Size</label>
        <div className="virtual-office-options">
          {["5-15", "15-30", "30-50"].map((option) => (
            <label key={option} className="virtual-office-radio">
              <input
                type="radio"
                name="size"
                value={option}
                checked={size === option}
                onChange={() => setSize(option)}
              />
              {option}
            </label>
          ))}
        </div>

        <label className="virtual-office-label">Virtual Office Name:</label>
        <input
          type="text"
          className="virtual-office-input"
          value={officeName}
          onChange={(e) => setOfficeName(e.target.value)}
        />

        <label className="virtual-office-label">Virtual Office URL:</label>
        <input
          type="text"
          className="virtual-office-input"
          value={officeUrl}
          onChange={(e) => setOfficeUrl(e.target.value)}
        />

        <div className="virtual-office-buttons">
          <button
            className="virtual-office-btn"
            onClick={() => setShowModal(true)}
          >
            Add Employee Email
          </button>
          <button
            className="virtual-office-btn"
            onClick={() => navigate("/employee-joining")}
          >
            Continue
          </button>
        </div>
      </div>

      {showModal && <AddEmployeeModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

const AddEmployeeModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">Add Employee Email</h3>
        <button className="modal-close" onClick={onClose}>
          X
        </button>

        <label className="modal-label">Enter Employee Email:</label>
        <input
          type="email"
          className="modal-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="modal-label">Enter Employee URL:</label>
        <input
          type="text"
          className="modal-input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button className="modal-send-btn">Send URL</button>
      </div>
    </div>
  );
};

export default CreateVirtualOffice;
