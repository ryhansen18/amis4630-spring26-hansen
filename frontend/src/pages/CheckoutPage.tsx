import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import { createOrder } from "../services/api";
import styles from "./CheckoutPage.module.css";

export default function CheckoutPage() {
  const { state, refreshCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (state.items.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Your cart is empty.</p>
        <button onClick={() => navigate("/")} className={styles.browseBtn}>Browse Listings</button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const order = await createOrder(address);
      await refreshCart();
      navigate("/order-confirmation", { state: { order } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Checkout</h2>
      <div className={styles.layout}>
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Shipping Address</h3>
          {error && <p className={styles.error}>⚠ {error}</p>}
          <form onSubmit={handleSubmit} className={styles.form}>
            <textarea
              value={address}
              onChange={e => setAddress(e.target.value)}
              className={styles.textarea}
              placeholder="Enter your full shipping address"
              rows={4}
              required
            />
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>
        <div className={styles.summary}>
          <h3 className={styles.sectionTitle}>Order Summary</h3>
          <div className={styles.items}>
            {state.items.map(item => (
              <div key={item.cartItemId} className={styles.item}>
                <span className={styles.itemName}>{item.title}</span>
                <span className={styles.itemQty}>x{item.quantity}</span>
                <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className={styles.total}>
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}