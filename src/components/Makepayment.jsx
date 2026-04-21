import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import Loader from "./Loader";

const Makepayment = () => {
  const { product } = useLocation().state || {};
  const navigate = useNavigate();

  const img_url = "https://frostyghost23.alwaysdata.net/static/images/";

  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");

  const [loadingText, setLoadingText] = useState("🚀 Processing secure payment...");
  const [waitingText, setWaitingText] = useState("📲 Check your phone to complete payment...");

  const isValidPhone = (phone) => /^254\d{9}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatusMessage("");

    if (!isValidPhone(number)) {
      setError("Enter a valid phone number (254XXXXXXXXX)");
      return;
    }

    setLoading(true);
    setStatusMessage(loadingText);

    try {
      const formdata = new FormData();
      formdata.append("phone", number);
      formdata.append("amount", product.product_cost);

      const response = await axios.post(
        "https://kbenkamotho.alwaysdata.net/api/mpesa_payment",
        formdata
      );

      setStatusMessage(waitingText);

      setTimeout(() => {
        setLoading(false);
        setStatusMessage(response.data.message || "✅ Payment request sent!");
      }, 2000);

    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message);
    }
  };

  if (!product) {
    return (
      <div className="text-center text-light mt-5">
        <h3>No product selected</h3>
        <button className="btn btn-info mt-3" onClick={() => navigate("/products")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #0f2027, #020305)",
      }}
    >
      <div className="col-md-10">

        {/* Back Button */}
        <button
          className="btn mb-4"
          style={{
            background: "transparent",
            border: "1px solid #00f2ff",
            color: "#00f2ff",
            boxShadow: "0 0 15px #00f2ff",
            borderRadius: "50px",
            padding: "8px 20px"
          }}
          onClick={() => navigate("/products")}
        >
          ← Back
        </button>

        <div
          className="row g-4 p-4"
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(20px)",
            borderRadius: "25px",
            boxShadow: "0 0 40px rgba(0,255,255,0.15)",
            border: "1px solid rgba(0,255,255,0.2)"
          }}
        >

          {/* PRODUCT */}
          <div className="col-md-6 text-light">
            <div style={{ position: "relative" }}>
              <img
                src={img_url + product.product_photo}
                alt={product.product_name}
                style={{
                  width: "100%",
                  height: "280px",
                  objectFit: "cover",
                  borderRadius: "20px",
                  boxShadow: "0 0 25px rgba(0,255,255,0.4)",
                }}
              />
              <div style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                background: "rgba(0,0,0,0.6)",
                padding: "6px 12px",
                borderRadius: "10px",
                color: "#00ff9f",
                fontWeight: "bold"
              }}>
                KES {product.product_cost}
              </div>
            </div>

            <h2 className="mt-3" style={{ color: "#00f2ff" }}>
              {product.product_name}
            </h2>

            <p style={{ color: "#aaa", lineHeight: "1.6" }}>
              {product.product_description}
            </p>
          </div>

          {/* PAYMENT */}
          <div className="col-md-6 text-light">

            <h3 className="text-center mb-4" style={{ color: "#00f2ff", letterSpacing: "1px" }}>
              💳 Secure Checkout
            </h3>

            <div className="mb-3">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Edit loading text..."
                value={loadingText}
                onChange={(e) => setLoadingText(e.target.value)}
              />

              <input
                type="text"
                className="form-control"
                placeholder="Edit waiting text..."
                value={waitingText}
                onChange={(e) => setWaitingText(e.target.value)}
              />
            </div>

            <form onSubmit={handleSubmit}>

              {loading && <Loader />}

              <p className="text-info text-center">{statusMessage}</p>
              <p className="text-danger text-center">{error}</p>

              <input
                type="number"
                className="form-control mb-3"
                placeholder="254XXXXXXXXX"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid #00f2ff",
                  color: "#fff",
                  borderRadius: "10px",
                  padding: "12px",
                }}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-100"
                style={{
                  background: "linear-gradient(90deg, #00f2ff, #00ff9f)",
                  border: "none",
                  color: "#000",
                  fontWeight: "bold",
                  padding: "12px",
                  borderRadius: "50px",
                  boxShadow: "0 0 20px #00f2ff",
                  transition: "0.3s",
                }}
              >
                {loading ? "Processing..." : "⚡ Pay Now"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Makepayment;
