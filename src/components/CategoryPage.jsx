import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import SideSlider from "./SideSlider";
import ProductModal from "./ProductModal";
import { useNavigate } from "react-router-dom";

const CategoryPage = ({ category, title, subtitle }) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const img_url = "https://frostyghost23.alwaysdata.net/static/images/";

  const fetchProducts = async () => {
    setLoading(true);

    const response = await axios.get(
      "https://frostyghost23.alwaysdata.net/api/get_products"
    );

    const filtered = response.data.filter(
      (product) => product.category === category
    );

    setProducts(filtered);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  return (
    <div style={styles.page}>
      <SideSlider onToggle={setSidebarOpen} />

      <main
        style={{
          ...styles.main,
          marginLeft: sidebarOpen ? "250px" : "78px",
        }}
      >
        <section style={styles.hero}>
          <p style={styles.badge}>PrimeCore Categories</p>
          <h1 style={styles.heading}>{title}</h1>
          <p style={styles.subText}>{subtitle}</p>
        </section>

        {loading && <Loader />}

        {!loading && products.length === 0 && (
          <p style={styles.empty}>No items found in this category yet.</p>
        )}

        <section style={styles.grid}>
          {products.map((product) => (
            <div
              key={product.product_id}
              style={styles.card}
              onClick={() => setSelectedProduct(product)}
            >
              <img
                src={img_url + product.product_photo}
                alt={product.product_name}
                style={styles.image}
              />

              <div style={styles.cardBody}>
                <h3 style={styles.title}>{product.product_name}</h3>

                <p style={styles.desc}>
                  {product.product_description?.slice(0, 90)}...
                </p>

                <div style={styles.footer}>
                  <span style={styles.price}>
                    KES {Number(product.product_cost).toLocaleString()}
                  </span>

                  <button
                    style={styles.quickBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                  >
                    Quick View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          img_url={img_url}
          onClose={() => setSelectedProduct(null)}
          navigate={navigate}
        />
      )}
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, rgba(37,99,235,0.12), transparent 35%), linear-gradient(180deg, #f8fafc, #eef2ff)",
    fontFamily: "Inter, sans-serif",
  },

  main: {
    transition: "0.3s ease",
    paddingBottom: "70px",
  },

  hero: {
    textAlign: "center",
    padding: "55px 20px 30px",
  },

  badge: {
    display: "inline-block",
    padding: "8px 16px",
    borderRadius: "999px",
    background: "#dbeafe",
    color: "#2563eb",
    fontWeight: "900",
    fontSize: "13px",
  },

  heading: {
    fontSize: "46px",
    margin: "14px 0 8px",
    color: "#0f172a",
    fontWeight: "950",
  },

  subText: {
    color: "#64748b",
    fontSize: "15px",
    maxWidth: "620px",
    margin: "0 auto",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "24px",
    maxWidth: "1120px",
    margin: "0 auto",
    padding: "22px",
  },

  card: {
    background: "rgba(255,255,255,0.92)",
    borderRadius: "22px",
    overflow: "hidden",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    minHeight: "395px",
    boxShadow: "0 18px 45px rgba(15,23,42,0.09)",
    border: "1px solid rgba(226,232,240,0.9)",
  },

  image: {
    width: "100%",
    height: "225px",
    objectFit: "cover",
  },

  cardBody: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },

  title: {
    padding: "14px 16px 0",
    fontSize: "16px",
    fontWeight: "900",
    color: "#0f172a",
  },

  desc: {
    padding: "7px 16px",
    fontSize: "13px",
    color: "#64748b",
  },

  footer: {
    marginTop: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
  },

  price: {
    fontWeight: "950",
    color: "#2563eb",
  },

  quickBtn: {
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "white",
    border: "none",
    padding: "9px 13px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "800",
    fontSize: "12px",
  },

  empty: {
    textAlign: "center",
    color: "#64748b",
    fontWeight: "800",
  },
};

export default CategoryPage;