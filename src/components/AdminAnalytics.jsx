import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const AdminAnalytics = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [repairs, setRepairs] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const [productsRes, ordersRes, repairsRes, quotesRes] = await Promise.all([
        axios.get("https://frostyghost23.alwaysdata.net/api/get_products"),
        axios.get("https://frostyghost23.alwaysdata.net/api/get_orders"),
        axios.get("https://frostyghost23.alwaysdata.net/api/get_repair_bookings"),
        axios.get("https://frostyghost23.alwaysdata.net/api/get_quotes"),
      ]);

      setProducts(productsRes.data);
      setOrders(ordersRes.data);
      setRepairs(repairsRes.data);
      setQuotes(quotesRes.data);
    } catch (error) {
      alert("Failed to load analytics. Check that all API routes exist.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const inventoryValue = products.reduce(
    (sum, item) => sum + Number(item.product_cost || 0),
    0
  );

  const paidRevenue = orders
    .filter((order) => order.status === "Paid" || order.status === "Delivered")
    .reduce((sum, order) => sum + Number(order.amount || 0), 0);

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending Payment"
  ).length;

  const activeRepairs = repairs.filter(
    (repair) => repair.status !== "Completed" && repair.status !== "Cancelled"
  ).length;

  const activeQuotes = quotes.filter(
    (quote) => quote.status !== "Completed" && quote.status !== "Rejected"
  ).length;

  return (
    <div style={styles.page}>
      <section style={styles.header}>
        <div>
          <p style={styles.badge}>PrimeCore Analytics</p>
          <h1 style={styles.title}>Admin Analytics Dashboard</h1>
          <p style={styles.subtitle}>
            Correct summaries for inventory, orders, repairs, and service quotes.
          </p>
        </div>

        <button style={styles.backBtn} onClick={() => navigate("/admin")}>
          ← Back to Admin
        </button>
      </section>

      {loading && <Loader />}

      <section style={styles.grid}>
        <div style={styles.card}>
          <p>Total Products</p>
          <h2>{products.length}</h2>
          <span>Inventory items only</span>
        </div>

        <div style={styles.card}>
          <p>Inventory Value</p>
          <h2>KES {inventoryValue.toLocaleString()}</h2>
          <span>PCs, accessories, offers</span>
        </div>

        <div style={styles.card}>
          <p>Total Orders</p>
          <h2>{orders.length}</h2>
          <span>{pendingOrders} pending payment</span>
        </div>

        <div style={styles.card}>
          <p>Paid Revenue</p>
          <h2>KES {paidRevenue.toLocaleString()}</h2>
          <span>Paid + delivered orders</span>
        </div>

        <div style={styles.card}>
          <p>Repair Bookings</p>
          <h2>{repairs.length}</h2>
          <span>{activeRepairs} active repairs</span>
        </div>

        <div style={styles.card}>
          <p>Service Quotes</p>
          <h2>{quotes.length}</h2>
          <span>{activeQuotes} active quote requests</span>
        </div>
      </section>

      <section style={styles.quickActions}>
        <button onClick={() => navigate("/addproducts")} style={styles.actionBtn}>
          + Add Product
        </button>

        <button onClick={() => navigate("/admin/orders")} style={styles.actionBtn}>
          Manage Orders
        </button>

        <button onClick={() => navigate("/admin/repairs")} style={styles.actionBtn}>
          Repair Bookings
        </button>

        <button onClick={() => navigate("/admin/quotes")} style={styles.actionBtn}>
          Service Quotes
        </button>
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
    alignItems: "flex-start",
    gap: "25px",
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
    background: "rgba(255,255,255,0.9)",
    padding: "12px 16px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "900",
    color: "#0f172a",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  card: {
    background: "rgba(255,255,255,0.92)",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 25px 70px rgba(15,23,42,0.1)",
    border: "1px solid rgba(226,232,240,0.9)",
  },

  quickActions: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "14px",
  },

  actionBtn: {
    border: "none",
    padding: "14px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #2563eb, #0f172a)",
    color: "white",
    cursor: "pointer",
    fontWeight: "950",
    boxShadow: "0 18px 40px rgba(37,99,235,0.3)",
  },
};

export default AdminAnalytics;