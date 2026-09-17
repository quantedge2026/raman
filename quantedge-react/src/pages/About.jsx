import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import AboutHero from "./about/AboutHero";
import AboutIntro from "./about/AboutIntro";
import Leadership from "./about/Leadership";
import PurposeVisionMission from "./about/PurposeVisionMission";
import WhyChoose from "./about/WhyChoose";
import Differentiators from "./about/Differentiators";
import Credibility from "./about/Credibility";
import FinalCta from "../components/FinalCta";
import { usePageTitle } from "../hooks/usePageTitle";

export default function About() {
  const location = useLocation();
  usePageTitle(
    "About QuantEdge",
    "Meet the founder and leadership behind QuantEdge — the purpose, vision, mission and verified credibility statistics of a founder-led placement training company."
  );

  useEffect(() => {
    if (!location.hash) return;
    const el = document.querySelector(location.hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.hash]);

  return (
    <>
      <AboutHero />
      <AboutIntro />
      <Leadership />
      <PurposeVisionMission />
      <WhyChoose />
      <Differentiators />
      <Credibility />
      <FinalCta heading="See what this looks like for your batch." />
    </>
  );
}
