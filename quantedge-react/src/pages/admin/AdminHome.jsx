import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminMe, getAdminDashboardStats } from "../../utils/api";
import { getAdminToken, getAdminInfo, clearAdminSession } from "../../utils/adminAuth";
import { usePageTitle } from "../../hooks/usePageTitle";
import LeadsTable from "./LeadsTable";
import { RESOURCE_CONFIG } from "./leadsConfig";

const RESOURCE_KEYS = Object.keys(RESOURCE_CONFIG);

export default function AdminHome() {
  usePageTitle("Admin Dashboard", "QuantEdge admin dashboard.");
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [resourceKey, setResourceKey] = useState(RESOURCE_KEYS[0]);
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
    <section className="admin-auth-page admin-dash-page">
      <div className="wrap admin-auth-wrap">
        <div className="pform-shell raised-lg admin-dash-card">
          <div className="pform-top">
            <div>
              <h3>Welcome{admin?.name ? `, ${admin.name}` : ""}</h3>
              <p>{admin?.email}</p>
            </div>
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleLogout}>
              Log Out
            </button>
          </div>

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

          <div className="admin-dash-tabs">
            {RESOURCE_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                className={`admin-dash-tab${resourceKey === key ? " active" : ""}`}
                onClick={() => setResourceKey(key)}
              >
                {RESOURCE_CONFIG[key].label}
              </button>
            ))}
          </div>

          <LeadsTable resourceKey={resourceKey} />
        </div>
      </div>
    </section>
  );
}
