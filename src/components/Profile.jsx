import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      navigate("/signin");
      return;
    }

    setUser(savedUser);
    setUsername(savedUser.username || "");
    setEmail(savedUser.email || "");
    setPhone(savedUser.phone || "");
    setPassword(savedUser.password || "");
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const formData = new FormData();

      formData.append("user_id", user.user_id);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);

      const response = await axios.put(
        "https://frostyghost23.alwaysdata.net/api/update_profile",
        formData
      );

      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Profile update failed");
    }
  };

  if (!user) return null;

  return (
    <div style={styles.page}>
      <section style={styles.header}>
        <div>
          <p style={styles.badge}>PrimeCore Account</p>
          <h1 style={styles.title}>My Profile</h1>
          <p style={styles.subtitle}>
            Manage your account details and keep your information updated.
          </p>
        </div>

        <button style={styles.backBtn} onClick={() => navigate("/products")}>
          ← Back to Products
        </button>
      </section>

      <section style={styles.layout}>
        <div style={styles.profileCard}>
          <div style={styles.avatar}>
            {username?.charAt(0).toUpperCase()}
          </div>

          <h2>{username}</h2>
          <p>{email}</p>

          <div style={styles.infoBox}>
            <p><b>Phone:</b> {phone}</p>
            <p><b>Role:</b> {Number(user.is_admin) === 1 ? "Admin" : "Customer"}</p>
          </div>
        </div>

        <form style={styles.formCard} onSubmit={handleUpdate}>
          <h2 style={styles.formTitle}>Edit Profile</h2>

          {message && <p style={styles.success}>{message}</p>}
          {error && <p style={styles.error}>{error}</p>}

          <label style={styles.label}>Username</label>
          <input
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label style={styles.label}>Phone</label>
          <input
            style={styles.input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button style={styles.saveBtn} type="submit">
            Save Changes
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

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap",
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
    fontSize: "44px",
    margin: "12px 0 5px",
    color: "#020617",
    fontWeight: "950",
  },

  subtitle: {
    color: "#64748b",
  },

  backBtn: {
    border: "1px solid #cbd5e1",
    background: "rgba(255,255,255,0.85)",
    padding: "12px 16px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "900",
    color: "#0f172a",
  },

  layout: {
    display: "grid",
    gridTemplateColumns: "0.8fr 1.2fr",
    gap: "25px",
    maxWidth: "1000px",
    margin: "0 auto",
  },

  profileCard: {
    background: "rgba(255,255,255,0.92)",
    borderRadius: "26px",
    padding: "30px",
    textAlign: "center",
    boxShadow: "0 25px 70px rgba(15,23,42,0.12)",
    border: "1px solid rgba(226,232,240,0.9)",
  },

  avatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    margin: "0 auto 18px",
    background: "linear-gradient(135deg, #2563eb, #38bdf8)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "38px",
    fontWeight: "950",
    boxShadow: "0 18px 40px rgba(37,99,235,0.35)",
  },

  infoBox: {
    marginTop: "20px",
    background: "#f8fafc",
    padding: "15px",
    borderRadius: "18px",
    textAlign: "left",
    color: "#334155",
  },

  formCard: {
    background: "rgba(255,255,255,0.92)",
    borderRadius: "26px",
    padding: "28px",
    boxShadow: "0 25px 70px rgba(15,23,42,0.12)",
    border: "1px solid rgba(226,232,240,0.9)",
  },

  formTitle: {
    marginBottom: "20px",
    color: "#020617",
    fontWeight: "950",
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
    marginBottom: "16px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontWeight: "700",
  },

  saveBtn: {
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

export default Profile;