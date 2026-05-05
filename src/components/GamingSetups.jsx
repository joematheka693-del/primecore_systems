import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Loader from "./Loader";
import ProductModal from "./ProductModal";
import "../App.css";

const GamingSetups = () => {
  const [setups, setSetups] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const { addToCart, cart } = useContext(CartContext);
  const navigate = useNavigate();

  const img_url = "https://frostyghost23.alwaysdata.net/static/images/";

  // 🔥 FETCH SETUPS (you can later connect real API)
  const fetchSetups = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://frostyghost23.alwaysdata.net/api/get_products"
      );
      setSetups(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSetups();
  }, []);

  // 🔍 SEARCH + FILTER + CATEGORY
  useEffect(() => {
    let data = [...setups];

    if (search) {
      data = data.filter((p) =>
        p.product_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      data = data.filter((p) => p.category === category);
    }

    setFiltered(data);
  }, [search, category, setups]);

  return (
    <div style={styles.page}>

      {/* HERO */}
      <div style={styles.hero}>
        <h1>Gaming Setups Marketplace</h1>
        <p>RGB builds • Desks • Accessories • Full Gaming Stations</p>

        <input
          placeholder="Search setups..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        <div style={styles.categories}>
          {["all", "RGB Setup", "Desk Setup", "Full Rig", "Accessories"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  ...styles.catBtn,
                  background: category === cat ? "#2563eb" : "white",
                  color: category === cat ? "white" : "#2563eb",
                }}
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* LOADING */}
      {loading && <Loader />}

      {/* STATS BAR */}
      <div style={styles.stats}>
        <span>🛒 Cart Items: {cart.length}</span>
        <span>🔥 Live Marketplace</span>
      </div>

      {/* GRID */}
      <div style={styles.grid}>
        {filtered.map((item) => (
          <div key={item.id} style={styles.card}>

            {/* ADD BUTTON (+) */}
            <button
              style={styles.plusBtn}
              onClick={() => addToCart(item)}
            >
              +
            </button>

            <img
              src={img_url + item.product_photo}
              style={styles.image}
              alt=""
            />

            <div style={styles.content}>
              <h3>{item.product_name}</h3>

              <p style={styles.desc}>
                {item.product_description?.slice(0, 80)}...
              </p>

              <div style={styles.price}>
                KES {item.product_cost}
              </div>

              <div style={styles.actions}>

                <button
                  style={styles.viewBtn}
                  onClick={() => setSelected(item)}
                >
                  View
                </button>

                <button
                  style={styles.buyBtn}
                  onClick={() =>
                    navigate("/makepayment", {
                      state: { product: item, type: "buyNow" },
                    })
                  }
                >
                  Buy Now
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <ProductModal
          product={selected}
          img_url={img_url}
          onClose={() => setSelected(null)}
          addToCart={addToCart}
          navigate={navigate}
        />
      )}
    </div>
  );
};

/* 🎨 STYLES */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#0b1220",
    color: "white",
    fontFamily: "Arial",
    paddingBottom: "50px",
  },

  hero: {
    textAlign: "center",
    padding: "40px 20px",
    background: "linear-gradient(135deg,#0f172a,#1e293b)",
  },

  search: {
    padding: "10px",
    width: "250px",
    borderRadius: "10px",
    border: "none",
    marginTop: "10px",
  },

  categories: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
  },

  catBtn: {
    padding: "8px 12px",
    borderRadius: "20px",
    border: "1px solid #2563eb",
    cursor: "pointer",
  },

  stats: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 30px",
    color: "#94a3b8",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
    gap: "20px",
    padding: "20px",
    maxWidth: "1200px",
    margin: "auto",
  },

  card: {
    background: "#111827",
    borderRadius: "15px",
    overflow: "hidden",
    position: "relative",
  },

  plusBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "none",
    background: "#2563eb",
    color: "white",
    fontSize: "20px",
    cursor: "pointer",
  },

  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },

  content: {
    padding: "12px",
  },

  desc: {
    fontSize: "13px",
    color: "#94a3b8",
  },

  price: {
    marginTop: "10px",
    fontWeight: "bold",
    color: "#38bdf8",
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  viewBtn: {
    flex: 1,
    marginRight: "5px",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #2563eb",
    background: "transparent",
    color: "white",
    cursor: "pointer",
  },

  buyBtn: {
    flex: 1,
    padding: "8px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  },
};

export default GamingSetups;