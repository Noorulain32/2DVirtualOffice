import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [adminID, setAdminID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!adminID || !password) {
      setError("All fields are required");
    } else {
      setError("");
      alert("Admin Login Successful");
      // Handle authentication logic here
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-teal-50">
      <div className="login-container">
        <h2 className="text-2xl font-bold text-teal-600 mb-4">Admin Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group mb-4">
            <label className="block text-teal-700">Admin Email</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={adminID}
              onChange={(e) => setAdminID(e.target.value)}
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
          <Link to="/employee-login" className="text-teal-600 hover:underline">
            Employee Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
