import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'

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

      if (response.data.user) {
        setSuccess("Access Granted. Redirecting...");

        // Store user
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect after short delay (better UX)
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError("Access Denied. Invalid credentials.");
      }

    } catch (err) {
      setLoading("");
      setError("System Error: Try again...");
    }
  };

  return (
    
    <div
      className="row justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0f1a, #1a1a2e, #000000)",
        color: "#fff",
      }}>

        {/* NAVBAR */}
      <nav className="d-flex justify-content-between p-4">
        <h3 style={{ color: '#ffffff', letterSpacing: '1px', }}>
          <a href="/"
          className='anchor'
          style={{
            color: "#00ffff"
          }}>
            PrimeCore Systems
            </a>
            </h3>
        <div>

          <button
            className="btn m-2"
            style={navBtn}
            onClick={() => navigate('/signin')}>
            Sign In
          </button>

          <button
            className="btn m-2"
            style={navBtn}
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>

          <button
            className="btn m-2"
            style={navBtn}
            onClick={() => navigate('/addproduct')}>
            Add Product
          </button>

        </div>
      </nav> 
        

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
          Access Your Gaming Hub
        </h5>

        {loading && <div className="alert alert-info">{loading}</div>}

        {success && <div className="alert alert-success">{success}</div>}

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handlesubmit}>
          <input
            type="email"
            placeholder="Email Address"
            className="form-control mb-3"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            className="form-control mb-3"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            Enter System
          </button>
        </form>

        <p className="text-center mt-3 text-light" style={{ fontSize: "14px" }}>
          New here?{" "}
          <Link to="/signup" style={{ color: "#00ffff" }}>
            Create Account
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

const navBtn = {
  background: 'transparent',
  border: '1px solid #e5e7eb',
  color: "#00ffff"
};


export default Signin;