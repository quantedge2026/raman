import Reveal from "../../components/Reveal";
import Counter from "../../components/Counter";
import { trustStats } from "../../data/content";

export default function TrustStats() {
  return (
    <section className="stats-strip">
      <Reveal className="wrap stagger">
        <div className="stat-row">
          {trustStats.map((s, i) => (
            <div className="stat-card raised" style={{ "--i": i }} key={s.label}>
              <Counter target={s.target} suffix={s.suffix} />
              <span>{s.label}</span>
            </div>
          ))}
          <div className="stat-card raised" style={{ "--i": trustStats.length }}>
            <b>3</b>
            <span>Structured Program Tracks</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
