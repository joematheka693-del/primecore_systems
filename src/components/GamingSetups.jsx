import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Loader from "./Loader";
import ProductModal from "./ProductModal";

const GamingSetups = () => {
  const [setups, setSetups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const navigate = useNavigate();

  const { addToCart, cart } = useContext(CartContext);

  const img_url = "https://frostyghost23.alwaysdata.net/static/images/";

  const cartCount = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const fetchSetups = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://frostyghost23.alwaysdata.net/api/get_products"
      );

      setSetups(response.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load setups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSetups();
  }, []);

  const rgbSetups = setups.filter((p) =>
    `${p.product_name} ${p.product_description}`
      .toLowerCase()
      .includes("rgb")
  );

  const deskSetups = setups.filter((p) =>
    `${p.product_name} ${p.product_description}`
      .toLowerCase()
      .includes("desk")
  );

  const premiumSetups = setups.filter(
    (p) => Number(p.product_cost) > 100000
  );

  const accessories = setups.filter(
    (p) => p.category === "accessories"
  );

  const budgetBuilds = setups.filter(
    (p) => Number(p.product_cost) < 80000
  );

  return (
    <div style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.overlay} />

        <div style={styles.heroContent}>
          <p style={styles.badge}>PrimeCore Marketplace</p>

          <h1 style={styles.heroTitle}>
            Elite Gaming Setup Showcase
          </h1>

          <p style={styles.heroSubtitle}>
            Discover RGB battlestations, premium gaming rigs,
            minimal desk setups, and next-generation accessories.
          </p>

          <div style={styles.heroButtons}>
            <button
              style={styles.primaryBtn}
              onClick={() => navigate("/products")}
            >
              Browse Products
            </button>

            <button
              style={styles.secondaryBtn}
              onClick={() => navigate("/cart")}
            >
              🛒 Cart ({cartCount})
            </button>
          </div>
        </div>
      </section>

      {loading && <Loader />}

      {!loading && (
        <>
          <SetupRow
            title="🔥 Featured RGB Setups"
            subtitle="Immersive RGB battlestations with synchronized lighting."
            products={rgbSetups}
            img_url={img_url}
            addToCart={addToCart}
            setSelected={setSelected}
            navigate={navigate}
          />

          <SetupRow
            title="🎮 Ultimate Gaming Rigs"
            subtitle="High-end builds engineered for elite performance."
            products={premiumSetups}
            img_url={img_url}
            addToCart={addToCart}
            setSelected={setSelected}
            navigate={navigate}
          />

          <SetupRow
            title="🖥️ Minimal Desk Setups"
            subtitle="Clean productivity and aesthetic-focused workspaces."
            products={deskSetups}
            img_url={img_url}
            addToCart={addToCart}
            setSelected={setSelected}
            navigate={navigate}
          />

          <SetupRow
            title="⚡ Budget Builds"
            subtitle="Affordable setups without sacrificing performance."
            products={budgetBuilds}
            img_url={img_url}
            addToCart={addToCart}
            setSelected={setSelected}
            navigate={navigate}
          />

          <SetupRow
            title="💎 Accessories & Peripherals"
            subtitle="RGB gear, keyboards, mice, headsets, and setup essentials."
            products={accessories}
            img_url={img_url}
            addToCart={addToCart}
            setSelected={setSelected}
            navigate={navigate}
          />
        </>
      )}

      {selected && (
        <ProductModal
          product={selected}
          img_url={img_url}
          onClose={() => setSelected(null)}
          navigate={navigate}
        />
      )}
    </div>
  );
};

const SetupRow = ({
  title,
  subtitle,
  products,
  img_url,
  addToCart,
  setSelected,
  navigate,
}) => {
  const rowRef = useRef();

  const scroll = (direction) => {
    if (!rowRef.current) return;

    rowRef.current.scrollBy({
      left: direction === "left" ? -420 : 420,
      behavior: "smooth",
    });
  };

  if (products.length === 0) return null;

  return (
    <section style={styles.section}>
      <div style={styles.sectionHeader}>
        <div>
          <h2 style={styles.sectionTitle}>{title}</h2>
          <p style={styles.sectionSubtitle}>{subtitle}</p>
        </div>

        <div style={styles.arrows}>
          <button
            style={styles.arrowBtn}
            onClick={() => scroll("left")}
          >
            ←
          </button>

          <button
            style={styles.arrowBtn}
            onClick={() => scroll("right")}
          >
            →
          </button>
        </div>
      </div>

      <div style={styles.row} ref={rowRef}>
        {products.map((item) => (
          <div
            key={item.product_id || item.id}
            style={styles.card}
          >
            <button
              style={styles.plusBtn}
              onClick={() => addToCart(item)}
            >
              +
            </button>

            <img
              src={img_url + item.product_photo}
              alt={item.product_name}
              style={styles.image}
            />

            <div style={styles.cardContent}>
              <span style={styles.category}>
                {item.category || "setup"}
              </span>

              <h3 style={styles.productTitle}>
                {item.product_name}
              </h3>

              <p style={styles.desc}>
                {item.product_description?.slice(0, 85)}...
              </p>

              <div style={styles.footer}>
                <strong style={styles.price}>
                  KES {Number(item.product_cost).toLocaleString()}
                </strong>

                <div style={styles.buttons}>
                  <button
                    style={styles.viewBtn}
                    onClick={() =>
                      navigate(`/gaming-setup/${item.product_id || item.id}`)
                    }
                  >
                    View
                  </button>

                  <button
                    style={styles.buyBtn}
                    onClick={() =>
                      navigate("/makepayment", {
                        state: { product: item },
                      })
                    }
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg,#020617,#0f172a,#111827)",
    color: "white",
    fontFamily: "Inter, sans-serif",
    overflowX: "hidden",
  },

  hero: {
    position: "relative",
    minHeight: "75vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    textAlign: "center",
    background:
      "radial-gradient(circle at top, rgba(37,99,235,0.35), transparent 40%)",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to bottom, rgba(2,6,23,0.2), rgba(2,6,23,0.9))",
  },

  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: "850px",
  },

  badge: {
    display: "inline-block",
    padding: "8px 16px",
    borderRadius: "999px",
    background: "rgba(37,99,235,0.15)",
    color: "#93c5fd",
    fontWeight: "900",
    marginBottom: "20px",
  },

  heroTitle: {
    fontSize: "64px",
    lineHeight: "1",
    marginBottom: "20px",
    fontWeight: "950",
    letterSpacing: "-2px",
  },

  heroSubtitle: {
    color: "#94a3b8",
    fontSize: "18px",
    lineHeight: "1.7",
    marginBottom: "30px",
  },

  heroButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    border: "none",
    padding: "14px 20px",
    borderRadius: "14px",
    background: "linear-gradient(135deg,#2563eb,#38bdf8)",
    color: "white",
    fontWeight: "900",
    cursor: "pointer",
  },

  secondaryBtn: {
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "14px 20px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    fontWeight: "900",
    cursor: "pointer",
  },

  section: {
    padding: "20px 0 35px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 28px 18px",
    gap: "20px",
  },

  sectionTitle: {
    fontSize: "28px",
    marginBottom: "6px",
    fontWeight: "950",
  },

  sectionSubtitle: {
    color: "#94a3b8",
  },

  arrows: {
    display: "flex",
    gap: "10px",
  },

  arrowBtn: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    border: "none",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    cursor: "pointer",
    fontSize: "18px",
  },

  row: {
    display: "flex",
    gap: "20px",
    overflowX: "auto",
    padding: "10px 28px",
    scrollBehavior: "smooth",
  },

  card: {
    minWidth: "320px",
    maxWidth: "320px",
    background: "rgba(17,24,39,0.95)",
    borderRadius: "24px",
    overflow: "hidden",
    position: "relative",
    border: "1px solid rgba(148,163,184,0.15)",
    boxShadow: "0 25px 70px rgba(0,0,0,0.4)",
    flexShrink: 0,

    display: "flex",
    flexDirection: "column",

    transition: "0.3s ease",
  },

  plusBtn: {
    position: "absolute",
    top: "12px",
    right: "12px",
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    border: "none",
    background: "linear-gradient(135deg,#2563eb,#38bdf8)",
    color: "white",
    fontWeight: "900",
    fontSize: "22px",
    cursor: "pointer",
    zIndex: 2,
  },

  image: {
    width: "100%",
    height: "240px",
    objectFit: "cover",
    flexShrink: 0,
  },

  cardContent: {
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: "220px",
  },

  category: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: "999px",
    background: "rgba(37,99,235,0.15)",
    color: "#93c5fd",
    fontSize: "12px",
    fontWeight: "900",
    textTransform: "capitalize",
  },

  productTitle: {
    marginTop: "12px",
    marginBottom: "10px",
    fontWeight: "950",
    lineHeight: "1.3",

    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",

    minHeight: "54px",
  },

  desc: {
    color: "#94a3b8",
    fontSize: "13px",
    lineHeight: "1.7",

    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",

    minHeight: "68px",
  },

  footer: {
    marginTop: "auto",
    paddingTop: "18px",
  },

  price: {
    color: "#38bdf8",
    fontSize: "17px",
  },

  buttons: {
    display: "flex",
    gap: "10px",
    marginTop: "14px",
  },

  viewBtn: {
    flex: 1,
    padding: "10px",
    borderRadius: "12px",
    border: "1px solid rgba(147,197,253,0.25)",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    fontWeight: "900",
  },

  buyBtn: {
    flex: 1,
    padding: "10px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg,#2563eb,#0f172a)",
    color: "white",
    cursor: "pointer",
    fontWeight: "900",
  },
};

export default GamingSetups;