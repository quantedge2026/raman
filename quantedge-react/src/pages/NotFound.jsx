import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("Page Not Found", "This page doesn't exist — find your way back to QuantEdge.");

  return (
    <section style={{ padding: "0" }}>
      <div
        className="wrap"
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "var(--sp-5)",
        }}
      >
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          404
        </span>
        <h1 style={{ fontSize: "clamp(2rem, 3vw + 1rem, 3rem)" }}>
          This page doesn't exist.
        </h1>
        <p style={{ color: "var(--text-muted)", maxWidth: "48ch", fontSize: "1.05rem" }}>
          The link may be outdated, or the page may have moved. Here's where you can go
          instead.
        </p>
        <div className="hero-ctas" style={{ justifyContent: "center" }}>
          <Link className="btn btn-primary" to="/">
            Back to Home
          </Link>
          <Link className="btn btn-secondary" to="/programs">
            Training Programs
          </Link>
        </div>
      </div>
    </section>
  );
}
