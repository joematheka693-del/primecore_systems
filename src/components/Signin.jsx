import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading("Accessing PrimeCore Systems...");

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post(
        "http://frostyghost23.alwaysdata.net/api/signin",
        formData
      );

      setLoading("");

      if (response.data.message === "User Loggged In successfully") {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.location.href = "/";
      }
      else {
        setError("Access Denied. Invalid credentials.");
      }
    } catch (err) {
      setLoading("");
      setError("System Error: Try again...");
    }
  };

  return (
    <div style={styles.page}>

      {/* CENTER AREA */}
      <div style={styles.centerWrap}>

        <div style={styles.card}>

          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Sign in to your PrimeCore dashboard</p>

          {loading && <div style={styles.info}>{loading}</div>}
          {success && <div style={styles.success}>{success}</div>}
          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handlesubmit}>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />

            <button type="submit" style={styles.button}>
              Enter System
            </button>
          </form>

          <p style={styles.footerText}>
            New here?{" "}
            <Link to="/signup" style={styles.link}>
              Create account
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
};

/* 🎨 STYLES */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f8fafc, #eef2ff)",
    fontFamily: "Inter, sans-serif",
  },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "18px 40px",
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid #e2e8f0",
    position: "sticky",
    top: 0,
  },

  logo: {
    textDecoration: "none",
    fontWeight: "700",
    color: "#2563eb",
  },

  navLinks: {
    display: "flex",
    gap: "10px",
  },

  navBtn: {
    background: "transparent",
    border: "1px solid #cbd5e1",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  navBtnPrimary: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
  },

  centerWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 80px)",
  },

  card: {
    width: "380px",
    background: "white",
    borderRadius: "18px",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0",
  },

  title: {
    textAlign: "center",
    fontSize: "22px",
    fontWeight: "800",
    color: "#0f172a",
  },

  subtitle: {
    textAlign: "center",
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "5px",
  },

  link: {
    color: "#2563eb",
    fontWeight: "600",
    textDecoration: "none",
  },

  footerText: {
    textAlign: "center",
    marginTop: "15px",
    fontSize: "13px",
    color: "#64748b",
  },

  info: {
    textAlign: "center",
    color: "#2563eb",
    fontSize: "13px",
    marginBottom: "10px",
  },

  success: {
    textAlign: "center",
    color: "green",
    fontSize: "13px",
    marginBottom: "10px",
  },

  error: {
    textAlign: "center",
    color: "red",
    fontSize: "13px",
    marginBottom: "10px",
  },
};

export default Signin;