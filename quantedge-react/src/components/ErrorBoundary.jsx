import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("QuantEdge site crashed:", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div
        role="alert"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          padding: "24px",
          textAlign: "center",
          background: "var(--bg, #fff)",
          color: "var(--text, #111827)",
        }}
      >
        <h1 style={{ fontSize: "1.5rem" }}>Something went wrong.</h1>
        <p style={{ color: "var(--text-muted, #64748B)", maxWidth: "48ch" }}>
          This page hit an unexpected error. Reloading usually fixes it — if it keeps
          happening, please get in touch at{" "}
          <a href="mailto:info@quantedgecs.com">info@quantedgecs.com</a>.
        </p>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => window.location.reload()}
        >
          Reload the page
        </button>
      </div>
    );
  }
}
