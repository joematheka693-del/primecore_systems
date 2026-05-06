import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData();

  formData.append("name", form.name.value);
  formData.append("email", form.email.value);
  formData.append("subject", form.subject.value);
  formData.append("message", form.message.value);

  try {
    const response = await axios.post(
      "https://frostyghost23.alwaysdata.net/api/contact_message",
      formData
    );

    setMessage(response.data.message);
    form.reset();
  } catch {
    setMessage("❌ Failed to send message.");
  }
};

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <p style={styles.badge}>Contact PrimeCore</p>
        <h1 style={styles.title}>Need Help?</h1>
        <p style={styles.subtitle}>
          Reach us for gaming PCs, repairs, custom builds, orders, or support.
        </p>
      </section>

      <section style={styles.layout}>
        <div style={styles.infoCard}>
          <h2>PrimeCore Systems</h2>
          <p>📍 Nairobi, Kenya</p>
          <p>📞 +254 700 000 000</p>
          <p>📧 support@primecore.co.ke</p>
          <p>🕒 Mon - Sat: 8:00 AM - 6:00 PM</p>

          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noreferrer"
            style={styles.whatsappBtn}
          >
            Chat on WhatsApp
          </a>
        </div>

        <form style={styles.formCard} onSubmit={handleSubmit}>
          <h2>Send a Message</h2>

          {message && <p style={styles.success}>{message}</p>}

          <input
            name="name"
            style={styles.input}
            placeholder="Your Name"
            required
            />

            <input
            name="email"
            style={styles.input}
            type="email"
            placeholder="Your Email"
            required
            />

            <input
            name="subject"
            style={styles.input}
            placeholder="Subject"
            required
            />

            <textarea
            name="message"
            style={styles.textarea}
            placeholder="Write your message..."
            required
            />

          <button type="submit" style={styles.submitBtn}>
             Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    padding: "45px",
    background:
      "radial-gradient(circle at top left, rgba(37,99,235,0.18), transparent 35%), linear-gradient(180deg, #f8fafc, #eef2ff)",
    fontFamily: "Inter, sans-serif",
  },
  hero: { textAlign: "center", marginBottom: "35px" },
  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "#dbeafe",
    color: "#2563eb",
    fontWeight: "900",
  },
  title: {
    fontSize: "48px",
    margin: "14px 0 10px",
    color: "#020617",
    fontWeight: "950",
  },
  subtitle: { color: "#64748b", fontSize: "17px" },
  layout: {
    display: "grid",
    gridTemplateColumns: "0.9fr 1.1fr",
    gap: "25px",
    maxWidth: "1050px",
    margin: "0 auto",
  },
  infoCard: {
    background: "rgba(255,255,255,0.92)",
    borderRadius: "24px",
    padding: "28px",
    boxShadow: "0 25px 70px rgba(15,23,42,0.1)",
  },
  whatsappBtn: {
    display: "inline-block",
    marginTop: "18px",
    padding: "13px 16px",
    borderRadius: "14px",
    background: "#16a34a",
    color: "white",
    textDecoration: "none",
    fontWeight: "900",
  },
  formCard: {
    background: "rgba(255,255,255,0.92)",
    borderRadius: "24px",
    padding: "28px",
    boxShadow: "0 25px 70px rgba(15,23,42,0.1)",
  },
  input: {
    width: "100%",
    padding: "13px 14px",
    marginBottom: "14px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontWeight: "700",
  },
  textarea: {
    width: "100%",
    minHeight: "130px",
    padding: "13px 14px",
    marginBottom: "14px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontWeight: "700",
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
  },
  success: {
    background: "#dcfce7",
    color: "#16a34a",
    padding: "12px",
    borderRadius: "14px",
    fontWeight: "900",
  },
};

export default Contact;