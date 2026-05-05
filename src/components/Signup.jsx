import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Creating your PrimeCore account...");

    try {
      const formdata = new FormData();
      formdata.append("username", username);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("phone", phone);

      const response = await axios.post(
        "http://frostyghost23.alwaysdata.net/api/signup",
        formdata
      );

      setLoading("");
      setSuccess(response.data.message);

      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");

      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      setLoading("");
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div style={styles.page}>

      {/* CARD */}
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join the PrimeCore gaming ecosystem</p>

          {loading && <div style={styles.info}>{loading}</div>}
          {success && <div style={styles.success}>{success}</div>}
          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              style={styles.input}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              style={styles.input}
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              style={styles.input}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              style={styles.input}
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <button type="submit" style={styles.button}>
              Initialize Account
            </button>
          </form>

          <p style={styles.bottomText}>
            Already have an account?{" "}
            <Link to="/signin" style={styles.link}>
              Sign In
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
    background: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid #e2e8f0",
    position: "sticky",
    top: 0,
  },

  logo: {
    textDecoration: "none",
    fontWeight: "800",
    color: "#2563eb",
    fontSize: "18px",
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

  navBtnActive: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "60px",
  },

  card: {
    width: "420px",
    background: "white",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
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
    background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
    border: "none",
    color: "white",
    borderRadius: "10px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "5px",
  },

  bottomText: {
    textAlign: "center",
    marginTop: "15px",
    fontSize: "13px",
  },

  link: {
    color: "#2563eb",
    fontWeight: "600",
    textDecoration: "none",
  },

  info: {
    background: "#e0f2fe",
    color: "#0369a1",
    padding: "8px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "10px",
    textAlign: "center",
  },

  success: {
    background: "#dcfce7",
    color: "#166534",
    padding: "8px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "10px",
    textAlign: "center",
  },

  error: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "8px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "10px",
    textAlign: "center",
  },
};

export default Signup;