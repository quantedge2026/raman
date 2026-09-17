import Reveal from "../../components/Reveal";
import { Icon } from "../../icons/Icons";
import { whyChooseQuantEdge } from "../../data/content";

export default function WhyChoose() {
  return (
    <section id="why">
      <Reveal className="wrap">
        <div className="head center">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            Why Choose QuantEdge
          </div>
          <h2>Three things every partner program is built on.</h2>
        </div>
        <div className="why-grid">
          {whyChooseQuantEdge.map((w) => (
            <div className="why-card raised" key={w.title}>
              <div className="ic pressed">
                <Icon name={w.icon} width="22" height="22" />
              </div>
              <h4>{w.title}</h4>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
