import axios from "axios";
import React, { useState } from "react";
import SideSlider from "./SideSlider";

const Services = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState("Custom PC Build");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleQuote = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("username", user?.username || "Guest");
      formData.append("email", user?.email || "guest@gmail.com");
      formData.append("phone", phone);
      formData.append("service_type", serviceType);
      formData.append("budget", budget);
      formData.append("description", description);

      const response = await axios.post(
        "https://frostyghost23.alwaysdata.net/api/request_quote",
        formData
      );

      setMessage(response.data.message);
      setPhone("");
      setServiceType("Custom PC Build");
      setBudget("");
      setDescription("");
    } catch (err) {
      setError(err.response?.data?.message || "Quote request failed");
    }
  };

  return (
    <div style={styles.page}>
      <SideSlider onToggle={setSidebarOpen} />

      <main
        style={{
          ...styles.main,
          marginLeft: sidebarOpen ? "250px" : "78px",
        }}
      >
        <section style={styles.hero}>
          <p style={styles.badge}>PrimeCore Services</p>
          <h1 style={styles.title}>Request a Custom Quote</h1>
          <p style={styles.subtitle}>
            Need a custom PC build, setup, installation, optimization, or tech solution?
            Tell us what you need and we’ll prepare a quote.
          </p>
        </section>

        <section style={styles.layout}>
          <div style={styles.infoCard}>
            <h2>Available Services</h2>

            <div style={styles.serviceGrid}>
              <div style={styles.service}>🖥️ Custom PC Build</div>
              <div style={styles.service}>🎮 Gaming Setup</div>
              <div style={styles.service}>🪟 Windows Installation</div>
              <div style={styles.service}>🚀 Performance Tuning</div>
              <div style={styles.service}>🔐 Security Setup</div>
              <div style={styles.service}>🌐 Network Setup</div>
              <div style={styles.service}>📦 Office Setup</div>
              <div style={styles.service}>🎥 Streaming Setup</div>
            </div>

            <div style={styles.notice}>
              <strong>How quotes work:</strong>
              <p>
                Submit your request → Admin reviews → Status updates → We contact you
                with pricing and next steps.
              </p>
            </div>
          </div>

          <form style={styles.formCard} onSubmit={handleQuote}>
            <h2>Quote Request Form</h2>

            {message && <p style={styles.success}>{message}</p>}
            {error && <p style={styles.error}>{error}</p>}

            <label style={styles.label}>Phone Number</label>
            <input
              style={styles.input}
              placeholder="254XXXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <label style={styles.label}>Service Type</label>
            <select
              style={styles.input}
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            >
              <option>Custom PC Build</option>
              <option>Gaming PC Consultation</option>
              <option>Windows Installation</option>
              <option>Driver Installation</option>
              <option>Office Setup</option>
              <option>Network Setup</option>
              <option>Streaming Setup</option>
              <option>Performance Optimization</option>
              <option>Other</option>
            </select>

            <label style={styles.label}>Estimated Budget</label>
            <input
              style={styles.input}
              placeholder="Example: KES 80,000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />

            <label style={styles.label}>Describe what you need</label>
            <textarea
              style={styles.textarea}
              placeholder="Example: I need a gaming PC for Fortnite, Valorant and editing..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <button style={styles.submitBtn} type="submit">
              Request Quote
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, rgba(37,99,235,0.14), transparent 35%), linear-gradient(180deg, #f8fafc, #eef2ff)",
    fontFamily: "Inter, sans-serif",
  },

  main: {
    transition: "0.3s ease",
    paddingBottom: "70px",
  },

  hero: {
    textAlign: "center",
    padding: "55px 20px 30px",
  },

  badge: {
    display: "inline-block",
    padding: "8px 16px",
    borderRadius: "999px",
    background: "#dbeafe",
    color: "#2563eb",
    fontWeight: "900",
  },

  title: {
    fontSize: "46px",
    margin: "14px 0 8px",
    color: "#0f172a",
    fontWeight: "950",
  },

  subtitle: {
    color: "#64748b",
    maxWidth: "700px",
    margin: "0 auto",
  },

  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "22px",
  },

  infoCard: {
    background: "rgba(255,255,255,0.9)",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 25px 70px rgba(15,23,42,0.1)",
    border: "1px solid rgba(226,232,240,0.9)",
  },

  serviceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
    marginTop: "16px",
  },

  service: {
    background: "#f8fafc",
    padding: "14px",
    borderRadius: "16px",
    fontWeight: "900",
    color: "#0f172a",
    border: "1px solid #e2e8f0",
  },

  notice: {
    marginTop: "20px",
    background: "#dbeafe",
    color: "#1e40af",
    padding: "16px",
    borderRadius: "18px",
    fontWeight: "700",
  },

  formCard: {
    background: "rgba(255,255,255,0.92)",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 25px 70px rgba(15,23,42,0.1)",
    border: "1px solid rgba(226,232,240,0.9)",
  },

  label: {
    display: "block",
    fontWeight: "900",
    color: "#0f172a",
    marginBottom: "8px",
  },

  input: {
    width: "100%",
    padding: "13px 14px",
    marginBottom: "15px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontWeight: "700",
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "13px 14px",
    marginBottom: "15px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontWeight: "700",
    resize: "vertical",
  },

  submitBtn: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #2563eb, #0f172a)",
    color: "white",
    cursor: "pointer",
    fontWeight: "950",
    boxShadow: "0 18px 40px rgba(37,99,235,0.35)",
  },

  success: {
    background: "#dcfce7",
    color: "#16a34a",
    padding: "12px",
    borderRadius: "14px",
    fontWeight: "900",
  },

  error: {
    background: "#fee2e2",
    color: "#dc2626",
    padding: "12px",
    borderRadius: "14px",
    fontWeight: "900",
  },
};

export default Services;