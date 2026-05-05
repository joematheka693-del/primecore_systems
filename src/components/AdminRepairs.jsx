import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const AdminRepairs = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://frostyghost23.alwaysdata.net/api/get_repair_bookings"
      );

      setBookings(response.data);
    } catch {
      alert("Failed to load repair bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const formData = new FormData();
      formData.append("status", status);

      await axios.put(
        `https://frostyghost23.alwaysdata.net/api/update_repair_status/${id}`,
        formData
      );

      fetchBookings();
    } catch {
      alert("Failed to update repair status");
    }
  };

  return (
    <div style={styles.page}>
      <section style={styles.header}>
        <div>
          <p style={styles.badge}>Admin Repairs</p>
          <h1 style={styles.title}>Repair Bookings</h1>
          <p style={styles.subtitle}>
            Manage customer repair requests and service progress.
          </p>
        </div>

        <button style={styles.backBtn} onClick={() => navigate("/admin")}>
          ← Back to Dashboard
        </button>
      </section>

      {loading && <Loader />}

      <section style={styles.grid}>
        {bookings.map((booking) => (
          <div style={styles.card} key={booking.id}>
            <div style={styles.top}>
              <div>
                <p style={styles.orderLabel}>Booking #{booking.id}</p>
                <h2 style={styles.device}>{booking.device_type}</h2>
              </div>

              <span style={styles.status}>{booking.status}</span>
            </div>

            <div style={styles.details}>
              <p><b>Customer:</b> {booking.username}</p>
              <p><b>Email:</b> {booking.email}</p>
              <p><b>Phone:</b> {booking.phone}</p>
              <p><b>Issue:</b> {booking.issue_type}</p>
              <p><b>Date:</b> {booking.preferred_date}</p>
              <p><b>Description:</b> {booking.description}</p>
            </div>

            <select
              style={styles.select}
              value={booking.status}
              onChange={(e) => updateStatus(booking.id, e.target.value)}
            >
              <option>Pending</option>
              <option>Reviewed</option>
              <option>In Progress</option>
              <option>Ready for Pickup</option>
              <option>Completed</option>
              <option>Cancelled</option>
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
    alignItems: "center",
    marginBottom: "30px",
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
    margin: "10px 0",
  },

  subtitle: {
    color: "#64748b",
  },

  backBtn: {
    padding: "12px 16px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    background: "white",
    cursor: "pointer",
    fontWeight: "900",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "rgba(255,255,255,0.92)",
    borderRadius: "24px",
    padding: "22px",
    boxShadow: "0 25px 70px rgba(15,23,42,0.1)",
    border: "1px solid rgba(226,232,240,0.9)",
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    gap: "14px",
    marginBottom: "16px",
  },

  orderLabel: {
    color: "#64748b",
    fontWeight: "900",
    margin: 0,
  },

  device: {
    color: "#2563eb",
    fontWeight: "950",
    margin: "6px 0",
  },

  status: {
    background: "#dbeafe",
    color: "#2563eb",
    padding: "8px 11px",
    borderRadius: "999px",
    fontWeight: "900",
    fontSize: "12px",
    height: "fit-content",
  },

  details: {
    background: "#f8fafc",
    padding: "14px",
    borderRadius: "16px",
    color: "#334155",
    marginBottom: "14px",
  },

  select: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontWeight: "800",
  },
};

export default AdminRepairs;