import React from "react";
import "./createspace.css";

function CreateSpace() {
  return (
    <div className="create-space">
      <div className="form-container">
        <h1>Name your Space</h1>

        <div className="form-group">
          <label>Space name</label>
          <input type="text" placeholder="Enter your space name" />
        </div>

        <div className="form-group">
          <label>URL</label>
          <div className="url-input">
            <span>www.spaceroom.com/</span>
            <input type="text" placeholder="yourspace" />
          </div>
        </div>

        <div className="form-group">
          <label>What is your primary goal for using spaceroom?</label>
          <select>
            <option>Faster communication</option>
            <option>Team collaboration</option>
            <option>Events and meetings</option>
            <option>Other</option>
          </select>
        </div>

        <div className="buttons">
          <button className="back-btn">Back</button>
          <button className="next-btn">Next: Create your Space</button>
        </div>
      </div>
    </div>
  );
}

export default CreateSpace;
