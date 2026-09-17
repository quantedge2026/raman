import Reveal from "../../components/Reveal";
import { Icon } from "../../icons/Icons";
import { differentiatorIntro, differentiatorQuote, keyDifferentiators } from "../../data/content";

export default function Differentiators() {
  return (
    <section id="differentiators">
      <Reveal className="wrap">
        <div className="head center">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            Our Key Differentiator
          </div>
          <p style={{ maxWidth: "62ch", margin: "0 auto", color: "var(--text-muted)" }}>
            {differentiatorIntro}
          </p>
        </div>
        <p className="why-quote">"{differentiatorQuote}"</p>
        <div className="why-grid">
          {keyDifferentiators.map((d) => (
            <div className="why-card raised" key={d.title}>
              <div className="ic pressed">
                <Icon name={d.icon} width="22" height="22" />
              </div>
              <h4>{d.title}</h4>
              <p>{d.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
