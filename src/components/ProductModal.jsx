import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductModal = ({ product, img_url, onClose, navigate }) => {
  const { addToCart } = useContext(CartContext);

  if (!product) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal}>
        <div style={styles.content}>

          {/* LEFT IMAGE */}
          <div style={styles.imageBox}>
            <img
              src={img_url + product.product_photo}
              alt={product.product_name}
              style={styles.image}
            />
          </div>

          {/* RIGHT DETAILS */}
          <div style={styles.details}>
            <h2 style={styles.title}>{product.product_name}</h2>

            <p style={styles.desc}>
              {product.product_description?.slice(0, 140)}...
            </p>

            <h3 style={styles.price}>
              KES {Number(product.product_cost).toLocaleString()}
            </h3>

            <div style={styles.actions}>
              <button
                style={styles.cartBtn}
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
              >
                Add to Cart
              </button>

              <button
                style={styles.buyBtn}
                onClick={() =>
                  navigate("/makepayment", { state: { product } })
                }
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <button style={styles.close} onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,0.65)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3000,
  },

  modal: {
    width: "650px",
    background: "white",
    borderRadius: "22px",
    padding: "20px",
    position: "relative",
    boxShadow: "0 30px 80px rgba(0,0,0,0.3)",
  },

  content: {
    display: "flex",
    gap: "18px",
  },

  imageBox: {
    flex: 1,
  },

  image: {
    width: "100%",
    height: "240px",
    objectFit: "cover",
    borderRadius: "16px",
  },

  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  title: {
    fontWeight: "950",
    marginBottom: "6px",
  },

  desc: {
    fontSize: "14px",
    color: "#475569",
    lineHeight: "1.5",
  },

  price: {
    color: "#2563eb",
    fontWeight: "950",
    marginTop: "8px",
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "12px",
  },

  cartBtn: {
    flex: 1,
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "900",
  },

buyBtn: {
  flex: 1,
  background: "#0f172a",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "900",
},

  close: {
    position: "absolute",
    top: "10px",
    right: "12px",
    background: "white",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    borderRadius: "50%",
  },
};

export default ProductModal;