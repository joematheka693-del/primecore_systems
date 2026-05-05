import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ProductModal from "./ProductModal";
import SideSlider from "./SideSlider";

const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const [priceFilter, setPriceFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");

  const navigate = useNavigate();

  const cartContext = useContext(CartContext);
  const addToCart = cartContext?.addToCart;

  const img_url = "https://frostyghost23.alwaysdata.net/static/images/";

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://frostyghost23.alwaysdata.net/api/get_products"
      );

      setProducts(response.data);
      setFiltered(response.data);
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

useEffect(() => {
  let result = [...products];

  const query = search.toLowerCase().trim();

  if (query) {
    result = result.filter((p) =>
      p.product_name.toLowerCase().includes(query)
    );
  }

  if (priceFilter === "low") {
    result = result.filter((p) => Number(p.product_cost) < 50000);
  }

  if (priceFilter === "mid") {
    result = result.filter(
      (p) => Number(p.product_cost) >= 50000 && Number(p.product_cost) <= 100000
    );
  }

  if (priceFilter === "high") {
    result = result.filter((p) => Number(p.product_cost) > 100000);
  }

  if (tierFilter !== "all") {
    result = result.filter((p) => {
      const text = `${p.product_name} ${p.product_description}`.toLowerCase();

      if (tierFilter === "entry") {
        return text.includes("i3") || text.includes("ryzen 3") || text.includes("gtx");
      }

      if (tierFilter === "mid") {
        return text.includes("i5") || text.includes("ryzen 5") || text.includes("rtx 3050") || text.includes("rtx 3060");
      }

      if (tierFilter === "high") {
        return text.includes("i7") || text.includes("i9") || text.includes("ryzen 7") || text.includes("rtx 3070") || text.includes("rtx 3080") || text.includes("rtx 4070");
      }

      return true;
    });
  }

  setFiltered(result);
}, [search, products, priceFilter, tierFilter]);

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
          <p style={styles.badge}>PrimeCore Store</p>
          <h1 style={styles.heading}>Gaming PCs</h1>

          <p style={styles.subText}>
            Browse performance-ready PCs built for gaming, productivity, and power users.
          </p>

          <input
            type="text"
            placeholder="Search gaming PCs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
          />

          <div style={styles.filters}>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              style={styles.select}
            >
              <option value="all">All Prices</option>
              <option value="low">Below KES 50,000</option>
              <option value="mid">KES 50,000 - 100,000</option>
              <option value="high">Above KES 100,000</option>
            </select>

            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              style={styles.select}
            >
              <option value="all">All Performance</option>
              <option value="entry">Entry Gaming</option>
              <option value="mid">Mid Range</option>
              <option value="high">High Performance</option>
            </select>
          </div>
        </section>

        {loading && <Loader />}
        {error && <p style={styles.error}>{error}</p>}

        {!loading && filtered.length === 0 && (
          <p style={styles.empty}>No PCs found</p>
        )}

        <section style={styles.grid}>
          {filtered.map((product) => (
            <div 
            className="product-card"
              key={product.id}
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
                  <span style={styles.price}>KES {product.product_cost}</span>

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
          addToCart={addToCart}
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
    padding: "70px 20px 40px",
    background:
      "radial-gradient(circle at top, rgba(37,99,235,0.2), transparent 50%)",
  },

  badge: {
    display: "inline-block",
    padding: "8px 16px",
    borderRadius: "999px",
    background: "#dbeafe",
    color: "#2563eb",
    fontWeight: "900",
    fontSize: "13px",
    boxShadow: "0 8px 20px rgba(37,99,235,0.12)",
  },

  heading: {
    fontSize: "52px",
    margin: "16px 0 10px",
    color: "#020617",
    fontWeight: "1000",
    letterSpacing: "-1px"
  },

  subText: {
    color: "#64748b",
    fontSize: "15px",
    maxWidth: "620px",
    margin: "0 auto 22px",
  },

  search: {
    padding: "14px 18px",
    width: "320px",
    borderRadius: "999px",
    border: "1px solid rgba(148,163,184,0.4)",
    outline: "none",
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 15px 40px rgba(15,23,42,0.12)",
    fontWeight: "600"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "24px",
    maxWidth: "1120px",
    margin: "0 auto",
    padding: "22px",
    alignItems: "stretch",
  },

  card: {
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(12px)",
    borderRadius: "24px",
    overflow: "hidden",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    minHeight: "400px",
    boxShadow: "0 25px 60px rgba(15,23,42,0.12)",
    border: "1px solid rgba(226,232,240,0.8)",
    transition: "all 0.35s ease",
  },

  image: {
    width: "100%",
    height: "225px",
    objectFit: "cover",
    objectPosition: "center",
    display: "block",
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
    lineHeight: "1.3",
  },

  desc: {
    padding: "7px 16px",
    fontSize: "13px",
    color: "#64748b",
    lineHeight: "1.4",
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
    fontSize: "15px",
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
    boxShadow: "0 10px 22px rgba(15,23,42,0.22)",
  },

  error: {
    textAlign: "center",
    color: "red",
  },

  empty: {
    textAlign: "center",
    color: "#64748b",
  },

  filters: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginTop: "18px",
    flexWrap: "wrap",
  },

  select: {
    padding: "12px 14px",
    borderRadius: "999px",
    border: "1px solid rgba(148,163,184,0.45)",
    background: "rgba(255,255,255,0.8)",
    fontWeight: "700",
    outline: "none",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
  },
};

export default Getproducts;