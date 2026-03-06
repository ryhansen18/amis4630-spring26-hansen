import { useState, useEffect } from "react";
import { getProducts } from "../services/api";
import type { Product } from "../types";
import ProductCard from "../components/ProductCard";
import styles from "./ProductListPage.module.css";

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className={styles.stateWrapper}>
      <div className={styles.spinner} />
      <p>Loading listings...</p>
    </div>
  );

  if (error) return (
    <div className={styles.stateWrapper}>
      <p className={styles.errorMsg}>⚠ {error}</p>
    </div>
  );

  if (products.length === 0) return (
    <div className={styles.stateWrapper}>
      <p>No listings found.</p>
    </div>
  );

  return (
    <section>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>All Listings</h2>
        <span className={styles.sectionCount}>{products.length} items</span>
      </div>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}