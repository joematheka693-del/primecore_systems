import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQty,
    decreaseQty,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + Number(item.product_cost) * (item.quantity || 1),
    0
  );

  return (
    <div style={styles.page}>
      <section style={styles.header}>
        <div>
          <p style={styles.badge}>PrimeCore Cart</p>
          <h1 style={styles.title}>Your Cart</h1>
          <p style={styles.subtitle}>
            Review your selected products before checkout.
          </p>
        </div>

        <button style={styles.backBtn} onClick={() => navigate("/products")}>
          ← Continue Shopping
        </button>
      </section>

      {cart.length === 0 ? (
        <div style={styles.emptyCard}>
          <h2>Your cart is empty 🛒</h2>
          <p>Add gaming PCs or accessories to continue.</p>

          <button style={styles.primaryBtn} onClick={() => navigate("/products")}>
            Browse Products
          </button>
        </div>
      ) : (
        <section style={styles.layout}>
          <div style={styles.cartList}>
            {cart.map((item) => (
              <div key={item.product_id || item.id} style={styles.card}>
                <img
                  src={
                    "https://frostyghost23.alwaysdata.net/static/images/" +
                    item.product_photo
                  }
                  style={styles.img}
                  alt={item.product_name}
                />

                <div style={styles.info}>
                  <h3 style={styles.productTitle}>{item.product_name}</h3>

                  <p style={styles.desc}>
                    {item.product_description?.slice(0, 80)}...
                  </p>

                  <strong style={styles.price}>
                    KES {Number(item.product_cost).toLocaleString()}
                  </strong>

                  <div style={styles.qtyBox}>
                    <button style={styles.qtyBtn} onClick={() => decreaseQty(item)}>
                      −
                    </button>

                    <span style={styles.qty}>{item.quantity || 1}</span>

                    <button style={styles.qtyBtn} onClick={() => increaseQty(item)}>
                      +
                    </button>
                  </div>
                </div>

                <button
                  style={styles.removeBtn}
                  onClick={() => removeFromCart(item)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <aside style={styles.summary}>
            <h2>Order Summary</h2>

            <div style={styles.summaryRow}>
              <span>Items</span>
              <strong>{cart.length}</strong>
            </div>

            <div style={styles.summaryRow}>
              <span>Total</span>
              <strong>KES {total.toLocaleString()}</strong>
            </div>

            <button
              style={styles.checkoutBtn}
              onClick={() =>
                navigate("/makepayment", {
                  state: {
                    cart,
                    type: "cart",
                  },
                })
              }
            >
              Checkout with M-Pesa
            </button>

            <button style={styles.clearBtn} onClick={clearCart}>
              Clear Cart
            </button>
          </aside>
        </section>
      )}
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
    gridTemplateColumns: "1.5fr 0.8fr",
    gap: "25px",
    alignItems: "start",
  },

  cartList: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  card: {
    background: "rgba(255,255,255,0.92)",
    borderRadius: "24px",
    padding: "18px",
    display: "grid",
    gridTemplateColumns: "120px 1fr auto",
    gap: "18px",
    alignItems: "center",
    boxShadow: "0 20px 55px rgba(15,23,42,0.1)",
    border: "1px solid rgba(226,232,240,0.9)",
  },

  img: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "18px",
  },

  productTitle: {
    margin: "0 0 6px",
    color: "#020617",
    fontWeight: "950",
  },

  desc: {
    color: "#64748b",
    fontSize: "14px",
    marginBottom: "8px",
  },

  price: {
    color: "#2563eb",
    fontSize: "16px",
  },

  qtyBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "12px",
  },

  qtyBtn: {
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    border: "none",
    background: "#dbeafe",
    color: "#2563eb",
    fontWeight: "900",
    cursor: "pointer",
  },

  qty: {
    fontWeight: "900",
    color: "#0f172a",
  },

  removeBtn: {
    background: "#fee2e2",
    color: "#dc2626",
    border: "none",
    padding: "10px 13px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "900",
  },

  summary: {
    background: "rgba(255,255,255,0.92)",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 25px 70px rgba(15,23,42,0.12)",
    border: "1px solid rgba(226,232,240,0.9)",
    position: "sticky",
    top: "95px",
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 0",
    borderBottom: "1px solid #e2e8f0",
    color: "#334155",
  },

  checkoutBtn: {
    width: "100%",
    marginTop: "18px",
    padding: "14px",
    border: "none",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #2563eb, #0f172a)",
    color: "white",
    cursor: "pointer",
    fontWeight: "950",
    boxShadow: "0 18px 40px rgba(37,99,235,0.35)",
  },

  clearBtn: {
    width: "100%",
    marginTop: "12px",
    padding: "12px",
    border: "none",
    borderRadius: "14px",
    background: "#e2e8f0",
    color: "#0f172a",
    cursor: "pointer",
    fontWeight: "900",
  },

  emptyCard: {
    background: "rgba(255,255,255,0.9)",
    padding: "40px",
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
};

export default Cart;