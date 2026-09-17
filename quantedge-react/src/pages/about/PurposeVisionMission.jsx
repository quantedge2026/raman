import Reveal from "../../components/Reveal";
import MethodFlow from "../../components/MethodFlow";
import {
  purposeStatement,
  visionStatement,
  missionStatement,
  purposeJourney,
} from "../../data/content";

function Panel({ watermark, statement, children }) {
  return (
    <Reveal as="div" className="pvm-panel">
      <span className="pvm-watermark" aria-hidden="true">
        {watermark}
      </span>
      <div className="pvm-content">
        <div className="eyebrow">{statement.title}</div>
        <h3>{statement.paragraphs[0]}</h3>
        {statement.paragraphs.slice(1).map((p) => (
          <p key={p}>{p}</p>
        ))}
        {children}
      </div>
    </Reveal>
  );
}

export default function PurposeVisionMission() {
  const flow = purposeJourney.map((label, i) => ({
    label,
    highlight: i === purposeJourney.length - 1,
  }));

  return (
    <section id="purpose">
      <div className="wrap">
        <Panel watermark="PURPOSE" statement={purposeStatement}>
          <p className="pull">"{purposeStatement.pull}"</p>
          <div className="pvm-journey">
            <MethodFlow steps={flow} />
          </div>
        </Panel>
        <Panel watermark="VISION" statement={visionStatement} />
        <Panel watermark="MISSION" statement={missionStatement} />
      </div>
    </section>
  );
}
