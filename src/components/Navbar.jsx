import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  
  const cartContext = useContext(CartContext);
  const cart = cartContext?.cart || [];

  const [user, setUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const cartCount = cart.reduce(
  (sum, item) => sum + (item.quantity || 1),
  0
);

  useEffect(() => {
    const loadUser = () => {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      setUser(savedUser);
    };

    loadUser();

    window.addEventListener("storage", loadUser);
    window.addEventListener("userChanged", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("userChanged", loadUser);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setOpenMenu(false);
    navigate("/signin");
    window.location.reload();
  };

  return (
    <nav style={styles.nav}>
      <h3 style={{ margin: 0 }}>
        <span style={styles.logo} onClick={() => navigate("/")}>
          PrimeCore Systems
        </span>
      </h3>

      <div style={styles.navLinks}>
        <button style={styles.navBtn} onClick={() => navigate("/")}>
          Home
        </button>

        <button
          style={styles.navBtn}
          onClick={() => navigate("/cart")}
        >
          🛒 Cart
        </button>

        {!user && (
          <>
            <button style={styles.navBtn} onClick={() => navigate("/signin")}>
              Sign In
            </button>

            <button style={styles.primaryBtn} onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </>
        )}

        {user && (
          <div style={styles.profileBox}>
            <button
              style={styles.profileBtn}
              onClick={() => setOpenMenu(!openMenu)}
            >
              <span style={styles.avatar}>
                {user.username?.charAt(0).toUpperCase()}
              </span>

              <span style={styles.username}>{user.username}</span>

              <span>▾</span>
            </button>

            {openMenu && (
              <div style={styles.dropdown}>
                <div style={styles.dropdownHeader}>
                  <strong>{user.username}</strong>
                  <small style={{ color: "#64748b" }}>{user.email}</small>
                </div>

                <button
                  style={styles.dropdownItem}
                  onClick={() => {
                    setOpenMenu(false);
                    navigate("/profile");
                  }}
                >
                  Profile
                </button>

                <button
                  style={styles.dropdownItem}
                  onClick={() => {
                    setOpenMenu(false);
                    navigate("/orders");
                  }}
                >
                  My Orders
                </button>

                {Number(user?.is_admin) === 1 && (
                  <button
                    style={styles.dropdownItem}
                    onClick={() => {
                      setOpenMenu(false);
                      navigate("/admin");
                    }}
                  >
                    Admin Panel
                  </button>
                )}

                <button
                  style={styles.dropdownItem}
                  onClick={() => {
                    setOpenMenu(false);
                    navigate("/about");
                  }}
                >
                  About Us
                </button>

                <button
                  style={styles.dropdownItem}
                  onClick={() => {
                    setOpenMenu(false);
                    navigate("/contact");
                  }}
                >
                  Contact Us
                </button>

                <button style={styles.logoutBtn} onClick={logout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 40px",
    background: "rgba(15,23,42,0.75)",
    backdropFilter: "blur(14px)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    fontFamily: "Inter, sans-serif",
  },

  logo: {
    textDecoration: "none",
    fontWeight: "800",
    color: "#2563eb",
    fontSize: "19px",
    cursor: "pointer",
  },

  navLinks: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },

  navBtn: {
    background: "transparent",
    border: "1px solid #cbd5e1",
    padding: "8px 13px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    color: "white",
    transition: "0.3s",
  },

  primaryBtn: {
    background: "#2563eb",
    border: "none",
    padding: "8px 13px",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer",
    fontWeight: "700",
    transition: "0.3s",
  },

  profileBox: {
    position: "relative",
  },

  profileBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#f8fafc",
    border: "1px solid #cbd5e1",
    padding: "6px 10px",
    borderRadius: "999px",
    cursor: "pointer",
    fontWeight: "700",
    color: "#0f172a",
  },

  avatar: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #2563eb, #00ffff)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "800",
  },

  username: {
    maxWidth: "120px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },

  dropdown: {
    position: "absolute",
    top: "48px",
    right: 0,
    width: "220px",
    background: "white",
    borderRadius: "14px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    zIndex: 2000,
  },

  dropdownHeader: {
    padding: "14px",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },

  dropdownItem: {
    width: "100%",
    textAlign: "left",
    background: "white",
    border: "none",
    padding: "12px 14px",
    cursor: "pointer",
    fontWeight: "600",
    color: "#0f172a",
  },

  logoutBtn: {
    width: "100%",
    textAlign: "left",
    background: "#fee2e2",
    border: "none",
    padding: "12px 14px",
    cursor: "pointer",
    fontWeight: "700",
    color: "#dc2626",
  },
};

export default Navbar;