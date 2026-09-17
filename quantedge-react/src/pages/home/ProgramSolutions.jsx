import { Link } from "react-router-dom";
import Reveal from "../../components/Reveal";
import TiltCard from "../../components/TiltCard";
import { CheckIcon } from "../../icons/Icons";
import { programs } from "../../data/content";

export default function ProgramSolutions() {
  return (
    <section id="programs">
      <div className="wrap">
        <Reveal className="head">
          <div className="eyebrow">Program Solutions</div>
          <h2>Three formats. One academic calendar, mapped precisely.</h2>
          <p>
            Each track blends the same seven verticals at a duration and intensity matched
            to when your institution needs it.
          </p>
          <Link
            to="/college-solutions#compare"
            style={{
              display: "inline-block",
              marginTop: "var(--sp-4)",
              fontSize: ".85rem",
              fontWeight: 700,
              color: "var(--blue)",
            }}
          >
            Compare all three side by side →
          </Link>
        </Reveal>
        <div className="prog-grid">
          {programs.map((p) => (
            <TiltCard
              key={p.id}
              className={`prog-card${p.featured ? " glow-blue" : " raised"}`}
            >
              <div className="top">
                <h4>{p.name}</h4>
                <span className={`badge ${p.featured ? "blue" : "soft"}`}>{p.tag}</span>
              </div>
              <div className="hrs">{p.hours}</div>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="foot">{p.note}</div>
              <a className="btn btn-ghost" href="#contact">
                Request details →
              </a>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
