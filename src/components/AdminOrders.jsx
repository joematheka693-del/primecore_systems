import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://frostyghost23.alwaysdata.net/api/get_orders"
      );

      setOrders(response.data);
    } catch (error) {
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const formData = new FormData();
      formData.append("status", status);

      await axios.put(
        `https://frostyghost23.alwaysdata.net/api/update_order_status/${id}`,
        formData
      );

      fetchOrders();
    } catch {
      alert("Failed to update status");
    }
  };

  const parseItems = (items) => {
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

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.status === filter);

  const totalRevenue = orders
    .filter((o) => o.status === "Paid" || o.status === "Delivered")
    .reduce((sum, o) => sum + Number(o.amount), 0);

  return (
    <div style={styles.page}>
      <section style={styles.header}>
        <div>
          <p style={styles.badge}>Admin Orders</p>
          <h1 style={styles.title}>Orders Dashboard</h1>
          <p style={styles.subtitle}>
            Track, manage and update all customer orders.
          </p>
        </div>

        <button style={styles.backBtn} onClick={() => navigate("/admin")}>
          ← Back
        </button>
      </section>

      <section style={styles.stats}>
        <div style={styles.statCard}>
          <p>Total Orders</p>
          <h2>{orders.length}</h2>
        </div>

        <div style={styles.statCard}>
          <p>Revenue</p>
          <h2>KES {totalRevenue.toLocaleString()}</h2>
        </div>

        <div style={styles.statCard}>
          <p>Pending</p>
          <h2>{orders.filter(o => o.status === "Pending Payment").length}</h2>
        </div>
      </section>

      <section style={styles.filters}>
        {["all", "Pending Payment", "Paid", "Processing", "Delivered", "Cancelled"].map((f) => (
          <button
            key={f}
            style={filter === f ? styles.activeFilter : styles.filterBtn}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </section>

      {loading && <Loader />}

      <div style={styles.grid}>
        {filteredOrders.map((order) => {
          const items = parseItems(order.items);

          return (
            <div style={styles.card} key={order.id}>
              <div style={styles.top}>
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
                <p><b>{order.username}</b></p>
                <p>{order.email}</p>
                <p>{order.phone}</p>
              </div>

              <div style={styles.items}>
                {items.map((item, i) => (
                  <div key={i} style={styles.item}>
                    <span>{item.name} (x{item.quantity})</span>
                    <span>KES {Number(item.price).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <select
                style={styles.select}
                value={order.status}
                onChange={(e) => updateStatus(order.id, e.target.value)}
              >
                <option>Pending Payment</option>
                <option>Paid</option>
                <option>Processing</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
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
  },

  badge: {
    padding: "8px 14px",
    borderRadius: "999px",
    background: "#dbeafe",
    color: "#2563eb",
    fontWeight: "900",
  },

  title: {
    fontSize: "42px",
    fontWeight: "950",
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

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
    gap: "15px",
    marginBottom: "25px",
  },

  statCard: {
    background: "white",
    padding: "20px",
    borderRadius: "20px",
    boxShadow: "0 15px 35px rgba(15,23,42,0.08)",
  },

  filters: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "25px",
  },

  filterBtn: {
    padding: "10px 14px",
    borderRadius: "999px",
    border: "1px solid #cbd5e1",
    background: "white",
    cursor: "pointer",
    fontWeight: "800",
  },

  activeFilter: {
    padding: "10px 14px",
    borderRadius: "999px",
    border: "none",
    background: "#2563eb",
    color: "white",
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
    padding: "20px",
    boxShadow: "0 20px 50px rgba(15,23,42,0.1)",
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },

  orderLabel: {
    color: "#64748b",
    fontWeight: "900",
  },

  amount: {
    color: "#2563eb",
    fontWeight: "950",
  },

  status: {
    padding: "7px 10px",
    borderRadius: "999px",
    fontWeight: "900",
    fontSize: "12px",
  },

  pending: { background: "#fef3c7", color: "#d97706" },
  paid: { background: "#dbeafe", color: "#2563eb" },
  processing: { background: "#e0f2fe", color: "#0284c7" },
  delivered: { background: "#dcfce7", color: "#16a34a" },
  cancelled: { background: "#fee2e2", color: "#dc2626" },

  details: {
    marginBottom: "12px",
  },

  items: {
    borderTop: "1px solid #e2e8f0",
    paddingTop: "10px",
    marginBottom: "10px",
  },

  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
  },

  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontWeight: "800",
  },
};

export default AdminOrders;