import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import CategoryGrid from "./programs/CategoryGrid";
import DetailAccordion from "./programs/DetailAccordion";
import FinalCta from "../components/FinalCta";
import { prefersReducedMotion } from "../hooks/useInView";
import { usePageTitle } from "../hooks/usePageTitle";

export default function TrainingPrograms() {
  const [openId, setOpenId] = useState(null);
  const [interest, setInterest] = useState(null);
  const itemRefs = useRef({});
  const location = useLocation();
  usePageTitle(
    "Training Programs",
    "Seven training verticals — Aptitude, Technical, AI, Soft Skills, Interview Readiness, Data Tools and Company-Specific Placement Prep."
  );

  function openAndScroll(id) {
    setOpenId((prev) => (prev === id ? null : id));
    requestAnimationFrame(() => {
      const el = itemRefs.current[id];
      if (el) el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
    });
  }

  function selectFromGrid(id) {
    setOpenId(id);
    requestAnimationFrame(() => {
      const el = itemRefs.current[id];
      if (el) el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
    });
  }

  useEffect(() => {
    const id = location.hash?.replace("#", "");
    if (!id) return;
    setOpenId(id);
    const t = setTimeout(() => {
      const el = itemRefs.current[id];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 60);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash]);

  return (
    <>
      <header className="phero">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="wrap phero-in">
          <div className="eyebrow">Training Programs</div>
          <h1>
            Seven verticals.
            <br />
            One placement{"‑"}ready curriculum.
          </h1>
          <p>
            Every topic below is drawn directly from QuantEdge's training curriculum —
            mixed, sequenced and delivered on-campus, online or hybrid to fit your academic
            calendar.
          </p>
          <div className="phero-stats">
            <div className="s raised">
              <b>7</b>
              <span>Training Verticals</span>
            </div>
            <div className="s raised">
              <b>53</b>
              <span>Topics Covered</span>
            </div>
            <div className="s raised">
              <b>9+</b>
              <span>Recruiter-Aligned Patterns</span>
            </div>
          </div>
        </div>
      </header>

      <CategoryGrid onSelect={selectFromGrid} />
      <DetailAccordion
        openId={openId}
        onToggle={openAndScroll}
        onCta={setInterest}
        itemRefs={itemRefs}
      />
      <FinalCta
        heading="Let's build the right track for your students."
        interest={interest || "All Training Verticals"}
      />
    </>
  );
}
