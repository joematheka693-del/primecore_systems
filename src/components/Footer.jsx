import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import "../App.css";
import React, { useState } from "react";
import axios from "axios";


const Footer = () => {

const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [error, setError] = useState("");

const handleSubscribe = async (e) => {
  e.preventDefault();
  setMessage("");
  setError("");

  try {
    const formData = new FormData();
    formData.append("email", email);

    const response = await axios.post(
      "https://frostyghost23.alwaysdata.net/api/newsletter",
      formData
    );

    setMessage(response.data.message);
    setEmail("");
  } catch (err) {
    setError(err.response?.data?.message || "Subscription failed");
  }
};

React.useEffect(() => {
  if (!message) return;

  const timeout = setTimeout(() => {
    setMessage("");
  }, 4000);

  return () => clearTimeout(timeout);
}, [message]);

  return (
    <footer style={styles.footer}>

      <div style={styles.container}>

        {/* BRAND */}
        <div>
          <h3 style={styles.brand}>PrimeCore Systems</h3>
          <p style={styles.text}>
            Building elite gaming PCs, setups, and immersive digital experiences.
          </p>

          <div style={styles.socials}>
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
            <FaGithub />
          </div>
        </div>

        {/* LINKS */}
        <div>
          <h4>Products</h4>
          <p>Custom PCs</p>
          <p>Gaming Setups</p>
          <p>Room Design</p>
        </div>

        <div>
          <h4>Company</h4>
          <p>About</p>
          <p>Careers</p>
          <p>Contact</p>
        </div>

        <div>
          <h4>Support</h4>
          <p>Help Center</p>
          <p>FAQs</p>
          <p>Live Chat</p>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 style={styles.footerTitle}>Newsletter</h3>

          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.emailInput}
              required
            />

            <button type="submit" style={styles.subscribeBtn}>
              Subscribe
            </button>
          </form>

          {message && <p style={styles.successMsg}>{message}</p>}
          {error && <p style={styles.errorMsg}>{error}</p>}

          {message && (
            <p style={styles.message}>
              {message}
            </p>
          )}
        </div>

      </div>

      <div style={styles.bottom}>
        © {new Date().getFullYear()} PrimeCore Systems
      </div>

    </footer>
  );
};



const styles = {
  footer: {
    background: "#0f172a",
    color: "#fff",
    padding: "60px 20px",
    marginTop: "60px"
  },

  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "30px",
    maxWidth: "1100px",
    margin: "0 auto"
  },

  brand: {
    color: "#2563eb"
  },

  text: {
    color: "#cbd5e1",
    fontSize: "14px"
  },

  socials: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
    fontSize: "18px",
    cursor: "pointer"
  },

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    marginTop: "10px"
  },

  button: {
    width: "100%",
    marginTop: "10px",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "white"
  },

  bottom: {
    textAlign: "center",
    marginTop: "40px",
    color: "#94a3b8",
    fontSize: "13px"
  },

  emailInput: {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #334155",
  outline: "none",
  marginBottom: "12px",
  fontWeight: "600",
},

subscribeBtn: {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(135deg, #2563eb, #38bdf8)",
  color: "white",
  fontWeight: "900",
  cursor: "pointer",
  boxShadow: "0 12px 30px rgba(37,99,235,0.35)",
},

message: {
  marginTop: "12px",
  background: "rgba(37,99,235,0.15)",
  color: "#93c5fd",
  padding: "10px 12px",
  borderRadius: "12px",
  fontWeight: "800",
  fontSize: "14px",
},

successMsg: {
  marginTop: "10px",
  color: "#86efac",
  fontWeight: "800",
},

errorMsg: {
  marginTop: "10px",
  color: "#fca5a5",
  fontWeight: "800",
},
};



export default Footer;