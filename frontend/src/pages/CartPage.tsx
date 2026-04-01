import { useCart } from "../context/useCart";
import { removeCartItem, updateCartItem, clearCart } from "../services/api";
import { useNavigate } from "react-router-dom";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const { state, refreshCart } = useCart();
  const navigate = useNavigate();

  const handleRemove = async (cartItemId: number) => {
    await removeCartItem(cartItemId);
    await refreshCart();
  };

  const handleQuantityChange = async (cartItemId: number, quantity: number) => {
    if (quantity < 1) return;
    await updateCartItem(cartItemId, quantity);
    await refreshCart();
  };

  const handleClear = async () => {
    await clearCart();
    await refreshCart();
  };

  if (state.items.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>Your cart is empty.</p>
        <button onClick={() => navigate("/")} className={styles.browseBtn}>
          Browse Listings
        </button>
      </div>
    );
  }

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2 className={styles.title}>Your Cart</h2>
        <button onClick={handleClear} className={styles.clearBtn}>
          Clear Cart
        </button>
      </div>
      <div className={styles.items}>
        {state.items.map((item) => (
          <div key={item.cartItemId} className={styles.item}>
            <img src={item.imageUrl} alt={item.title} className={styles.image} />
            <div className={styles.info}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
            </div>
            <div className={styles.controls}>
              <button
                onClick={() => handleQuantityChange(item.cartItemId, item.quantity - 1)}
                className={styles.qtyBtn}
              >−</button>
              <span className={styles.qty}>{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.cartItemId, item.quantity + 1)}
                className={styles.qtyBtn}
              >+</button>
            </div>
            <p className={styles.subtotal}>${(item.price * item.quantity).toFixed(2)}</p>
            <button onClick={() => handleRemove(item.cartItemId)} className={styles.removeBtn}>
              ✕
            </button>
          </div>
        ))}
      </div>
      <div className={styles.summary}>
        <p className={styles.total}>Total: <strong>${total.toFixed(2)}</strong></p>
        <button onClick={() => navigate("/")} className={styles.continueBtn}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}