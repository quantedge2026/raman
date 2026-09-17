import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import TestimonialShowcase from "./testimonials/TestimonialShowcase";
import ClientsSection from "./testimonials/ClientsSection";
import FinalCta from "../components/FinalCta";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Testimonials() {
  const location = useLocation();
  usePageTitle(
    "Testimonials & Clients",
    "Student testimonials and partner institutions QuantEdge has delivered campus placement training for."
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
          <div className="eyebrow">Social Proof</div>
          <h1>Real students. Real placements. Nothing dressed up.</h1>
          <p>
            Two testimonials, verified from QuantEdge's own materials, and the
            institutions this training has actually run at.
          </p>
        </div>
      </header>

      <TestimonialShowcase />
      <ClientsSection />
      <FinalCta heading="Bring this track record to your campus." />
    </>
  );
}
