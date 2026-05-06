import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const AdminContacts = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://frostyghost23.alwaysdata.net/api/get_contact_messages"
      );
      setMessages(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const updateStatus = async (id, status) => {
    const formData = new FormData();
    formData.append("status", status);

    await axios.put(
      `https://frostyghost23.alwaysdata.net/api/update_contact_status/${id}`,
      formData
    );

    fetchMessages();
  };

  return (
    <div style={styles.page}>
      <section style={styles.header}>
        <div>
          <p style={styles.badge}>Admin Inbox</p>
          <h1 style={styles.title}>Contact Messages</h1>
          <p style={styles.subtitle}>View and manage customer support messages.</p>
        </div>

        <button style={styles.backBtn} onClick={() => navigate("/admin")}>
          ← Back
        </button>
      </section>

      {loading && <Loader />}

      <section style={styles.grid}>
        {messages.map((msg) => (
          <div style={styles.card} key={msg.id}>
            <div style={styles.top}>
              <h3>{msg.subject}</h3>
              <span style={styles.status}>{msg.status}</span>
            </div>

            <p><b>Name:</b> {msg.name}</p>
            <p><b>Email:</b> {msg.email}</p>
            <p><b>Message:</b> {msg.message}</p>

            <select
              style={styles.select}
              value={msg.status}
              onChange={(e) => updateStatus(msg.id, e.target.value)}
            >
              <option>Unread</option>
              <option>Read</option>
              <option>Replied</option>
              <option>Archived</option>
            </select>
          </div>
        ))}
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
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px",
    gap: "20px",
  },
  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "#dbeafe",
    color: "#2563eb",
    fontWeight: "900",
  },
  title: {
    fontSize: "42px",
    fontWeight: "950",
    color: "#020617",
  },
  subtitle: { color: "#64748b" },
  backBtn: {
    height: "fit-content",
    padding: "12px 16px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    background: "white",
    cursor: "pointer",
    fontWeight: "900",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "white",
    borderRadius: "22px",
    padding: "22px",
    boxShadow: "0 20px 55px rgba(15,23,42,0.1)",
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  status: {
    background: "#dbeafe",
    color: "#2563eb",
    padding: "7px 10px",
    borderRadius: "999px",
    fontWeight: "900",
    height: "fit-content",
  },
  select: {
    width: "100%",
    marginTop: "12px",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontWeight: "800",
  },
};

export default AdminContacts;