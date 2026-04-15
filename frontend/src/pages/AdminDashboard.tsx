import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { getProducts } from "../services/api";
import { createAdminProduct, updateAdminProduct, deleteAdminProduct, getAllOrders } from "../services/adminApi";
import styles from "./AdminDashboard.module.css";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  sellerName: string;
  imageUrl: string;
}

interface Order {
  id: number;
  userId: string;
  confirmationNumber: string;
  total: number;
  status: string;
  orderDate: string;
  shippingAddress: string;
  itemCount: number;
}

const emptyForm = { title: "", description: "", price: 0, category: "", sellerName: "", imageUrl: "" };

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"products" | "orders">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.roles.includes("Admin")) {
      navigate("/");
      return;
    }
    loadData();
  }, [user, navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [p, o] = await Promise.all([getProducts(), getAllOrders()]);
      setProducts(p);
      setOrders(o);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId !== null) {
        await updateAdminProduct(editingId, form);
      } else {
        await createAdminProduct(form);
      }
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save product");
    }
  };

  const handleEdit = (product: Product) => {
    setForm({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      sellerName: product.sellerName,
      imageUrl: product.imageUrl,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteAdminProduct(id);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
    }
  };

  if (loading) return <div className={styles.stateWrapper}><div className={styles.spinner} /></div>;

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Admin Dashboard</h2>
      {error && <p className={styles.error}>⚠ {error}</p>}

      <div className={styles.tabs}>
        <button
          className={tab === "products" ? styles.tabActive : styles.tab}
          onClick={() => setTab("products")}
        >Products</button>
        <button
          className={tab === "orders" ? styles.tabActive : styles.tab}
          onClick={() => setTab("orders")}
        >Orders</button>
      </div>

      {tab === "products" && (
        <div>
          <button
            className={styles.addBtn}
            onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(!showForm); }}
          >
            {showForm ? "Cancel" : "+ Add Product"}
          </button>

          {showForm && (
            <form onSubmit={handleSubmit} className={styles.form}>
              <input className={styles.input} placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              <textarea className={styles.textarea} placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
              <input className={styles.input} type="number" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })} required />
              <input className={styles.input} placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required />
              <input className={styles.input} placeholder="Seller Name" value={form.sellerName} onChange={e => setForm({ ...form, sellerName: e.target.value })} required />
              <input className={styles.input} placeholder="Image URL" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
              <button type="submit" className={styles.submitBtn}>
                {editingId !== null ? "Update Product" : "Create Product"}
              </button>
            </form>
          )}

          <div className={styles.productList}>
            {products.map(product => (
              <div key={product.id} className={styles.productRow}>
                <img src={product.imageUrl} alt={product.title} className={styles.productImg} />
                <div className={styles.productInfo}>
                  <p className={styles.productTitle}>{product.title}</p>
                  <p className={styles.productMeta}>{product.category} · ${product.price.toFixed(2)}</p>
                </div>
                <div className={styles.productActions}>
                  <button onClick={() => handleEdit(product)} className={styles.editBtn}>Edit</button>
                  <button onClick={() => handleDelete(product.id)} className={styles.deleteBtn}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "orders" && (
        <div className={styles.orderList}>
          {orders.map(order => (
            <div key={order.id} className={styles.orderRow}>
              <div>
                <p className={styles.orderConfirmation}>#{order.confirmationNumber}</p>
                <p className={styles.orderMeta}>{new Date(order.orderDate).toLocaleDateString()} · {order.itemCount} items</p>
                <p className={styles.orderAddress}>{order.shippingAddress}</p>
              </div>
              <div className={styles.orderRight}>
                <span className={styles.orderStatus}>{order.status}</span>
                <span className={styles.orderTotal}>${order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}