import Reveal from "../../components/Reveal";
import { Icon } from "../../icons/Icons";
import { deliveryModes } from "../../data/content";

export default function DeliveryModes() {
  return (
    <section id="delivery">
      <Reveal className="wrap">
        <div className="head center">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            Delivery Modes
          </div>
          <h2>Whatever your campus schedule allows.</h2>
        </div>
        <div className="dm-grid">
          {deliveryModes.map((d, i) => (
            <div className={`dm-card raised${i === 2 ? " mid" : ""}`} key={d.title}>
              <div className="ic pressed">
                <Icon name={d.icon} width="26" height="26" />
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
