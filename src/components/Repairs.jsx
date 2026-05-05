import axios from "axios";
import React, { useState } from "react";
import SideSlider from "./SideSlider";

const Repairs = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [phone, setPhone] = useState("");
  const [deviceType, setDeviceType] = useState("Gaming PC");
  const [issueType, setIssueType] = useState("Diagnostics");
  const [preferredDate, setPreferredDate] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("username", user?.username || "Guest");
      formData.append("email", user?.email || "guest@gmail.com");
      formData.append("phone", phone);
      formData.append("device_type", deviceType);
      formData.append("issue_type", issueType);
      formData.append("preferred_date", preferredDate);
      formData.append("description", description);

      const response = await axios.post(
        "https://frostyghost23.alwaysdata.net/api/book_repair",
        formData
      );

      setMessage(response.data.message);
      setPhone("");
      setDeviceType("Gaming PC");
      setIssueType("Diagnostics");
      setPreferredDate("");
      setDescription("");
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
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
          <p style={styles.badge}>PrimeCore Repair Center</p>
          <h1 style={styles.title}>Book a PC Repair</h1>
          <p style={styles.subtitle}>
            Diagnostics, cleaning, upgrades, troubleshooting, OS installation,
            and hardware repair.
          </p>
        </section>

        <section style={styles.layout}>
          <div style={styles.infoCard}>
            <h2>What we fix</h2>

            <div style={styles.serviceGrid}>
              <div style={styles.service}>🧪 Diagnostics</div>
              <div style={styles.service}>🧹 Cleaning</div>
              <div style={styles.service}>💾 SSD/RAM Upgrade</div>
              <div style={styles.service}>🪟 Windows Install</div>
              <div style={styles.service}>🔥 Overheating Fix</div>
              <div style={styles.service}>⚡ Power Issues</div>
              <div style={styles.service}>🎮 Gaming Performance</div>
              <div style={styles.service}>🌐 WiFi/Network Fix</div>
            </div>

            <div style={styles.notice}>
              <strong>How it works:</strong>
              <p>Submit your issue → Admin reviews → Status updates in dashboard → Repair begins.</p>
            </div>
          </div>

          <form style={styles.formCard} onSubmit={handleBooking}>
            <h2>Repair Booking Form</h2>

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

            <label style={styles.label}>Device Type</label>
            <select
              style={styles.input}
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
            >
              <option>Gaming PC</option>
              <option>Laptop</option>
              <option>Desktop PC</option>
              <option>Monitor</option>
              <option>Accessory</option>
            </select>

            <label style={styles.label}>Issue Type</label>
            <select
              style={styles.input}
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
            >
              <option>Diagnostics</option>
              <option>Not powering on</option>
              <option>Overheating</option>
              <option>Slow performance</option>
              <option>Windows installation</option>
              <option>RAM/SSD upgrade</option>
              <option>GPU/Display issue</option>
              <option>Network/WiFi issue</option>
              <option>Other</option>
            </select>

            <label style={styles.label}>Preferred Date</label>
            <input
              style={styles.input}
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              required
            />

            <label style={styles.label}>Describe the problem</label>
            <textarea
              style={styles.textarea}
              placeholder="Example: PC turns on but no display..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <button style={styles.submitBtn} type="submit">
              Book Repair
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
    maxWidth: "650px",
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

export default Repairs;