import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Loader from "./Loader";

const SetupDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const img_url =
    "https://frostyghost23.alwaysdata.net/static/images/";

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://frostyghost23.alwaysdata.net/api/get_products"
      );

      const allProducts = response.data;

      setProducts(allProducts);

      const found =
        allProducts.find(
          (p) =>
            String(p.product_id) === String(id) ||
            String(p.id) === String(id)
        ) || null;

      setProduct(found);
    } catch (err) {
      console.log(err);
      alert("Failed to load setup");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) return <Loader />;

  if (!product) {
    return (
      <div style={styles.notFound}>
        <h1>Setup Not Found</h1>

        <button
          style={styles.backBtn}
          onClick={() => navigate("/gaming-setups")}
        >
          Back
        </button>
      </div>
    );
  }

  const related = products
    .filter(
      (p) =>
        p.category === product.category &&
        (p.product_id || p.id) !==
          (product.product_id || product.id)
    )
    .slice(0, 6);

  return (
    <div style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.overlay} />

        <img
          src={img_url + product.product_photo}
          alt={product.product_name}
          style={styles.heroImage}
        />

        <div style={styles.heroContent}>
          <span style={styles.category}>
            {product.category}
          </span>

          <h1 style={styles.title}>
            {product.product_name}
          </h1>

          <p style={styles.description}>
            {product.product_description}
          </p>

          <h2 style={styles.price}>
            KES {Number(product.product_cost).toLocaleString()}
          </h2>

          <div style={styles.actions}>
            <button
              style={styles.cartBtn}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>

            <button
              style={styles.buyBtn}
              onClick={() =>
                navigate("/makepayment", {
                  state: { product },
                })
              }
            >
              Buy Now
            </button>
          </div>
        </div>
      </section>

      {/* PERFORMANCE */}
      <section style={styles.performance}>
        <h2 style={styles.sectionTitle}>
          🎮 Estimated Gaming Performance
        </h2>

        <div style={styles.performanceGrid}>
          <div style={styles.performanceCard}>
            <h3>VALORANT</h3>
            <p>300+ FPS</p>
          </div>

          <div style={styles.performanceCard}>
            <h3>Warzone</h3>
            <p>180 FPS</p>
          </div>

          <div style={styles.performanceCard}>
            <h3>Cyberpunk</h3>
            <p>120 FPS</p>
          </div>

          <div style={styles.performanceCard}>
            <h3>Fortnite</h3>
            <p>240 FPS</p>
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section style={styles.specsSection}>
        <h2 style={styles.sectionTitle}>
          ⚡ Setup Specifications
        </h2>

        <div style={styles.specGrid}>
          <div style={styles.specCard}>
            <h3>CPU</h3>
            <p>Intel Core i7 / Ryzen 7</p>
          </div>

          <div style={styles.specCard}>
            <h3>GPU</h3>
            <p>RTX Series Graphics</p>
          </div>

          <div style={styles.specCard}>
            <h3>RAM</h3>
            <p>16GB / 32GB RGB RAM</p>
          </div>

          <div style={styles.specCard}>
            <h3>Storage</h3>
            <p>NVME SSD High Speed</p>
          </div>

          <div style={styles.specCard}>
            <h3>Cooling</h3>
            <p>RGB Liquid / Air Cooling</p>
          </div>

          <div style={styles.specCard}>
            <h3>RGB</h3>
            <p>Full Synchronised Lighting</p>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section style={styles.relatedSection}>
        <div style={styles.relatedHeader}>
          <h2 style={styles.sectionTitle}>
            🔥 Related Setups
          </h2>

          <button
            style={styles.backBtn}
            onClick={() => navigate("/gaming-setups")}
          >
            Browse More
          </button>
        </div>

        <div style={styles.relatedGrid}>
          {related.map((item) => (
            <div
              key={item.product_id || item.id}
              style={styles.relatedCard}
              onClick={() =>
                navigate(
                  `/gaming-setup/${
                    item.product_id || item.id
                  }`
                )
              }
            >
              <img
                src={img_url + item.product_photo}
                alt={item.product_name}
                style={styles.relatedImage}
              />

              <div style={styles.relatedContent}>
                <h3>{item.product_name}</h3>

                <p>
                  KES{" "}
                  {Number(
                    item.product_cost
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg,#020617,#0f172a,#111827)",
    color: "white",
    fontFamily: "Inter, sans-serif",
  },

  hero: {
    position: "relative",
    minHeight: "75vh",
    display: "grid",
    gridTemplateColumns: "minmax(320px,520px) 1fr",
    alignItems: "center",
    padding: "60px",
    gap: "40px",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at top left, rgba(37,99,235,0.25), transparent 35%)",
  },

  heroImage: {
    width: "100%",
    maxHeight: "520px",
    objectFit: "cover",
    borderRadius: "30px",
    zIndex: 2,
    boxShadow: "0 25px 80px rgba(0,0,0,0.45)",
  },

  heroContent: {
    zIndex: 2,
  },

  category: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "rgba(37,99,235,0.15)",
    color: "#93c5fd",
    fontWeight: "900",
    marginBottom: "20px",
  },

  title: {
    fontSize: "56px",
    lineHeight: "1",
    fontWeight: "950",
    marginBottom: "20px",
  },

  description: {
    color: "#94a3b8",
    lineHeight: "1.8",
    marginBottom: "25px",
  },

  price: {
    color: "#38bdf8",
    fontSize: "36px",
    marginBottom: "30px",
  },

  actions: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },

  cartBtn: {
    border: "none",
    padding: "14px 22px",
    borderRadius: "14px",
    background: "linear-gradient(135deg,#2563eb,#38bdf8)",
    color: "white",
    fontWeight: "900",
    cursor: "pointer",
  },

  buyBtn: {
    border: "1px solid rgba(255,255,255,0.15)",
    padding: "14px 22px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    fontWeight: "900",
    cursor: "pointer",
  },

  performance: {
    padding: "40px",
  },

  sectionTitle: {
    fontSize: "34px",
    fontWeight: "950",
    marginBottom: "24px",
  },

  performanceGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
  },

  performanceCard: {
    background: "rgba(255,255,255,0.05)",
    padding: "24px",
    borderRadius: "22px",
    border: "1px solid rgba(148,163,184,0.12)",
  },

  specsSection: {
    padding: "40px",
  },

  specGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
  },

  specCard: {
    background: "rgba(255,255,255,0.05)",
    padding: "24px",
    borderRadius: "22px",
    border: "1px solid rgba(148,163,184,0.12)",
  },

  relatedSection: {
    padding: "40px",
  },

  relatedHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "20px",
  },

  relatedGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(240px,1fr))",
    gap: "20px",
  },

  relatedCard: {
    background: "rgba(255,255,255,0.05)",
    borderRadius: "22px",
    overflow: "hidden",
    cursor: "pointer",
    border: "1px solid rgba(148,163,184,0.12)",
  },

  relatedImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
  },

  relatedContent: {
    padding: "18px",
  },

  backBtn: {
    border: "none",
    padding: "12px 18px",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#2563eb,#38bdf8)",
    color: "white",
    fontWeight: "900",
    cursor: "pointer",
  },

  notFound: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#020617",
    color: "white",
    gap: "20px",
  },
};

export default SetupDetails;