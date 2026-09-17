import { Link } from "react-router-dom";
import Reveal from "../../components/Reveal";
import { Icon } from "../../icons/Icons";
import { platformFeatures } from "../../data/content";

export default function Platform() {
  return (
    <section id="platform">
      <Reveal className="wrap">
        <div className="head">
          <div className="eyebrow">Tech-Enabled Learning Platform</div>
          <h2>Every student gets a web portal, not just a classroom seat.</h2>
          <Link
            to="/college-solutions#platform"
            style={{
              display: "inline-block",
              marginTop: "var(--sp-3)",
              fontSize: ".85rem",
              fontWeight: 700,
              color: "var(--blue)",
            }}
          >
            Preview the full portal →
          </Link>
        </div>
        <div className="platform-grid">
          <div className="platform-list">
            {platformFeatures.map((f) => (
              <div className="plat-item raised" key={f.title}>
                <div className="ic pressed">
                  <Icon name={f.icon} width="20" height="20" />
                </div>
                <div>
                  <h5>{f.title}</h5>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="portal-mock raised-lg">
            <div className="bar">
              <i></i>
              <i></i>
              <i></i>
            </div>
            <div className="row">
              <span>Today's Aptitude Quiz</span>
              <b>12/15</b>
            </div>
            <div className="row">
              <span>Mock Test — TCS Pattern</span>
              <b>Scheduled</b>
            </div>
            <div className="row">
              <span>Interview Simulation</span>
              <b>82% Confidence</b>
            </div>
            <div className="row">
              <span>Resource Library</span>
              <b>240+ Files</b>
            </div>
            <p
              style={{
                marginTop: "var(--sp-5)",
                fontSize: ".85rem",
                color: "var(--text-muted)",
                lineHeight: 1.6,
              }}
            >
              Students graduate from our program with the confidence to code and the
              clarity to calculate.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
