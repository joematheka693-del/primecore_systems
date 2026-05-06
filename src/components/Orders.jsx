import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://frostyghost23.alwaysdata.net/api/get_orders"
      );

      const myOrders = response.data.filter(
        (order) => order.email === user?.email
      );

      setOrders(myOrders);
    } catch (error) {
      console.log(error);
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const parseItems = (items) => {
    if (!items) return [];

    try {
      return JSON.parse(items);
    } catch {
      return [];
    }
  };

  const getStatusStyle = (status) => {
    if (status === "Delivered") return styles.delivered;
    if (status === "Paid") return styles.paid;
    if (status === "Processing") return styles.processing;
    if (status === "Cancelled") return styles.cancelled;
    return styles.pending;
  };

  if (!user) {
    return (
      <div style={styles.center}>
        <h2>Please sign in to view your orders</h2>
        <button style={styles.primaryBtn} onClick={() => navigate("/signin")}>
          Go to Sign In
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <section style={styles.header}>
        <div>
          <p style={styles.badge}>PrimeCore Orders</p>
          <h1 style={styles.title}>My Orders</h1>
          <p style={styles.subtitle}>
            Track your purchases, payment status, and delivery progress.
          </p>
        </div>

        <button style={styles.backBtn} onClick={() => navigate("/products")}>
          Continue Shopping
        </button>
      </section>

      {loading && <Loader />}

      {orders.length === 0 && !loading && (
        <div style={styles.emptyCard}>
          <h2>No orders yet</h2>
          <p>You have not placed any PrimeCore orders yet.</p>
          <button style={styles.primaryBtn} onClick={() => navigate("/products")}>
            Browse Gaming PCs
          </button>
        </div>
      )}

      <div style={styles.grid}>
        {orders.map((order) => {
          const items = parseItems(order.items);

          return (
            <div style={styles.card} key={order.id || order.order_id}>
              <div style={styles.cardTop}>
                <div>
                  <p style={styles.orderLabel}>Order #{order.id}</p>
                  <h2 style={styles.amount}>
                    KES {Number(order.amount).toLocaleString()}
                  </h2>
                </div>

                <span style={{ ...styles.status, ...getStatusStyle(order.status) }}>
                  {order.status}
                </span>
              </div>

              <div style={styles.details}>
                <p><b>Phone:</b> {order.phone}</p>
                <p><b>Email:</b> {order.email}</p>
              </div>

              <div style={styles.itemsBox}>
                <h4>Items</h4>

                {items.length === 0 && (
                  <p style={{ color: "#64748b" }}>
                    No item data available
                  </p>
                )}

                {Array.isArray(items) &&
                  items.map((item, index) => (
                  <div style={styles.item} key={index}>
                    <div>
                      <strong>{item.name}</strong>
                      <p>Qty: {item.quantity || 1}</p>
                    </div>

                    <span>KES {Number(item.price).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
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
    color: "#020617",
    fontWeight: "950",
    fontSize: "44px",
    margin: "12px 0 5px",
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
    boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
    gap: "22px",
  },

  card: {
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(14px)",
    borderRadius: "24px",
    padding: "22px",
    boxShadow: "0 25px 70px rgba(15,23,42,0.1)",
    border: "1px solid rgba(226,232,240,0.9)",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "flex-start",
    marginBottom: "18px",
  },

  orderLabel: {
    color: "#64748b",
    fontWeight: "900",
    margin: 0,
  },

  amount: {
    color: "#2563eb",
    fontWeight: "950",
    margin: "6px 0 0",
  },

  status: {
    padding: "8px 11px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "950",
    whiteSpace: "nowrap",
  },

  pending: {
    background: "#fef3c7",
    color: "#d97706",
  },

  paid: {
    background: "#dbeafe",
    color: "#2563eb",
  },

  processing: {
    background: "#e0f2fe",
    color: "#0284c7",
  },

  delivered: {
    background: "#dcfce7",
    color: "#16a34a",
  },

  cancelled: {
    background: "#fee2e2",
    color: "#dc2626",
  },

  details: {
    background: "#f8fafc",
    padding: "13px",
    borderRadius: "16px",
    color: "#334155",
    marginBottom: "16px",
  },

  itemsBox: {
    borderTop: "1px solid #e2e8f0",
    paddingTop: "14px",
  },

  item: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    padding: "10px 0",
    borderBottom: "1px solid #f1f5f9",
  },

  emptyCard: {
    background: "rgba(255,255,255,0.9)",
    padding: "35px",
    borderRadius: "24px",
    textAlign: "center",
    boxShadow: "0 25px 70px rgba(15,23,42,0.1)",
  },

  primaryBtn: {
    border: "none",
    background: "linear-gradient(135deg, #2563eb, #0f172a)",
    color: "white",
    padding: "12px 16px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "900",
  },

  center: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f8fafc, #eef2ff)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Orders;