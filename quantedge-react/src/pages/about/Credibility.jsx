import Reveal from "../../components/Reveal";
import Counter from "../../components/Counter";
import { trustStats } from "../../data/content";

export default function Credibility() {
  return (
    <section id="credibility">
      <Reveal className="wrap">
        <div className="head center">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            Credibility Statistics
          </div>
          <h2>Verified numbers, not marketing round-ups.</h2>
        </div>
        <div className="stat-row">
          {trustStats.map((s) => (
            <div className="stat-card raised-lg" key={s.label}>
              <Counter target={s.target} suffix={s.suffix} />
              <span>{s.label}</span>
            </div>
          ))}
        </div>
        <p className="cred-note">
          Every figure above comes directly from QuantEdge's own company profile — nothing
          rounded up, nothing estimated.
        </p>
      </Reveal>
    </section>
  );
}
