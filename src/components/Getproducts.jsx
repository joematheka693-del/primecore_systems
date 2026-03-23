import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import '../App.css'
import '../css/card.css'

const Getproducts = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const img_url = "https://frostyghost23.alwaysdata.net/static/images/"

  const fetchProducts = async() => {
    try{
      setLoading(true)
      const response = await axios.get("http://frostyghost23.alwaysdata.net/api/get_products")
      setProducts(response.data)
      setLoading(false)
    }
    catch(error){
      setLoading(false)
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div
      className='container-fluid py-2'
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a, #111827, #1f2937)',
        color: '#e5e7eb'
      }}
    >
      {/* NAVBAR */}
      <nav className="d-flex justify-content-between align-items-center p-3">
        <h3 style={{ color: '#ffffff', letterSpacing: '1px', }}>
          <a href="/"
          className='anchor'
          style={{
            color: "#00ffff"
          }}>
            PrimeCore Systems
            </a>
        </h3>
        <div>

          <button
            className="btn m-2"
            style={navBtn}
            onClick={() => navigate('/signin')}>
            Sign In
          </button>

          <button
            className="btn m-2"
            style={navBtn}
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>

          <button
            className="btn m-2"
            style={navBtn}
            onClick={() => navigate('/addproduct')}>
            Add Product
          </button>

        </div>
      </nav> <hr />

      <h2 className="text-center text-info mb-4 fw-bold">
        Available PCs
      </h2>

      {loading && <Loader />}
      {error && <h5 className="text-center text-danger">{error}</h5>}

      <div className="row justify-content-center">
        {products.map((product) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
            
            <div
              className="card h-100 shadow-lg border-0"
              style={{
                background: '#111827',
                borderRadius: '15px',
                overflow: 'hidden',
                transition: '0.3s ease'
              }}
            >
              <img
                src={img_url + product.product_photo}
                alt={product.product_name}
                style={{
                  height: '250px',
                  objectFit: 'cover'
                }}
              />

              <div className="card-body d-flex flex-column">
                <h5 className="text-info fw-bold">
                  {product.product_name}
                </h5>

                <p className="text-light small flex-grow-1">
                  {product.product_description.slice(0, 120)}...
                </p>

                <h4 className="text-warning fw-bold">
                  Ksh {product.product_cost}
                </h4>

                <button
                  className="btn btn-outline-info mt-2 w-100"
                  onClick={() => navigate("/makepayment", { state: { product } })}
                  style={{
                    borderRadius: '10px'
                  }}
                >
                  Purchase Now
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

const navBtn = {
  background: 'transparent',
  border: '1px solid #e5e7eb',
  color: "#00ffff"
};


export default Getproducts;