"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [darkMode, setDarkMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate(); // ✅ must be declared before use

  useEffect(() => {
    const storedTheme = localStorage.getItem("edu-theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      navigate("/dashboard"); // ✅ update this if you have dashboard
    }, 2000);
  };

  const redirectToRegister = () => {
    navigate("/register"); // ✅ used in <span> click
  };

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    document.body.classList.toggle("dark-mode", newTheme);
    localStorage.setItem("edu-theme", newTheme ? "dark" : "light");
  };

  return (
    <div className={`register-bg ${darkMode ? "dark-mode" : ""}`}>
      <div className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? "☀️" : "🌙"}
      </div>

      {showPopup && <div className="success-popup">✅ Login Successful!</div>}

      <div className="form-glass">
        <h2>🔐 Login to School Management System</h2>
        <p>Access your account to continue</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="login-link">
          Don't have an account?{" "}
          <span onClick={redirectToRegister}>Register here</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
