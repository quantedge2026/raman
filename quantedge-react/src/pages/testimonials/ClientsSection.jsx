import Reveal from "../../components/Reveal";
import { clients } from "../../data/content";

export default function ClientsSection() {
  return (
    <section id="clients">
      <Reveal className="wrap">
        <div className="head center">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            Our Clients
          </div>
          <h2>Institutions QuantEdge has trained at.</h2>
        </div>
        <div className="client-row">
          {clients.map((c) => (
            <div className="client-card raised" key={c.name}>
              <div className="mk">{c.mark}</div>
              <span>{c.name}</span>
            </div>
          ))}
        </div>
        <p className="clients-note">
          These are institutions QuantEdge has delivered on-campus, online or hybrid
          training programs for — not brand endorsements or formal partnerships beyond the
          training engagement itself.
        </p>
      </Reveal>
    </section>
  );
}
