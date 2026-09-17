// Shared connected-node flow diagram, reused for both QuantEdge process
// framings: the 6-step operational methodology and the 5-step "Our Promise."
// steps: [{ label, highlight? }]
export default function MethodFlow({ steps }) {
  return (
    <div className="meth-track">
      {steps.map((step, i) => (
        <div className="meth-node-wrap" key={step.label}>
          <div className={`meth-node raised${step.highlight ? " glow-blue" : ""}`}>
            <span className="meth-n">{String(i + 1).padStart(2, "0")}</span>
            <span className="meth-label">{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className="meth-connector" style={{ "--d": `${i * 0.35}s` }}>
              <span className="meth-line" />
              <span className="meth-dot" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
