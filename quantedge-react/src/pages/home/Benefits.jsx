import Reveal from "../../components/Reveal";
import { CheckIcon } from "../../icons/Icons";
import { institutionalBenefits, hybridModel } from "../../data/content";

export default function Benefits() {
  return (
    <section id="benefits">
      <Reveal className="wrap">
        <div className="head">
          <div className="eyebrow">Institutional Benefits</div>
          <h2>College Training Solutions</h2>
          <p>Delivered through a hybrid model that respects your academic calendar.</p>
        </div>
        <div className="benefits-grid">
          <div className="benefit-list">
            {institutionalBenefits.map((b) => (
              <div className="benefit-item" key={b}>
                <div className="ck">
                  <CheckIcon width="15" height="15" />
                </div>
                <div>
                  <h5>{b}</h5>
                </div>
              </div>
            ))}
          </div>
          <div className="hybrid-card raised-lg">
            {hybridModel.map((h) => (
              <div className="row" key={h.title}>
                <b>{h.title}</b>
                <span>{h.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
