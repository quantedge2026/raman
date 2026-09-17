import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminLogin } from "../../utils/api";
import { setAdminSession } from "../../utils/adminAuth";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function AdminLogin() {
  usePageTitle("Admin Login", "QuantEdge admin panel login.");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token, admin } = await adminLogin(email.trim(), password);
      setAdminSession(token, admin);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="admin-auth-page">
      <div className="wrap admin-auth-wrap">
        <div className="pform-shell raised-lg admin-auth-card">
          <div className="pform-top">
            <div>
              <h3>Admin Login</h3>
              <p>Sign in to manage QuantEdge leads and submissions.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="pf-field full">
              <label htmlFor="admin-email">Email</label>
              <input
                id="admin-email"
                type="email"
                className={`pf-input${error ? " err" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
            <div className="pf-field full">
              <label htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                className={`pf-input${error ? " err" : ""}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            {error && <p className="pf-error">{error}</p>}

            <div className="pf-submit-row">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading && <span className="spinner" />}
                {loading ? "Signing in…" : "Sign In"}
              </button>
              <Link to="/admin/forgot-password" className="btn btn-ghost">
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
