import Reveal from "../../components/Reveal";
import { aboutDescription, aboutPull, trustStats } from "../../data/content";

export default function AboutIntro() {
  return (
    <section id="about">
      <Reveal className="wrap about-intro-grid">
        <div className="body">
          <div className="eyebrow">Who We Are</div>
          <h2 style={{ marginTop: "var(--sp-3)", marginBottom: "var(--sp-4)" }}>
            A founder-led placement partner, not another coaching centre.
          </h2>
          {aboutDescription.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="about-intro-visual raised-lg">
          <div className="tag">In Their Own Words</div>
          <p className="pull-lg">"{aboutPull}"</p>
          <div
            className="about-intro-stats"
            style={{ display: "flex", gap: "var(--sp-6)", marginTop: "auto", paddingTop: "var(--sp-4)" }}
          >
            {trustStats.map((s) => (
              <div key={s.label}>
                <b
                  style={{
                    display: "block",
                    fontFamily: "var(--f-numeral)",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                  }}
                >
                  {s.target.toLocaleString("en-IN")}
                  {s.suffix}
                </b>
                <span style={{ fontSize: ".74rem", color: "#C6CEEF" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
