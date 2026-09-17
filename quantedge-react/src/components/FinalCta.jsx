import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { contact } from "../data/content";

export default function FinalCta({
  heading = "Ready to make your next batch placement-ready?",
  interest, // optional: current selected-track label to show as a chip
}) {
  const [pulse, setPulse] = useState(false);
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 500);
    return () => clearTimeout(t);
  }, [interest]);

  return (
    <section id="contact">
      <Reveal className="wrap">
        <div className="final-cta">
          <div className="final-orb" />
          <div style={{ position: "relative" }}>
            <div className="tag">{contact.tagline}</div>
            <h2>{heading}</h2>
            {interest && (
              <div className={`interest-chip${pulse ? " pulse" : ""}`}>
                Interested in: <b>{interest}</b>
              </div>
            )}
            <div className="ctas">
              <Link className="btn btn-primary" to="/college-solutions#proposal">
                Request a Proposal
              </Link>
              <Link className="btn btn-secondary" to="/contact#demo">
                Book a Demo Session
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
