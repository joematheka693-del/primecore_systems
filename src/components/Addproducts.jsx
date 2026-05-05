import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Addproducts = () => {
  const navigate = useNavigate();

  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState(null);
  const [preview, setPreview] = useState("");

  const [category, setCategory] = useState("pcs");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductPhoto(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const resetForm = (e) => {
    setProductName("");
    setProductDescription("");
    setProductCost("");
    setProductPhoto(null);
    setPreview("");
    setCategory("pcs");
    e.target.reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!user) {
      setError("You must be logged in");
      return;
    }

    if (Number(user.is_admin) !== 1) {
      setError("Access denied: admins only");
      return;
    }

    if (!product_photo) {
      setError("Please upload a product image");
      return;
    }

    setLoading(true);

    try {
      const formdata = new FormData();
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("category", category);
      formdata.append("product_photo", product_photo);
      formdata.append("email", user.email);

      const response = await axios.post(
        "http://frostyghost23.alwaysdata.net/api/add_product",
        formdata
      );

      setSuccess(response.data.message || "Product added successfully");
      resetForm(e);

      setTimeout(() => setSuccess(""), 4000);
    } catch (error) {
      setError(error.response?.data?.message || "System Error");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div style={styles.accessPage}>
        <div style={styles.accessCard}>
          <h2>Access Denied</h2>
          <p>Please login first.</p>
          <button style={styles.primaryBtn} onClick={() => navigate("/signin")}>
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <section style={styles.header}>
        <div>
          <p style={styles.badge}>Admin Upload Console</p>
          <h1 style={styles.title}>Add New Product</h1>
          <p style={styles.subtitle}>
            Add gaming PCs, accessories, repair services, offers, and store items.
          </p>
        </div>

        <button style={styles.backBtn} onClick={() => navigate("/admin")}>
          ← Back to Dashboard
        </button>
      </section>

      <section style={styles.layout}>
        <div style={styles.previewCard}>
          <p style={styles.previewLabel}>Live Preview</p>

          <div style={styles.imageBox}>
            {preview ? (
              <img src={preview} alt="Preview" style={styles.previewImg} />
            ) : (
              <div style={styles.placeholder}>
                <span style={{ fontSize: "44px" }}>🖥️</span>
                <p>Product image preview</p>
              </div>
            )}
          </div>

          <h2 style={styles.previewTitle}>
            {product_name || "Product Name"}
          </h2>

          <p style={styles.previewDesc}>
            {product_description || "Product description will appear here."}
          </p>

          <div style={styles.previewFooter}>
            <span style={styles.price}>
              KES {product_cost || "0"}
            </span>

            <span style={styles.categoryPill}>
              {category}
            </span>
          </div>
        </div>

        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>Product Details</h2>

          {loading && <Loader />}
          {success && <div style={styles.success}>{success}</div>}
          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Product Name</label>
            <input
              type="text"
              placeholder="Example: Ryzen 7 RTX Gaming PC"
              required
              value={product_name}
              onChange={(e) => setProductName(e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>Product Description</label>
            <textarea
              placeholder="Write product specs, features, or service details..."
              required
              value={product_description}
              onChange={(e) => setProductDescription(e.target.value)}
              style={styles.textarea}
            />

            <div style={styles.twoCols}>
              <div>
                <label style={styles.label}>Price</label>
                <input
                  type="number"
                  placeholder="Enter price"
                  required
                  value={product_cost}
                  onChange={(e) => setProductCost(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div>
                <label style={styles.label}>Category</label>
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={styles.input}
                >
                  <option value="pcs">Gaming PCs</option>
                  <option value="accessories">Accessories</option>
                  <option value="repairs">Repairs</option>
                  <option value="services">Services</option>
                  <option value="offers">Offers</option>
                </select>
              </div>
            </div>

            <label style={styles.label}>Product Image</label>
            <input
              type="file"
              required
              accept="image/*"
              onChange={handleImageChange}
              style={styles.input}
            />

            <button type="submit" style={styles.submitBtn}>
              Deploy Product
            </button>
          </form>
        </div>
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
    marginBottom: "28px",
    gap: "20px",
  },

  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "#dbeafe",
    color: "#2563eb",
    fontWeight: "900",
    marginBottom: "10px",
  },

  title: {
    fontSize: "44px",
    margin: 0,
    color: "#020617",
    fontWeight: "950",
    letterSpacing: "-1px",
  },

  subtitle: {
    color: "#64748b",
    marginTop: "8px",
  },

  backBtn: {
    border: "1px solid #cbd5e1",
    background: "rgba(255,255,255,0.8)",
    padding: "12px 16px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "900",
    color: "#0f172a",
    boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
  },

  layout: {
    display: "grid",
    gridTemplateColumns: "0.9fr 1.1fr",
    gap: "26px",
    alignItems: "start",
  },

  previewCard: {
    background: "rgba(255,255,255,0.88)",
    backdropFilter: "blur(14px)",
    borderRadius: "26px",
    padding: "22px",
    boxShadow: "0 25px 70px rgba(15,23,42,0.12)",
    border: "1px solid rgba(226,232,240,0.9)",
  },

  previewLabel: {
    fontWeight: "900",
    color: "#2563eb",
    marginBottom: "14px",
  },

  imageBox: {
    height: "280px",
    borderRadius: "22px",
    overflow: "hidden",
    background: "linear-gradient(135deg, #020617, #1e293b)",
    marginBottom: "18px",
  },

  previewImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  placeholder: {
    height: "100%",
    color: "#cbd5e1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "800",
  },

  previewTitle: {
    color: "#020617",
    fontSize: "24px",
    fontWeight: "950",
    margin: "8px 0",
  },

  previewDesc: {
    color: "#64748b",
    lineHeight: "1.5",
    minHeight: "50px",
  },

  previewFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "16px",
  },

  price: {
    color: "#2563eb",
    fontWeight: "950",
    fontSize: "18px",
  },

  categoryPill: {
    textTransform: "capitalize",
    background: "#dcfce7",
    color: "#16a34a",
    padding: "8px 12px",
    borderRadius: "999px",
    fontWeight: "900",
  },

  formCard: {
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(14px)",
    borderRadius: "26px",
    padding: "26px",
    boxShadow: "0 25px 70px rgba(15,23,42,0.12)",
    border: "1px solid rgba(226,232,240,0.9)",
  },

  formTitle: {
    color: "#020617",
    fontWeight: "950",
    marginBottom: "18px",
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
    background: "rgba(255,255,255,0.85)",
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "13px 14px",
    marginBottom: "16px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontWeight: "700",
    resize: "vertical",
    background: "rgba(255,255,255,0.85)",
  },

  twoCols: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  },

  submitBtn: {
    width: "100%",
    marginTop: "8px",
    padding: "14px",
    border: "none",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #2563eb, #0f172a)",
    color: "white",
    cursor: "pointer",
    fontWeight: "950",
    fontSize: "15px",
    boxShadow: "0 18px 40px rgba(37,99,235,0.35)",
  },

  success: {
    background: "#dcfce7",
    color: "#16a34a",
    padding: "12px",
    borderRadius: "14px",
    fontWeight: "900",
    marginBottom: "14px",
  },

  error: {
    background: "#fee2e2",
    color: "#dc2626",
    padding: "12px",
    borderRadius: "14px",
    fontWeight: "900",
    marginBottom: "14px",
  },

  accessPage: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #020617, #0f172a)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },

  accessCard: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "24px",
    padding: "35px",
    textAlign: "center",
    boxShadow: "0 25px 70px rgba(0,0,0,0.3)",
  },

  primaryBtn: {
    border: "none",
    background: "#2563eb",
    color: "white",
    padding: "12px 16px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "900",
  },
};

export default Addproducts;