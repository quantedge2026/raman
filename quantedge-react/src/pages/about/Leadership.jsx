import Reveal from "../../components/Reveal";
import TiltCard from "../../components/TiltCard";
import { founder, coFounder, leadershipStats } from "../../data/content";
import founderPhoto from "../../assets/founder.jpeg";
import coFounderPhoto from "../../assets/co-founder-optimized.jpg";

const photos = { founder: founderPhoto, coFounder: coFounderPhoto };

function LeaderCard({ person }) {
  return (
    <TiltCard
      className="leader-card raised-lg"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="leader-photo">
        <img
          src={photos[person.photo]}
          alt={`${person.name}, ${person.role}`}
          loading="lazy"
          width="800"
          height="1000"
          style={{ objectPosition: person.photoPosition || "center" }}
        />
        <div className="leader-scrim" />
        <div className="leader-caption">
          <h3>{person.name}</h3>
          <span>{person.role}</span>
        </div>
      </div>
      <div className="leader-body">
        <p className="lede">{person.lede}</p>

        <div className="pill-group">
          <span className="pg-label">Credentials</span>
          <div className="pill-row">
            {person.credentials.map((c) => (
              <span className="pill" key={c}>
                {c}
              </span>
            ))}
          </div>
        </div>

        {person.expertise && (
          <div className="pill-group">
            <span className="pg-label">Areas of Expertise</span>
            <div className="pill-row">
              {person.expertise.map((c) => (
                <span className="pill" key={c}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {person.recognition && (
          <div className="pill-group">
            <span className="pg-label">Recognition</span>
            <div className="pill-row">
              {person.recognition.map((c) => (
                <span className="pill recognition" key={c}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        <p>{person.bio}</p>
        <p>{person.journey}</p>
        <div className="leader-legacy">{person.legacy}</div>
      </div>
    </TiltCard>
  );
}

export default function Leadership() {
  return (
    <section id="leadership">
      <Reveal className="wrap">
        <div className="leadership-head">
          <div>
            <div className="eyebrow">Leadership</div>
            <h2 style={{ marginTop: "var(--sp-3)" }}>
              The people behind the training.
            </h2>
          </div>
          <div className="leadership-stats">
            {leadershipStats.map((s) => (
              <div key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="leader-grid">
          <LeaderCard person={founder} />
          <LeaderCard person={coFounder} />
        </div>
      </Reveal>
    </section>
  );
}
