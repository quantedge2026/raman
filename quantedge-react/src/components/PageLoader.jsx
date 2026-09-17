export default function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="spinner" style={{ width: 28, height: 28, borderWidth: 3 }} />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
