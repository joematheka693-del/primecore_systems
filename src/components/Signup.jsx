import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate(); // 👈 initialize navigate

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Initializing PrimeCore Systems...");

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

      // Clear inputs
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");

      // 👇 Redirect after short delay (optional for UX)
      setTimeout(() => {
        navigate("/"); // redirect to home page
      }, 2000);

    } catch (err) {
      setLoading("");
      setError("System Error: " + err.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0f1a, #1a1a2e, #000000)",
        color: "#fff",
      }}
    >
      <div
        className="card p-4 col-md-8"
        style={{
          background: "rgba(20, 20, 40, 0.9)",
          borderRadius: "15px",
          boxShadow: "0 0 25px rgba(0,255,255,0.2)",
          border: "1px solid rgba(0,255,255,0.2)",
        }}
      >
        <h2 className="text-center mb-3" style={{ color: "#00ffff" }}>
          PrimeCore Systems
        </h2>
        <h5 className="text-center mb-4" style={{ color: "#aaa" }}>
          Create Your Gaming Identity
        </h5>

        {loading && <div className="alert alert-info">{loading}</div>}

        {success && <div className="alert alert-success">{success}</div>}

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="form-control mb-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="email"
            placeholder="Email Address"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Phone Number"
            className="form-control mb-3"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            className="btn w-100"
            style={{
              background: "linear-gradient(90deg, #00ffff, #00ffcc)",
              border: "none",
              color: "#000",
              fontWeight: "bold",
              boxShadow: "0 0 10px #00ffff",
            }}
          >
            Initialize Account
          </button>
        </form>

        <p className="text-center mt-3" style={{ fontSize: "14px" }}>
          Already registered?{' '}
          <Link to="/signin" style={{ color: "#00ffff" }}>
            Access System
          </Link>
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  background: "transparent",
  border: "1px solid rgba(0,255,255,0.3)",
  color: "#fff",
};

export default Signup;