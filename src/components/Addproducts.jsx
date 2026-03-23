import React, { useState } from 'react';
import Loader from './Loader';
import axios from 'axios';

const Addproducts = () => {

  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formdata = new FormData();
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo);

      const response = await axios.post(
        "http://frostyghost23.alwaysdata.net/api/add_product",
        formdata
      );

      setLoading(false);
      setSuccess(response.data.message);

      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");

      e.target.reset();

      setTimeout(() => setSuccess(""), 4000);

    } catch (error) {
      setLoading(false);
      setError("System Error: " + error.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0f1a, #1a1a2e, #000000)",
        color: "#fff",
      }}
    >

      <div
        className="card p-4 col-md-8"
        style={{
          background: "rgba(20, 20, 40, 0.9)",
          borderRadius: "15px",
          boxShadow: "0 0 25px rgba(0,255,255,0.2)",
          border: "1px solid rgba(0,255,255,0.2)",
        }}
      >

        <h2 className="text-center mb-2" style={{ color: "#00ffff" }}>
          PrimeCore Systems
        </h2>

        <h5 className="text-center mb-4" style={{ color: "#aaa" }}>
          Add New Gaming Rig
        </h5>

        {loading && <Loader />}

        {success && <div className="alert alert-success">{success}</div>}

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter PC Name"
            className="form-control mb-3"
            required
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Enter PC Description"
            className="form-control mb-3"
            required
            value={product_description}
            onChange={(e) => setProductDescription(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Enter Price"
            className="form-control mb-3"
            required
            value={product_cost}
            onChange={(e) => setProductCost(e.target.value)}
            style={inputStyle}
          />

          <label 
          style={{ color: "#00ffff", fontSize: "14px" }}>
            <h5>Upload PC Image</h5>
          </label> <br /> 

          <input
            type="file"
            className="form-control mb-3"
            required
            accept="image/*"
            onChange={(e) => setProductPhoto(e.target.files[0])}
            style={inputStyle}
          />

          <button
            type="submit"
            className="btn w-100"
            style={{
              background: "linear-gradient(90deg, #00ffff, #00ffcc)",
              border: "none",
              color: "#000",
              fontWeight: "bold",
              boxShadow: "0 0 10px #00ffff",
            }}
          >
            Deploy PC
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  background: "transparent",
  border: "1px solid rgba(0,255,255,0.3)",
  color: "#fff",
};

export default Addproducts;