import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useCart } from "../context/useCart";
import { addToCart } from "../services/api";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { refreshCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart(product.id, 1);
      await refreshCart();
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  return (
    <Link to={`/products/${product.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>📦</div>
        )}
        <span className={styles.categoryBadge}>{product.category}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.seller}>by {product.sellerName}</p>
        <div className={styles.footer}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className={styles.addButton}
            aria-label={`Add ${product.title} to cart`}
          >
            + Cart
          </button>
        </div>
      </div>
    </Link>
  );
}