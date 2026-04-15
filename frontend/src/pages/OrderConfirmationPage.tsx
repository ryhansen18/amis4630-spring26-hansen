import { useLocation, useNavigate } from "react-router-dom";
import styles from "./OrderConfirmationPage.module.css";

export default function OrderConfirmationPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  if (!order) {
    navigate("/");
    return null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>✓</div>
        <h2 className={styles.title}>Order Confirmed!</h2>
        <p className={styles.sub}>Your order has been placed successfully.</p>
        <div className={styles.details}>
          <div className={styles.row}>
            <span className={styles.label}>Confirmation #</span>
            <span className={styles.value}>{order.confirmationNumber}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Total</span>
            <span className={styles.value}>${order.total.toFixed(2)}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Status</span>
            <span className={styles.value}>{order.status}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Shipping To</span>
            <span className={styles.value}>{order.shippingAddress}</span>
          </div>
        </div>
        <div className={styles.actions}>
          <button onClick={() => navigate("/orders")} className={styles.primaryBtn}>
            View My Orders
          </button>
          <button onClick={() => navigate("/")} className={styles.secondaryBtn}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}