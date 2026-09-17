import { Link } from "react-router-dom";
import Reveal from "../../components/Reveal";
import { testimonials } from "../../data/content";

export default function Testimonials() {
  return (
    <section id="testimonials">
      <Reveal className="wrap">
        <div className="head center">
          <div className="eyebrow center">Testimonials</div>
          <h2>What students say after placement</h2>
          <Link
            to="/testimonials"
            style={{
              display: "inline-block",
              marginTop: "var(--sp-3)",
              fontSize: ".85rem",
              fontWeight: 700,
              color: "var(--blue)",
            }}
          >
            See the full social proof page →
          </Link>
        </div>
        <div className="quote-grid">
          {testimonials.map((t) => (
            <div className="quote-card raised" key={t.name}>
              <div className="stars">★★★★★</div>
              <p>"{t.quote}"</p>
              <div className="quote-who">
                <div className="av">{t.initials}</div>
                <div>
                  <b>{t.name}</b>
                  <span>{t.meta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
