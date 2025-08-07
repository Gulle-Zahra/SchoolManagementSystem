"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      navigate("/login"); // ✅ redirect to login after registration
    }, 2000);
  };

  const redirectToLogin = () => {
    navigate("/login"); // ✅ used in <span> click
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

      {showPopup && (
        <div className="success-popup">🎉 Registered Successfully!</div>
      )}

      <div className="form-glass">
        <h2>📘 Welcome to School Management System</h2>
        <p>Create your account to get started</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p className="login-link">
          Already have an account?{" "}
          <span onClick={redirectToLogin}>Login here</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
