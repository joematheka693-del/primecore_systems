import React from "react";

const About = () => {
  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <p style={styles.badge}>About PrimeCore</p>
        <h1 style={styles.title}>Built for Performance</h1>
        <p style={styles.subtitle}>
          PrimeCore Systems is a gaming and tech platform focused on custom PCs,
          gaming setups, accessories, repairs, and premium tech services.
        </p>
      </section>

      <section style={styles.grid}>
        <div style={styles.card}>
          <h2>🚀 Our Mission</h2>
          <p>
            To help gamers, creators, students, and businesses get powerful,
            reliable, and beautiful tech setups that match their needs and budget.
          </p>
        </div>

        <div style={styles.card}>
          <h2>🖥️ What We Offer</h2>
          <p>
            Gaming PCs, accessories, setup builds, repair bookings, custom PC
            consultations, software setup, and performance optimization.
          </p>
        </div>

        <div style={styles.card}>
          <h2>🛠️ Why Choose Us</h2>
          <p>
            We focus on performance, honest recommendations, clean builds,
            after-sale support, and a smooth online ordering experience.
          </p>
        </div>
      </section>

      <section style={styles.story}>
        <h2>Our Story</h2>
        <p>
          PrimeCore Systems was created to make high-performance gaming and tech
          solutions easier to access. Whether you need a full gaming rig, a clean
          desk setup, a repair, or advice on what to buy, PrimeCore is built to
          guide you from idea to setup.
        </p>
      </section>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    padding: "45px",
    background:
      "radial-gradient(circle at top left, rgba(37,99,235,0.18), transparent 35%), linear-gradient(180deg, #f8fafc, #eef2ff)",
    fontFamily: "Inter, sans-serif",
  },

  hero: {
    textAlign: "center",
    maxWidth: "850px",
    margin: "0 auto 35px",
  },

  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "#dbeafe",
    color: "#2563eb",
    fontWeight: "900",
  },

  title: {
    fontSize: "48px",
    margin: "14px 0 10px",
    color: "#020617",
    fontWeight: "950",
  },

  subtitle: {
    color: "#64748b",
    fontSize: "17px",
    lineHeight: "1.7",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
    maxWidth: "1100px",
    margin: "0 auto 30px",
  },

  card: {
    background: "rgba(255,255,255,0.92)",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 25px 70px rgba(15,23,42,0.1)",
    border: "1px solid rgba(226,232,240,0.9)",
  },

  story: {
    maxWidth: "900px",
    margin: "0 auto",
    background: "rgba(255,255,255,0.92)",
    borderRadius: "24px",
    padding: "28px",
    boxShadow: "0 25px 70px rgba(15,23,42,0.1)",
    color: "#334155",
    lineHeight: "1.7",
  },
};

export default About;