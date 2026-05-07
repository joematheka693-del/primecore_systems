import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>

      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Build Your Ultimate Gaming Experience</h1>
        <p style={styles.heroText}>
          Premium custom PCs, setups, and immersive gaming environments — engineered for performance.
        </p>

        <button style={styles.ctaBtn} onClick={() => navigate('/products')}>
          Explore Products
        </button>
      </section>

      {/* FEATURES */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>What We Offer</h2>

        <div style={styles.grid}>

          <div style={styles.card}>
            <div style={styles.icon}>🖥️</div>
            <h3>Custom PCs</h3>
            <p>High-performance gaming rigs tailored for speed, cooling, and power.</p>
          </div>

          <div style={styles.card}>
            <div style={styles.icon}>🎮</div>
            <h3>Gaming Setups</h3>
            <p>Complete setups including RGB lighting, desks, and accessories.</p>
          </div>

          <div style={styles.card}>
            <div style={styles.icon}>🏠</div>
            <h3>Room Design</h3>
            <p>We design immersive gaming spaces that match your style and budget.</p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section style={styles.ctaSection}>
        <h2>Ready to Upgrade Your Setup?</h2>
        <p>Join thousands of gamers building their dream rigs with PrimeCore.</p>
        <button style={styles.ctaBtnDark} onClick={() => navigate('/products')}>
          Shop Now
        </button>
      </section>

    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #f8fafc, #eef2ff)',
    color: '#0f172a',
    fontFamily: 'Inter, sans-serif'
  },

  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 40px',
    background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(14px)',
    borderBottom: '1px solid #e2e8f0',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
  },

  logo: {
    textDecoration: 'none',
    fontSize: '20px',
    fontWeight: '700',
    color: '#2563eb'
  },

  navLinks: {
    display: 'flex',
    gap: '10px'
  },

  navBtn: {
    background: 'transparent',
    border: '1px solid #cbd5e1',
    padding: '8px 14px',
    borderRadius: '10px',
    cursor: 'pointer'
  },

  navBtnPrimary: {
    background: '#2563eb',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '10px',
    cursor: 'pointer',
    color: 'white'
  },

  hero: {
    textAlign: 'center',
    padding: '90px 20px 50px'
  },

  heroTitle: {
    fontSize: '44px',
    fontWeight: '800',
    letterSpacing: '-0.5px'
  },

  heroText: {
    fontSize: '18px',
    color: '#475569',
    maxWidth: '650px',
    margin: '12px auto'
  },

  ctaBtn: {
    background: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '12px 22px',
    borderRadius: '12px',
    cursor: 'pointer',
    boxShadow: '0 10px 25px rgba(37,99,235,0.25)'
  },

  section: {
    padding: '60px 20px'
  },

  sectionTitle: {
    textAlign: 'center',
    fontSize: '30px',
    marginBottom: '30px'
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '22px',
    maxWidth: '1000px',
    margin: '0 auto'
  },

  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '22px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 20px rgba(0,0,0,0.04)'
  },

  icon: {
    fontSize: '30px',
    marginBottom: '8px'
  },

  ctaSection: {
    textAlign: 'center',
    padding: '70px 20px',
    background: '#e0f2fe'
  },

  ctaBtnDark: {
    marginTop: '15px',
    background: '#0f172a',
    color: 'white',
    border: 'none',
    padding: '12px 22px',
    borderRadius: '12px'
  },

featureGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
  gap: "20px",
  padding: "40px 25px",
  maxWidth: "1200px",
  margin: "auto",
},

featureCard: {
  background:
    "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(15,23,42,0.95))",
  border: "1px solid rgba(148,163,184,0.15)",
  borderRadius: "24px",
  padding: "30px",
  cursor: "pointer",
  boxShadow: "0 25px 70px rgba(0,0,0,0.35)",
  transition: "0.3s",
},

featureBtn: {
  marginTop: "18px",
  border: "none",
  padding: "12px 18px",
  borderRadius: "12px",
  background: "linear-gradient(135deg,#2563eb,#38bdf8)",
  color: "white",
  fontWeight: "900",
  cursor: "pointer",
},
};

export default Home;