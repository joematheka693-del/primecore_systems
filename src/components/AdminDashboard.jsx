import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const img_url = "https://frostyghost23.alwaysdata.net/static/images/";

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://frostyghost23.alwaysdata.net/api/get_products"
      );

      setProducts(response.data);
    } catch (error) {
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getCategory = (product) => {
  return product.category || "pcs";
};

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => getCategory(product) === category);

  const totalValue = filteredProducts.reduce(
    (sum, item) => sum + Number(item.product_cost || 0),
    0
  );

  const deleteProduct = async (id) => {
  const confirmDelete = window.confirm("Delete this product?");
  if (!confirmDelete) return;

  try {
    await axios.delete(
      `https://frostyghost23.alwaysdata.net/api/delete_product/${id}`
    );

    alert("Product deleted successfully");
    fetchProducts();
  } catch (error) {
    console.log(error);
    alert("Delete failed");
  }
};

  const updateProduct = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData(); // 🔥 THIS WAS MISSING

    formData.append("product_name", editingProduct.product_name);
    formData.append("product_description", editingProduct.product_description);
    formData.append("product_cost", editingProduct.product_cost);
    formData.append("category", editingProduct.category || "pcs");

    await axios.put(
      `https://frostyghost23.alwaysdata.net/api/update_product/${editingProduct.product_id}`,
      formData
    );

    alert("Product updated successfully");

    setEditingProduct(null); // close modal
    fetchProducts(); // refresh list

  } catch (error) {
    console.log(error);
    alert("Update failed");
  }
};

  return (
    <div style={styles.page}>
      <section style={styles.header}>
        <div>
          <p style={styles.badge}>Admin Control Center</p>
          <h1 style={styles.title}>PrimeCore Dashboard</h1>
          <p style={styles.subtitle}>
            Manage inventory, categories, products, and store summaries.
          </p>
        </div>

        <div style={styles.actionGrid}>
          <button style={styles.addBtn} onClick={() => navigate("/addproducts")}>
            + Add Product
          </button>

          <button style={styles.addBtn} onClick={() => navigate("/admin/orders")}>
            View Orders
          </button>

          <button style={styles.addBtn} onClick={() => navigate("/admin/repairs")}>
            Repair Bookings
          </button>

          <button style={styles.addBtn} onClick={() => navigate("/admin/quotes")}>
            Service Quotes
          </button>
        </div>
      </section>

      <section style={styles.filterBox}>
        <button
          style={category === "all" ? styles.activeCat : styles.catBtn}
          onClick={() => setCategory("all")}
        >
          All
        </button>

        <button
          style={category === "pcs" ? styles.activeCat : styles.catBtn}
          onClick={() => setCategory("pcs")}
        >
          Gaming PCs
        </button>

        <button
          style={category === "accessories" ? styles.activeCat : styles.catBtn}
          onClick={() => setCategory("accessories")}
        >
          Accessories
        </button>

        <button
          style={category === "repairs" ? styles.activeCat : styles.catBtn}
          onClick={() => setCategory("repairs")}
        >
          Repairs
        </button>

        <button
          style={category === "services" ? styles.activeCat : styles.catBtn}
          onClick={() => setCategory("services")}
        >
          Services
        </button>
      </section>

      <section style={styles.statsGrid}>
        <div style={styles.statCard}>
          <p>Current Category</p>
          <h2>{category.toUpperCase()}</h2>
        </div>

        <div style={styles.statCard}>
          <p>Total Items</p>
          <h2>{filteredProducts.length}</h2>
        </div>

        <div style={styles.statCard}>
          <p>Total Value</p>
          <h2>KES {totalValue.toLocaleString()}</h2>
        </div>
      </section>

      {loading && <Loader />}

      <section style={styles.tableCard}>
        <h2 style={styles.sectionTitle}>Inventory</h2>

        <div style={styles.tableHead}>
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Actions</span>
        </div>

        {filteredProducts.map((product) => (
          <div style={styles.tableRow} key={product.product_id}>
            <div style={styles.productInfo}>
              <img
                src={img_url + product.product_photo}
                alt={product.product_name}
                style={styles.image}
              />

              <div>
                <strong>{product.product_name}</strong>
                <p>{product.product_description?.slice(0, 55)}...</p>
              </div>
            </div>

            <span style={styles.status}>{getCategory(product)}</span>

            <span>KES {Number(product.product_cost).toLocaleString()}</span>

            <div style={styles.actions}>
              <button
                style={styles.editBtn}
                onClick={() => setEditingProduct(product)}
              >
                Edit
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteProduct(product.product_id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>

      {editingProduct && (
        <div style={styles.modalOverlay}>
          <form style={styles.modal} onSubmit={updateProduct}>
            <h2>Edit Product</h2>

            <input
              style={styles.input}
              value={editingProduct.product_name}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  product_name: e.target.value,
                })
              }
            />

            <textarea
              style={styles.textarea}
              value={editingProduct.product_description}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  product_description: e.target.value,
                })
              }
            />

            <input
              style={styles.input}
              type="number"
              value={editingProduct.product_cost}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  product_cost: e.target.value,
                })
              }
            />

            <select
              style={styles.input}
              value={editingProduct.category || "pcs"}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  category: e.target.value,
                })
              }
            >
              <option value="pcs">Gaming PCs</option>
              <option value="accessories">Accessories</option>
              <option value="repairs">Repairs</option>
              <option value="services">Services</option>
              <option value="offers">Offers</option>
            </select>

            <div style={styles.modalActions}>
              <button type="submit" style={styles.saveBtn}>
                Save Changes
              </button>

              <button
                type="button"
                style={styles.cancelBtn}
                onClick={() => setEditingProduct(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
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

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "25px",
    marginBottom: "25px",
    flexWrap: "wrap",
  },

  actionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(150px, 1fr))",
    gap: "12px",
    minWidth: "340px",
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
    fontSize: "42px",
    margin: "12px 0 5px",
    color: "#020617",
    fontWeight: "950",
  },

  subtitle: {
    color: "#64748b",
  },

  addBtn: {
    background: "linear-gradient(135deg, #2563eb, #0f172a)",
    color: "white",
    border: "none",
    padding: "13px 18px",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "900",
    boxShadow: "0 15px 35px rgba(37,99,235,0.3)",
  },

  filterBox: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "25px",
  },

  catBtn: {
    border: "1px solid #cbd5e1",
    background: "white",
    padding: "10px 14px",
    borderRadius: "999px",
    cursor: "pointer",
    fontWeight: "800",
  },

  activeCat: {
    border: "none",
    background: "linear-gradient(135deg, #2563eb, #38bdf8)",
    color: "white",
    padding: "10px 14px",
    borderRadius: "999px",
    cursor: "pointer",
    fontWeight: "900",
    boxShadow: "0 10px 25px rgba(37,99,235,0.3)",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
    marginBottom: "30px",
  },

  statCard: {
    background: "rgba(255,255,255,0.86)",
    backdropFilter: "blur(12px)",
    padding: "22px",
    borderRadius: "22px",
    boxShadow: "0 18px 45px rgba(15,23,42,0.08)",
    border: "1px solid #e2e8f0",
  },

  tableCard: {
    background: "rgba(255,255,255,0.9)",
    borderRadius: "24px",
    padding: "22px",
    boxShadow: "0 20px 55px rgba(15,23,42,0.1)",
  },

  sectionTitle: {
    marginBottom: "18px",
    color: "#0f172a",
  },

  tableHead: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    padding: "12px",
    color: "#64748b",
    fontWeight: "900",
    borderBottom: "1px solid #e2e8f0",
  },

  tableRow: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    alignItems: "center",
    padding: "12px",
    borderRadius: "16px",
    background: "#f8fafc",
    marginBottom: "10px",
  },

  productInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  image: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "14px",
  },

  status: {
    background: "#dcfce7",
    color: "#16a34a",
    padding: "7px 10px",
    borderRadius: "999px",
    fontWeight: "900",
    width: "fit-content",
    textTransform: "capitalize",
  },

  actions: {
    display: "flex",
    gap: "8px",
  },

  editBtn: {
    border: "none",
    background: "#dbeafe",
    color: "#2563eb",
    padding: "8px 10px",
    borderRadius: "10px",
    fontWeight: "800",
    cursor: "pointer",
  },

  deleteBtn: {
    border: "none",
    background: "#fee2e2",
    color: "#dc2626",
    padding: "8px 10px",
    borderRadius: "10px",
    fontWeight: "800",
    cursor: "pointer",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,0.55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3000,
  },

  modal: {
    width: "420px",
    background: "white",
    borderRadius: "24px",
    padding: "25px",
    boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
  },

  textarea: {
    width: "100%",
    height: "100px",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
  },

  modalActions: {
    display: "flex",
    gap: "10px",
  },

  saveBtn: {
    flex: 1,
    border: "none",
    background: "#2563eb",
    color: "white",
    padding: "12px",
    borderRadius: "12px",
    fontWeight: "900",
    cursor: "pointer",
  },

  cancelBtn: {
    flex: 1,
    border: "none",
    background: "#e2e8f0",
    color: "#0f172a",
    padding: "12px",
    borderRadius: "12px",
    fontWeight: "900",
    cursor: "pointer",
  },
};

export default AdminDashboard;