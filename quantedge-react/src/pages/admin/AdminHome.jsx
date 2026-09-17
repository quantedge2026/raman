import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminMe, getAdminDashboardStats } from "../../utils/api";
import { getAdminToken, getAdminInfo, clearAdminSession } from "../../utils/adminAuth";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function AdminHome() {
  usePageTitle("Admin Dashboard", "QuantEdge admin dashboard.");
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const admin = getAdminInfo();

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      navigate("/admin/login");
      return;
    }
    getAdminMe(token)
      .then(() => getAdminDashboardStats(token))
      .then(setStats)
      .catch(() => {
        clearAdminSession();
        navigate("/admin/login");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLogout() {
    clearAdminSession();
    navigate("/admin/login");
  }

  return (
    <section className="admin-auth-page">
      <div className="wrap admin-auth-wrap">
        <div className="pform-shell raised-lg admin-home-card">
          <div className="pform-top">
            <div>
              <h3>Welcome{admin?.name ? `, ${admin.name}` : ""}</h3>
              <p>{admin?.email}</p>
            </div>
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleLogout}>
              Log Out
            </button>
          </div>

          {error && <p className="pf-error">{error}</p>}

          {stats && (
            <div className="saas-stat-row" style={{ marginTop: "var(--sp-6)" }}>
              <div className="saas-stat">
                <b>{stats.new.all}</b>
                <span>New Leads</span>
              </div>
              <div className="saas-stat">
                <b>{stats.totals.all}</b>
                <span>Total Submissions</span>
              </div>
              <div className="saas-stat">
                <b>{stats.totals.proposals}</b>
                <span>Proposal Requests</span>
              </div>
            </div>
          )}

          <p className="pf-note" style={{ marginTop: "var(--sp-6)" }}>
            A full leads table (view, filter, update status) isn't built yet — this is a
            starting dashboard. Let us know if you'd like that next.
          </p>
        </div>
      </div>
    </section>
  );
}
