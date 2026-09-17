import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <header className="hero" id="home">
      <div className="hero-bgpattern" />
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">Campus Placement &amp; Employability Solutions</div>
          <h1>
            Transforming Students into <span className="hl">Placement-Ready</span>{" "}
            Professionals
          </h1>
          <p className="lede">
            Technical, Aptitude, Soft Skills, Excel, Power BI, AI &amp; Employability
            Training for Engineering and Management Students.
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-primary" to="/college-solutions#proposal">
              Request a Proposal
            </Link>
            <Link className="btn btn-secondary" to="/contact#demo">
              Book a Demo Session
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
