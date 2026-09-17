import Reveal from "../../components/Reveal";
import { Icon } from "../../icons/Icons";
import { whyQuantEdge } from "../../data/content";

export default function WhyQuantEdge() {
  return (
    <section id="why">
      <div className="wrap">
        <Reveal className="head center">
          <div className="eyebrow center">Why QuantEdge</div>
          <h2>
            Generic training prepares students for placements.
            <br />
            Our ecosystem prepares students for careers.
          </h2>
        </Reveal>
        <Reveal className="why-grid stagger">
          {whyQuantEdge.map((w, i) => (
            <div className="why-card raised" style={{ "--i": i }} key={w.title}>
              <div className="ic pressed">
                <Icon name={w.icon} width="22" height="22" />
              </div>
              <h4>{w.title}</h4>
              <p>{w.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
