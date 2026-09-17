import Reveal from "../../components/Reveal";

export default function Assessment() {
  return (
    <section id="assessment">
      <Reveal className="wrap">
        <div className="assess-card raised-lg">
          <div className="assess-orb" />
          <div style={{ position: "relative" }}>
            <div className="eyebrow" style={{ color: "#C9A6D9" }}>
              Placement Readiness Assessment
            </div>
            <h3>Not sure where your batch stands? Find out — free.</h3>
            <p>
              Take our free online aptitude test and get a clear read on placement
              readiness before the season begins.
            </p>
          </div>
          <div style={{ position: "relative", textAlign: "center" }}>
            <a className="btn btn-primary" href="#contact">
              Start Free Assessment
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
