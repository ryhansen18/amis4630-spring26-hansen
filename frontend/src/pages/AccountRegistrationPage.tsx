import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register, saveToken } from "../services/auth";
import { useAuth } from "../context/useAuth";
import styles from "./AuthPage.module.css";

export default function AccountRegistrationPage() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await register(fullName, email, password);
      saveToken(data.token);
      setUser(data);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during your registration attempt.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create Account</h2>
        <p className={styles.sub}>Join Buckeye Marketplace today</p>
        {error && <p className={styles.error}>⚠ {error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className={styles.input}
            placeholder="Your name"
            required
          />
          <label className={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={styles.input}
            placeholder="you@osu.edu"
            required
          />
          <label className={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={styles.input}
            placeholder="Min 8 chars, 1 uppercase, 1 number"
            required
          />
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <p className={styles.footer}>
          Already have an account? <Link to="/login" className={styles.link}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}