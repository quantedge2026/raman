import { useState } from "react";
import { Link } from "react-router-dom";
import { adminForgotPassword } from "../../utils/api";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function AdminForgotPassword() {
  usePageTitle("Forgot Password", "Reset your QuantEdge admin panel password.");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminForgotPassword(email.trim());
      setSent(true);
    } catch (err) {
      setError(err.message || "Something went wrong.");
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
              <h3>Forgot Password</h3>
              <p>Enter your admin email — we'll send a link to reset your password.</p>
            </div>
          </div>

          {sent ? (
            <div className="pf-success">
              If that email is registered, a reset link has been sent. Check your inbox.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="pf-field full">
                <label htmlFor="fp-email">Email</label>
                <input
                  id="fp-email"
                  type="email"
                  className={`pf-input${error ? " err" : ""}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>

              {error && <p className="pf-error">{error}</p>}

              <div className="pf-submit-row">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading && <span className="spinner" />}
                  {loading ? "Sending…" : "Send Reset Link"}
                </button>
                <Link to="/admin/login" className="btn btn-ghost">
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
