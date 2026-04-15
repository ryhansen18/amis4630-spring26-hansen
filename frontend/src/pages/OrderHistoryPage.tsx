import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../services/api";
import styles from "./OrderHistoryPage.module.css";

interface OrderItem {
  productTitle: string;
  price: number;
  quantity: number;
  lineTotal: number;
}

interface Order {
  id: number;
  confirmationNumber: string;
  total: number;
  status: string;
  orderDate: string;
  shippingAddress: string;
  items: OrderItem[];
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getMyOrders()
      .then(setOrders)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className={styles.stateWrapper}>
      <div className={styles.spinner} />
      <p>Loading orders...</p>
    </div>
  );

  if (error) return (
    <div className={styles.stateWrapper}>
      <p className={styles.errorMsg}>⚠ {error}</p>
    </div>
  );

  if (orders.length === 0) return (
    <div className={styles.stateWrapper}>
      <p>You haven't placed any orders yet.</p>
      <button onClick={() => navigate("/")} className={styles.browseBtn}>Browse Listings</button>
    </div>
  );

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>My Orders</h2>
      <div className={styles.orders}>
        {orders.map(order => (
          <div key={order.id} className={styles.order}>
            <div className={styles.orderHeader}>
              <div>
                <p className={styles.confirmation}>#{order.confirmationNumber}</p>
                <p className={styles.date}>{new Date(order.orderDate).toLocaleDateString()}</p>
              </div>
              <div className={styles.orderMeta}>
                <span className={styles.status}>{order.status}</span>
                <span className={styles.total}>${order.total.toFixed(2)}</span>
              </div>
            </div>
            <div className={styles.items}>
              {order.items.map((item, i) => (
                <div key={i} className={styles.item}>
                  <span className={styles.itemName}>{item.productTitle}</span>
                  <span className={styles.itemQty}>x{item.quantity}</span>
                  <span className={styles.itemPrice}>${item.lineTotal.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <p className={styles.address}>📦 {order.shippingAddress}</p>
          </div>
        ))}
      </div>
    </div>
  );
}