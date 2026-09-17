import Reveal from "../../components/Reveal";
import { clients } from "../../data/content";

export default function Clients() {
  return (
    <section id="clients">
      <Reveal className="wrap">
        <div className="head center">
          <div className="eyebrow center">Our Clients</div>
          <h2>Trusted by institutions across engineering &amp; management</h2>
        </div>
        <div className="client-row">
          {clients.map((c) => (
            <div className="client-card raised" key={c.name}>
              <div className="mk">{c.mark}</div>
              <span>{c.name}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
