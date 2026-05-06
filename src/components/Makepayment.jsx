import axios from "axios";
import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../App.css";
import Loader from "./Loader";

const Makepayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;
  const cart = location.state?.cart || [];
  const type = location.state?.type || "single";

  const img_url = "https://frostyghost23.alwaysdata.net/static/images/";

  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const { clearCart } = useContext(CartContext);

  const amount =
  type === "cart"
    ? cart.reduce(
        (sum, item) => sum + Number(item.product_cost) * (item.quantity || 1),
        0
      )
    : Number(product?.product_cost ?? 0);

  const isValidPhone = (phone) => /^254\d{9}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatusMessage("");

    if (!isValidPhone(number)) {
      setError("Enter a valid phone number (254XXXXXXXXX)");
      return;
    }

    setLoading(true);
    setStatusMessage("🚀 Processing payment...");

    try {
      const formdata = new FormData();
      formdata.append("phone", number);
      formdata.append("amount", amount);

      const response = await axios.post(
        "https://frostyghost23.alwaysdata.net/api/mpesa_payment",
        formdata
      );

      const orderItems =
        type === "cart"
          ? cart.map((item) => ({
              id: item.product_id || item.id,
              name: item.product_name,
              price: item.product_cost,
              quantity: item.quantity || 1,
            }))
          : [
              {
                id: product.product_id || product.id,
                name: product.product_name,
                price: product.product_cost,
                quantity: 1,
              },
            ];

      const orderData = new FormData();
      orderData.append("username", user?.username || "Guest");
      orderData.append("email", user?.email || "guest@gmail.com");
      orderData.append("phone", number);
      orderData.append("amount", amount);
      orderData.append("items", JSON.stringify(orderItems));

      await axios.post(
        "https://frostyghost23.alwaysdata.net/api/create_order",
        orderData
      );

      setStatusMessage("📲 Check your phone to complete payment...");

      setTimeout(() => {
        setLoading(false);
        setStatusMessage(response.data.message || "✅ Payment request sent!");
        if (type === "cart") {
          clearCart();
        }
        navigate("/orders");
      }, 2500);

    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message);
    }
  };

  if (type === "single" && !product) {
    return (
      <div style={styles.center}>
        <h2 style={{ color: "#2563eb" }}>No product selected</h2>
        <button style={styles.backBtn} onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>

      {/* BACK NAV */}
      <div style={styles.topBar}>
        <button onClick={() => navigate("/products")} style={styles.backBtn}>
          ← Back to Products
        </button>
      </div>

      <div style={styles.wrapper}>

        {/* ORDER SUMMARY CARD */}
        <div style={styles.productCard}>
          <h2 style={styles.title}>Order Summary</h2>

          {type === "cart" ? (
            <div style={{ padding: "15px" }}>
              {cart.map((item) => (
                <div key={item.id} style={styles.cartItem}>
                  <img
                    src={`${img_url}${item.product_photo}`}
                    alt={item.product_name}
                    style={styles.cartImg}
                  />

                  <div>
                    <h4 style={{ margin: 0 }}>{item.product_name}</h4>
                    <p style={{ margin: "5px 0", color: "#64748b" }}>
                      Qty: {item.quantity || 1}
                    </p>
                    <strong>KES {Number(item.product_cost).toLocaleString()}</strong>
                  </div>
                </div>
              ))}

              <hr />

              <h2 style={{ color: "#2563eb" }}>
                Total: KES {amount.toLocaleString()}
              </h2>
            </div>
          ) : (
            <>
              <div style={styles.imageBox}>
                <img
                  src={`${img_url}${product.product_photo}`}
                  alt={product.product_name}
                  style={styles.image}
                />

                <div style={styles.priceTag}>
                  KES {Number(product.product_cost).toLocaleString()}
                </div>
              </div>

              <h2 style={styles.title}>{product.product_name}</h2>

              <p style={styles.desc}>{product.product_description}</p>
            </>
          )}
        </div>

        {/* PAYMENT CARD */}
        <div style={styles.paymentCard}>
          <h2 style={styles.checkoutTitle}>Secure Checkout</h2>

          {loading && <Loader />}

          <p style={styles.status}>{statusMessage}</p>
          <p style={styles.error}>{error}</p>

          <form onSubmit={handleSubmit}>

            <label style={styles.label}>Phone Number</label>
            <input
              type="text"
              placeholder="254XXXXXXXXX"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              style={styles.input}
              required
            />

            <button
              type="submit"
              disabled={loading}
              style={styles.payBtn}
            >
              {loading ? "Processing..." : "⚡ Pay Now"}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

/* 🎨 STYLES */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f8fafc, #eef2ff)",
    fontFamily: "Inter, sans-serif",
    padding: "20px"
  },

  topBar: {
    marginBottom: "20px"
  },

  backBtn: {
    background: "transparent",
    border: "1px solid #2563eb",
    color: "#2563eb",
    padding: "8px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600"
  },

  wrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "25px",
    maxWidth: "1100px",
    margin: "auto"
  },

  productCard: {
    background: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    paddingBottom: "20px"
  },

  imageBox: {
    position: "relative"
  },

  image: {
    width: "100%",
    height: "320px",
    objectFit: "contain",
    background: "#f1f5f9",
    padding: "10px"
  },

  priceTag: {
    position: "absolute",
    bottom: "12px",
    right: "12px",
    background: "#2563eb",
    color: "white",
    padding: "6px 12px",
    borderRadius: "8px",
    fontWeight: "700"
  },

  title: {
    padding: "15px 15px 5px",
    color: "#0f172a"
  },

  desc: {
    padding: "0 15px",
    color: "#64748b",
    fontSize: "14px",
    lineHeight: "1.5"
  },

  paymentCard: {
    background: "white",
    borderRadius: "16px",
    padding: "25px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
  },

  checkoutTitle: {
    textAlign: "center",
    color: "#2563eb",
    marginBottom: "20px"
  },

  label: {
    fontSize: "13px",
    color: "#475569"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "6px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    outline: "none"
  },

  payBtn: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    transition: "0.3s"
  },

  status: {
    textAlign: "center",
    color: "#2563eb",
    fontSize: "13px"
  },

  error: {
    textAlign: "center",
    color: "red",
    fontSize: "13px"
  },

  center: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  cartItem: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #e2e8f0",
  },

  cartImg: {
    width: "70px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "12px",
  },
};


export default Makepayment;