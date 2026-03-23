import React from "react";
import '../App.css'
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        background: "#0a0a0a",
        color: "#00f7ff",
        padding: "50px 20px",
        borderTop: "1px solid #00f7ff",
        boxShadow: "0 -2px 20px rgba(0, 247, 255, 0.3)",
      }}
    >
      <div className="container">
        <div className="row text-start">

          {/* Column 1 - Company Info */}
          <div className="col-md-4 mb-4">
            <h4 style={{ letterSpacing: "2px" }}>⚡ FUTURE TECH</h4>
            <p style={{ color: "#ccc" }}>
              We build cutting-edge digital solutions designed for the future.
              Our mission is to empower businesses through innovation,
              creativity, and advanced technology.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="col-md-4 mb-4">
            <h5>Quick Links</h5>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li><a href="/" style={linkStyle}>Home</a></li>
              <li><a href="/products" style={linkStyle}>Products</a></li>
              <li><a href="/signup" style={linkStyle}>Sign Up</a></li>
              <li><a href="/signin" style={linkStyle}>Sign In</a></li>
            </ul>
          </div>

          {/* Column 3 - Contact & Social */}
          <div className="col-md-4 mb-4">
            <h5>Contact Us</h5>
            <p style={{ color: "#ccc" }}>Email: support@futuretech.com</p>
            <p style={{ color: "#ccc" }}>Phone: +254 725 984 679</p>

            <div style={{ fontSize: "22px", marginTop: "10px" }}>
              <a href="https://web.facebook.com/?_rdc=1&_rdr#" style={iconStyle}><FaFacebook /></a>
              <a href="https://x.com/" style={iconStyle}><FaTwitter /></a>
              <a href="https://www.instagram.com/" style={iconStyle}><FaInstagram /></a>
              <a href="https://github.com/" style={iconStyle}><FaGithub /></a>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <hr style={{ borderColor: "#00f7ff" }} />

        <div style={{ textAlign: "center", color: "#777" }}>
          © {new Date().getFullYear()} Future Tech. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const iconStyle = {
  color: "#00f7ff",
  marginRight: "15px",
  transition: "0.3s",
};

const linkStyle = {
  color: "#ccc",
  textDecoration: "none",
  display: "block",
  marginBottom: "8px",
};

export default Footer;