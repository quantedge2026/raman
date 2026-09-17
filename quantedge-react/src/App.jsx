import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";
import ChatWidget from "./components/ChatWidget";
import Home from "./pages/Home";

// Home ships in the main bundle (it's the most common entry point); every
// other route is code-split so a visitor only pays for the page they land on.
const TrainingPrograms = lazy(() => import("./pages/TrainingPrograms"));
const CollegeSolutions = lazy(() => import("./pages/CollegeSolutions"));
const About = lazy(() => import("./pages/About"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
// Gallery route is temporarily disabled site-wide, per client request — the
// page itself is untouched. Re-add this line + the <Route> below to restore.
// const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const Terms = lazy(() => import("./pages/Terms"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminForgotPassword = lazy(() => import("./pages/admin/AdminForgotPassword"));
const AdminResetPassword = lazy(() => import("./pages/admin/AdminResetPassword"));
const AdminHome = lazy(() => import("./pages/admin/AdminHome"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ScrollManager() {
  const location = useLocation();

  // The browser's own back/forward scroll restoration otherwise fights with
  // this — it can silently re-apply an old scroll position after our reset.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (location.hash) return;
    // Deferred to the next frame: with lazy-loaded routes the new page
    // finishes mounting (via Suspense) a tick after location changes, so
    // scrolling immediately could run before it and get overridden.
    const raf = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
    return () => cancelAnimationFrame(raf);
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<TrainingPrograms />} />
          <Route path="/college-solutions" element={<CollegeSolutions />} />
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testimonials />} />
          {/* <Route path="/gallery" element={<Gallery />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
          <Route path="/admin/reset-password" element={<AdminResetPassword />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <ChatWidget />
    </>
  );
}
