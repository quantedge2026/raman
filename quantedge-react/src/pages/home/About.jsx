import { Link } from "react-router-dom";
import Reveal from "../../components/Reveal";
import { founder, aboutDescription, aboutPull } from "../../data/content";

export default function About() {
  const initials = founder.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <section id="about">
      <Reveal className="wrap about-grid">
        <div>
          <div className="eyebrow">About QuantEdge</div>
          <h2>A founder-led placement partner, not another coaching centre.</h2>
          <div className="body">
            {aboutDescription.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="pull">"{aboutPull}"</p>
          <Link
            to="/about"
            style={{
              display: "inline-block",
              marginTop: "var(--sp-5)",
              fontSize: ".85rem",
              fontWeight: 700,
              color: "var(--blue)",
            }}
          >
            Read our full story →
          </Link>
        </div>
        <div className="founder-card raised-lg">
          <div className="founder-top">
            <div className="founder-av">{initials}</div>
            <div>
              <h4>{founder.name}</h4>
              <div className="role">{founder.role}</div>
            </div>
          </div>
          <p>{founder.bio}</p>
          <div className="founder-stats">
            <div>
              <b>1,25,000+</b>
              <span>Students Trained</span>
            </div>
            <div>
              <b>35+</b>
              <span>Colleges</span>
            </div>
            <div>
              <b>10+</b>
              <span>Years</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
