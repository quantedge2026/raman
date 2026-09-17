import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Hero from "./home/Hero";
import TrustStats from "./home/TrustStats";
import About from "./home/About";
import WhyQuantEdge from "./home/WhyQuantEdge";
import Verticals from "./home/Verticals";
import Methodology from "./home/Methodology";
import ProgramSolutions from "./home/ProgramSolutions";
import Platform from "./home/Platform";
import Companies from "./home/Companies";
import Benefits from "./home/Benefits";
import Clients from "./home/Clients";
import Testimonials from "./home/Testimonials";
// Gallery and Blog are temporarily hidden site-wide, per client request —
// components are untouched, just not rendered. Re-add the imports/JSX below
// to bring them back.
// import Gallery from "./home/Gallery";
import Assessment from "./home/Assessment";
// import Blog from "./home/Blog";
import FinalCta from "../components/FinalCta";
import { usePageTitle } from "../hooks/usePageTitle";

export default function Home() {
  const location = useLocation();
  usePageTitle(
    "Campus Placement & Employability Training",
    "QuantEdge Consultancy Services — Technical, Aptitude, Soft Skills, AI & Employability training for engineering and management students."
  );

  useEffect(() => {
    if (!location.hash) return;
    const el = document.querySelector(location.hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.hash]);

  return (
    <>
      <Hero />
      <TrustStats />
      <About />
      <WhyQuantEdge />
      <Verticals />
      <Methodology />
      <ProgramSolutions />
      <Platform />
      <Companies />
      <Benefits />
      <Clients />
      <Testimonials />
      {/* <Gallery /> */}
      <Assessment />
      {/* <Blog /> */}
      <FinalCta />
    </>
  );
}
