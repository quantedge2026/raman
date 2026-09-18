import { useEffect, useState } from "react";
import { getAdminList, updateAdminItem, deleteAdminItem } from "../../utils/api";
import { getAdminToken } from "../../utils/adminAuth";
import { ChevronDownIcon, TrashIcon } from "../../icons/Icons";
import { RESOURCE_CONFIG } from "./leadsConfig";

const PAGE_SIZE = 10;

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatValue(value) {
  if (value === undefined || value === null || value === "") return "—";
  if (Array.isArray(value)) return value.join(", ") || "—";
  return String(value);
}

export default function LeadsTable({ resourceKey }) {
  const config = RESOURCE_CONFIG[resourceKey];
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function load() {
    const token = getAdminToken();
    setLoading(true);
    setError("");
    getAdminList(config.path, token, { status: statusFilter || undefined, page, limit: PAGE_SIZE })
      .then((data) => {
        setItems(data.items);
        setTotal(data.total);
      })
      .catch((err) => setError(err.message || "Failed to load."))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
    setExpandedId(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceKey, statusFilter, page]);

  async function handleStatusChange(id, status) {
    const token = getAdminToken();
    setBusyId(id);
    try {
      const updated = await updateAdminItem(config.path, id, { status }, token);
      setItems((prev) => prev.map((it) => (it._id === id ? updated : it)));
    } catch (err) {
      alert(err.message || "Failed to update status.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this submission? This can't be undone.")) return;
    const token = getAdminToken();
    setBusyId(id);
    try {
      await deleteAdminItem(config.path, id, token);
      setItems((prev) => prev.filter((it) => it._id !== id));
      setTotal((t) => t - 1);
    } catch (err) {
      alert(err.message || "Failed to delete.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <div className="leads-toolbar">
        <div className="leads-status-tabs">
          <button
            type="button"
            className={`leads-tab${statusFilter === "" ? " active" : ""}`}
            onClick={() => {
              setStatusFilter("");
              setPage(1);
            }}
          >
            All
          </button>
          {config.statuses.map((s) => (
            <button
              key={s}
              type="button"
              className={`leads-tab${statusFilter === s ? " active" : ""}`}
              onClick={() => {
                setStatusFilter(s);
                setPage(1);
              }}
            >
              {s[0].toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <span className="leads-total">{total} total</span>
      </div>

      {error && <p className="pf-error">{error}</p>}

      {loading ? (
        <div className="leads-loading">
          <span className="spinner" /> Loading…
        </div>
      ) : items.length === 0 ? (
        <p className="pf-note">No submissions yet.</p>
      ) : (
        <div className="leads-list">
          {items.map((item) => (
            <div className="leads-row" key={item._id}>
              <button
                type="button"
                className="leads-row-head"
                onClick={() => setExpandedId((id) => (id === item._id ? null : item._id))}
              >
                <ChevronDownIcon
                  width="16"
                  height="16"
                  style={{
                    transform: expandedId === item._id ? "rotate(180deg)" : "none",
                    flex: "0 0 auto",
                  }}
                />
                {config.columns.map((c) => (
                  <span className="leads-col" key={c.key} data-label={c.label}>
                    {formatValue(item[c.key])}
                  </span>
                ))}
                <span className="leads-date">{formatDate(item.createdAt)}</span>
              </button>

              <div className="leads-row-actions">
                <select
                  className="leads-status-select"
                  value={item.status}
                  disabled={busyId === item._id}
                  onChange={(e) => handleStatusChange(item._id, e.target.value)}
                >
                  {config.statuses.map((s) => (
                    <option key={s} value={s}>
                      {s[0].toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="leads-delete"
                  disabled={busyId === item._id}
                  onClick={() => handleDelete(item._id)}
                  aria-label="Delete"
                  title="Delete"
                >
                  <TrashIcon width="15" height="15" />
                </button>
              </div>

              {expandedId === item._id && (
                <div className="leads-detail">
                  {config.detailFields.map((f) => (
                    <div className="leads-detail-field" key={f.key}>
                      <span className="leads-detail-label">{f.label}</span>
                      <span className="leads-detail-value">{formatValue(item[f.key])}</span>
                    </div>
                  ))}
                  {item.notes && (
                    <div className="leads-detail-field">
                      <span className="leads-detail-label">Notes</span>
                      <span className="leads-detail-value">{item.notes}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="leads-pagination">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
