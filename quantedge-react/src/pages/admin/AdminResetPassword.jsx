import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { adminResetPassword } from "../../utils/api";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function AdminResetPassword() {
  usePageTitle("Reset Password", "Set a new password for the QuantEdge admin panel.");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("This reset link is missing its token. Request a new one.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    try {
      await adminResetPassword(token, password);
      setDone(true);
      setTimeout(() => navigate("/admin/login"), 1800);
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
              <h3>Reset Password</h3>
              <p>Choose a new password for the admin panel.</p>
            </div>
          </div>

          {done ? (
            <div className="pf-success">Password updated. Redirecting to login…</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="pf-field full">
                <label htmlFor="rp-password">New Password</label>
                <input
                  id="rp-password"
                  type="password"
                  className={`pf-input${error ? " err" : ""}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <span className="hint">At least 8 characters.</span>
              </div>
              <div className="pf-field full">
                <label htmlFor="rp-confirm">Confirm Password</label>
                <input
                  id="rp-confirm"
                  type="password"
                  className={`pf-input${error ? " err" : ""}`}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>

              {error && <p className="pf-error">{error}</p>}

              <div className="pf-submit-row">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading && <span className="spinner" />}
                  {loading ? "Updating…" : "Update Password"}
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
