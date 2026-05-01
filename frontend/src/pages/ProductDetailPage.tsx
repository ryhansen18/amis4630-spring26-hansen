import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, addToCart } from "../services/api";
import type { Product } from "../types";
import styles from "./ProductDetailPage.module.css";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!id) return;
    getProductById(Number(id))
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className={styles.stateWrapper}>
      <div className={styles.spinner} />
      <p>Loading...</p>
    </div>
  );
  if (error) return <div className={styles.stateWrapper}><p className={styles.errorMsg}>⚠ {error}</p></div>;
  if (!product) return <div className={styles.stateWrapper}><p>Product not found.</p></div>;

  const handleAddToCart = async () => {
    if (!product) return;
    setAdding(true);
    try {
      await addToCart(product.id, 1);
      navigate("/cart");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className={styles.page}>
      <button onClick={() => navigate("/")} className={styles.backBtn}>
        ← Back to listings
      </button>
      <div className={styles.container}>
        <div className={styles.imageCol}>
          <img src={product.imageUrl} alt={product.title} className={styles.image} />
        </div>
        <div className={styles.infoCol}>
          <span className={styles.categoryBadge}>{product.category}</span>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <div className={styles.meta}>
            <p><span className={styles.metaLabel}>Seller</span>{product.sellerName}</p>
            <p><span className={styles.metaLabel}>Posted</span>{new Date(product.postedDate).toLocaleDateString()}</p>
          </div>
          <p className={styles.description}>{product.description}</p>
          <button onClick={handleAddToCart} className={styles.cartBtn} disabled={adding}>
            {adding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}