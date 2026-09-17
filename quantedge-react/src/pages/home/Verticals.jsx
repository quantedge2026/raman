import { Link } from "react-router-dom";
import Reveal from "../../components/Reveal";
import { verticals } from "../../data/content";

export default function Verticals() {
  return (
    <section id="verticals">
      <div className="wrap">
        <Reveal className="head">
          <div className="eyebrow">Training Verticals</div>
          <h2>Seven verticals. One placement-ready outcome.</h2>
          <p>
            Every QuantEdge program draws from the same seven training verticals — mixed
            and sequenced to fit each institution's academic calendar.
          </p>
        </Reveal>
        <Reveal className="vert-grid stagger" as="div">
          {verticals.map((v, i) => (
            <Link
              to={`/programs#${v.id}`}
              key={v.id}
              className={`vert-card raised${v.featured ? " feat" : ""}`}
              style={{ "--i": i }}
            >
              <div className="num">{String(i + 1).padStart(2, "0")}</div>
              <h4>{v.title}</h4>
              <div className="vert-tags">
                {(v.preview || v.companies?.slice(0, 3) || []).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
