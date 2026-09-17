import Reveal from "../../components/Reveal";
import { Icon } from "../../icons/Icons";
import { institutionalCapabilities } from "../../data/content";

export default function Capabilities() {
  return (
    <section id="capabilities">
      <Reveal className="wrap">
        <div className="head">
          <div className="eyebrow">What QuantEdge Brings to Your Institution</div>
          <h2>Eleven capabilities. One placement ecosystem.</h2>
          <p>
            Not a single workshop — a full training operation your placement department can
            plan a semester around.
          </p>
        </div>
        <div className="cap-grid">
          {institutionalCapabilities.map((c) => (
            <div className="cap-tile raised" key={c.title}>
              <div className="ic pressed">
                <Icon name={c.icon} width="20" height="20" />
              </div>
              <div>
                <h5>{c.title}</h5>
                <p>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
