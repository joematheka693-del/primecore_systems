import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a, #111827, #1f2937, #f9fafb)',
        color: '#e5e7eb',
        fontFamily: 'sans-serif'
      }}
    >

      {/* NAVBAR */}
      <nav className="d-flex justify-content-between align-items-center p-3">
        <h3 style={{ color: '#ffffff', letterSpacing: '1px' }}>
          PrimeCore Systems
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
      </nav>

      {/* HERO SECTION */}
      <div className="text-center mt-5 px-3">
        <h1 style={{ fontSize: '3rem', color: '#ffffff', fontWeight: 'bold' }}>
          Engineered for Gamers
        </h1>
        <p style={{ color: '#d1d5db', fontSize: '18px' }}>
          Build your ultimate gaming setup with PrimeCore Systems
        </p>

        <button
          className="btn mt-4"
          style={ctaBtn}
          onClick={() => navigate('/products')}
        >
          Explore Products
        </button>
      </div>

      {/* FEATURES */}
      <div className="container mt-5">
        <div className="row text-center">

          <div className="col-md-4 mb-4">
            <div className="card p-4" style={cardStyle}>
              <h4 style={{ color: '#ffffff' }}>Custom PCs</h4>
              <p style={{ color: '#e5e7eb' }}>
                High-performance gaming rigs built for power and speed.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card p-4" style={cardStyle}>
              <h4 style={{ color: '#ffffff' }}>Gaming Setups</h4>
              <p style={{ color: '#e5e7eb' }}>
                Complete setups including desks, RGB lighting & accessories.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card p-4" style={cardStyle}>
              <h4 style={{ color: '#ffffff' }}>Room Design</h4>
              <p style={{ color: '#e5e7eb' }}>
                We design your dream gaming room from scratch.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* CTA SECTION */}
      <div className="text-center mt-5">
        <h3 style={{ color: '#ffffff' }}>Ready to Level Up?</h3>
        <button
          className="btn mt-3"
          style={ctaBtn}
          onClick={() => navigate('/products')}
        >
          Shop Now
        </button>
      </div>

      {/* FOOTER */}
      <footer
        className="text-center mt-5 p-3"
        style={{ color: '#9ca3af', borderTop: '1px solid #d1d5db' }}
      >
        © 2026 PrimeCore Systems — Designed for Legends
      </footer>
    </div>
  );
};

const navBtn = {
  background: 'transparent',
  border: '1px solid #e5e7eb',
  color: '#e5e7eb'
};

const ctaBtn = {
  background: '#f9fafb',
  border: 'none',
  color: '#000000',
  fontWeight: 'bold',
  padding: '10px 20px',
  boxShadow: '0 0 10px rgba(255,255,255,0.25)'
};

const cardStyle = {
  background: 'rgba(17, 24, 39, 0.95)',
  border: '1px solid #d1d5db',
  borderRadius: '15px',
  boxShadow: '0 6px 25px rgba(0,0,0,0.5)'
};

export default Home;