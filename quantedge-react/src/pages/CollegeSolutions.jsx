import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import Capabilities from "./college/Capabilities";
import InstitutionalBenefits from "./college/InstitutionalBenefits";
import DeliveryModes from "./college/DeliveryModes";
import ProgramComparison from "./college/ProgramComparison";
import MethodologySection from "./college/MethodologySection";
import LearningPlatform from "./college/LearningPlatform";
import ProposalForm from "./college/ProposalForm";
import { institutionalAudience } from "../data/content";
import { usePageTitle } from "../hooks/usePageTitle";

export default function CollegeSolutions() {
  const location = useLocation();
  usePageTitle(
    "College Training Solutions",
    "Institutional placement training for colleges, universities and TPOs — program structure, methodology, learning platform and proposal request."
  );

  useEffect(() => {
    if (!location.hash) return;
    const el = document.querySelector(location.hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.hash]);

  return (
    <>
      <header className="chero">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="wrap chero-in">
          <div className="eyebrow">For Colleges, Universities &amp; TPOs</div>
          <h1>A placement ecosystem your institution can rely on.</h1>
          <p>
            QuantEdge partners with placement departments and academic leadership to run
            structured, assessment-driven employability training — customized to your
            batches, delivered on your calendar, and measured the way your placement
            office needs it measured.
          </p>
          <div className="hero-ctas" style={{ justifyContent: "center" }}>
            <a className="btn btn-primary" href="#proposal">
              Request a Proposal
            </a>
            <Link className="btn btn-secondary" to="/contact#demo">
              Book a Demo Session
            </Link>
          </div>
          <div className="audience-strip">
            {institutionalAudience.map((a) => (
              <span className="audience-chip" key={a}>
                {a}
              </span>
            ))}
          </div>
          <div className="chero-jump">
            <a href="#capabilities">Capabilities</a>
            <a href="#benefits">Benefits</a>
            <a href="#delivery">Delivery Modes</a>
            <a href="#compare">Program Structure</a>
            <a href="#methodology">Methodology</a>
            <a href="#platform">Learning Platform</a>
            <a href="#proposal">Request a Proposal</a>
          </div>
        </div>
      </header>

      <Capabilities />
      <InstitutionalBenefits />
      <DeliveryModes />
      <ProgramComparison />
      <MethodologySection />
      <LearningPlatform />
      <ProposalForm />
    </>
  );
}
