import { Link } from "react-router-dom";
import Reveal from "../../components/Reveal";
import { verticals, companyFeatures } from "../../data/content";

export default function Companies() {
  const companyVertical = verticals.find((v) => v.id === "company");

  return (
    <section id="companies">
      <Reveal className="wrap">
        <div className="head">
          <div className="eyebrow">Company-Specific Placement Preparation</div>
          <h2>Our placement prep isn't one-size-fits-all.</h2>
          <p>
            Mock tests and practice material tailored to the exact recruitment patterns,
            difficulty level and question types used by top recruiters.
          </p>
        </div>
        <div className="co-row">
          {companyVertical.companies.map((c) => (
            <span className="co-chip raised" key={c}>
              {c}
            </span>
          ))}
        </div>
        <div className="co-feats">
          {companyFeatures.map((f) => (
            <div className="co-feat raised" key={f.title}>
              <b>{f.title}</b>
              {f.desc}
            </div>
          ))}
        </div>
        <p
          style={{
            fontSize: ".78rem",
            color: "var(--text-muted)",
            marginTop: "var(--sp-5)",
          }}
        >
          QuantEdge is an independent training provider — see{" "}
          <Link to="/programs#company" style={{ color: "var(--blue)", fontWeight: 600 }}>
            full details &amp; disclaimer →
          </Link>
        </p>
      </Reveal>
    </section>
  );
}
