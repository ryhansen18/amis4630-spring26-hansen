import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/api";
import type { Product } from "../types";
import { useCart } from "../context/useCart";
import styles from "./ProductDetailPage.module.css";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        productId: product.id,
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
      },
    });
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
          <button onClick={handleAddToCart} className={styles.cartBtn}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}