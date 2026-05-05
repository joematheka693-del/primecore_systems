import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SideSlider = ({ onToggle }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { path: "/products", label: "Gaming PCs" },
    { path: "/accessories", label: "Accessories" },
    { path: "/repairs", label: "Repairs" },
    { path: "/services", label: "Services" },
    { path: "/offers", label: "Offers" },
  ];

  const toggle = () => {
    const newState = !open;
    setOpen(newState);
    onToggle(newState);
  };

  return (
    <aside style={{ ...styles.sidebar, width: open ? "250px" : "78px" }}>
      <button style={styles.toggleBtn} onClick={toggle}>
        {open ? "←" : "☰"}
      </button>

      <div style={styles.menu}>
        {items.map((item) => {
          const active = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                ...styles.item,
                ...(active ? styles.activeItem : {}),
                justifyContent: open ? "flex-start" : "center",
              }}
            >
              <span style={styles.icon}>{item.icon}</span>
              {open && <span>{item.label}</span>}
            </button>
          );
        })}
      </div>
    </aside>
  );
};

const styles = {
 sidebar: {
    position: "fixed",
    top: "72px",
    left: 0,
    bottom: 0,
    backdropFilter: "blur(18px)",
    background: "linear-gradient(180deg, rgba(2,6,23,0.85), rgba(15,23,42,0.9))",
    borderRight: "1px solid rgba(148,163,184,0.15)",
    padding: "18px 12px",
    zIndex: 900,
    transition: "0.35s cubic-bezier(0.4, 0, 0.2, 1)",
    overflow: "hidden",
    boxShadow: "20px 0 60px rgba(0,0,0,0.35)"
    },

  toggleBtn: {
    width: "100%",
    padding: "11px",
    border: "1px solid rgba(96,165,250,0.35)",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
    color: "white",
    cursor: "pointer",
    fontWeight: "900",
    marginBottom: "22px",
    boxShadow: "0 12px 25px rgba(37,99,235,0.35)",
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  item: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    padding: "14px 16px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.03)",
    color: "#cbd5e1",
    cursor: "pointer",
    fontWeight: "800",
    border: "1px solid rgba(255,255,255,0.05)",
    transition: "0.3s ease",
    },

  activeItem: {
    background: "linear-gradient(135deg, #2563eb, #38bdf8)",
    color: "white",
    boxShadow: "0 15px 40px rgba(37,99,235,0.45)",
    transform: "scale(1.03)"
    },

  icon: {
    fontSize: "18px",
  },
};

export default SideSlider;