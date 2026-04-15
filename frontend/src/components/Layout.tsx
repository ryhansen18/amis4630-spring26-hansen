import { Link, Outlet, useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/useAuth";
import { removeToken } from "../services/auth";
import styles from "./Layout.module.css";

export default function Layout() {
  const { state, dispatch } = useCart();
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    removeToken();
    setUser(null);
    dispatch({ type: "CLEAR_CART" });
    navigate("/");
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoMark}>🌰</span>
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>Buckeye</span>
              <span className={styles.logoSub}>Marketplace</span>
            </div>
          </Link>
          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>Browse</Link>
            <span className={styles.navDivider} />
            {user ? (
              <>
                <span className={styles.navUser}>Hey, {user.fullName.split(" ")[0]}</span>
                <span className={styles.navDivider} />
                <Link to="/orders" className={styles.navLink}>My Orders</Link>
                {user.roles.includes("Admin") && (
                  <>
                    <span className={styles.navDivider} />
                    <Link to="/admin" className={styles.navLink}>Admin</Link>
                  </>
                )}
                <span className={styles.navDivider} />
                <Link to="/cart" className={styles.cartLink}>
                  🛒
                  {itemCount > 0 && (
                    <span className={styles.cartBadge}>{itemCount}</span>
                  )}
                </Link>
                <span className={styles.navDivider} />
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.navLink}>Sign In</Link>
                <span className={styles.navDivider} />
                <Link to="/register" className={styles.navCta}>Register</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>The hub for all OSU</p>
          <h2 className={styles.heroHeadline}>The place to buy and sell OSU items.<br />Sold second-hand and brand new!</h2>
        </div>
      </div>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>© 2026 Buckeye Marketplace · AMIS4630 · The Ohio State University</p>
      </footer>
    </div>
  );
}