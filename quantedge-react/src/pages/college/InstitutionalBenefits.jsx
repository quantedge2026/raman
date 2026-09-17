import Reveal from "../../components/Reveal";
import { Icon } from "../../icons/Icons";
import { institutionalBenefitsFull } from "../../data/content";

export default function InstitutionalBenefits() {
  return (
    <section id="benefits">
      <Reveal className="wrap">
        <div className="head center">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            Institutional Benefits
          </div>
          <h2>What changes for your placement office.</h2>
        </div>
        <div className="ib-grid">
          {institutionalBenefitsFull.map((b) => (
            <div className="ib-card raised" key={b.title}>
              <div className="ic pressed">
                <Icon name={b.icon} width="22" height="22" />
              </div>
              <h4>{b.title}</h4>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
