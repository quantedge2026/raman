const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = data?.error || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data;
}

export function submitProposal(payload) {
  return request("/api/proposals", { method: "POST", body: JSON.stringify(payload) });
}

export function submitContact(payload) {
  return request("/api/contact", { method: "POST", body: JSON.stringify(payload) });
}

export function submitDemoRequest(payload) {
  return request("/api/demo", { method: "POST", body: JSON.stringify(payload) });
}

export function adminLogin(email, password) {
  return request("/api/admin/login", { method: "POST", body: JSON.stringify({ email, password }) });
}

export function adminForgotPassword(email) {
  return request("/api/admin/forgot-password", { method: "POST", body: JSON.stringify({ email }) });
}

export function adminResetPassword(token, password) {
  return request("/api/admin/reset-password", { method: "POST", body: JSON.stringify({ token, password }) });
}

export function sendChatMessage(message, history) {
  return request("/api/chat", { method: "POST", body: JSON.stringify({ message, history }) });
}

export function getAdminMe(token) {
  return request("/api/admin/me", { headers: { Authorization: `Bearer ${token}` } });
}

export function getAdminDashboardStats(token) {
  return request("/api/admin/dashboard-stats", { headers: { Authorization: `Bearer ${token}` } });
}
