import React, { useState } from "react";
import { Link } from "react-router-dom";

const EmployeeLogin = () => {
  const [employeeID, setEmployeeID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!employeeID || !password) {
      setError("All fields are required");
    } else {
      setError("");
      alert("Employee Login Successful");
      // Handle authentication logic here
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-teal-50">
      <div className="login-container">
        <h2 className="text-2xl font-bold text-teal-600 mb-4">
          Employee Login
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group mb-4">
            <label className="block text-teal-700">Employee Email</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={employeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
            />
          </div>
          <div className="input-group mb-4">
            <label className="block text-teal-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          <Link to="/admin-login" className="text-teal-600 hover:underline">
            Admin Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default EmployeeLogin;
