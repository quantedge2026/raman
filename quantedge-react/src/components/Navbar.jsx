import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { verticals, contact, socialLinks } from "../data/content";
import { Icon, MenuIcon, CloseIcon, SunIcon, MoonIcon } from "../icons/Icons";
import { useTheme } from "../hooks/useTheme";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { theme, toggle } = useTheme();

  // Close the mobile flyout on navigation and on Escape — it otherwise stays
  // open after a link is tapped, or is untrappable by keyboard.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const onHome = location.pathname === "/";
  const onPrograms = location.pathname === "/programs";
  const onCollege = location.pathname === "/college-solutions";
  const onAbout = location.pathname === "/about";
  const onTestimonials = location.pathname === "/testimonials";
  const onContact = location.pathname === "/contact";

  return (
    <nav className="nav">
      <div className="wrap nav-row">
        <Link to="/" className="brand">
          <img src={logo} alt="QuantEdge" className="brand-logo" />
        </Link>

        <div
          id="primary-nav"
          className={`nav-links${open ? " nav-links-open" : ""}`}
          onClick={(e) => {
            if (e.target.closest("a, button")) setOpen(false);
          }}
        >
          <Link to="/" className={onHome ? "on" : ""}>
            Home
          </Link>
          <div className="nav-item">
            <Link to="/programs" className={onPrograms ? "on" : ""}>
              Training Programs
            </Link>
            <div className="mega raised-lg">
              {verticals.map((v) => (
                <Link key={v.id} to={`/programs#${v.id}`}>
                  <Icon name={v.icon} width="16" height="16" />
                  {v.title}
                </Link>
              ))}
            </div>
          </div>
          <Link to="/college-solutions" className={onCollege ? "on" : ""}>
            College Solutions
          </Link>
          <Link to="/about" className={onAbout ? "on" : ""}>
            About
          </Link>
          <Link to="/testimonials" className={onTestimonials ? "on" : ""}>
            Testimonials
          </Link>
          {/* Gallery and Blog nav links are temporarily hidden, per client
              request — pages/components are untouched. */}
          <Link to="/contact" className={onContact ? "on" : ""}>
            Contact
          </Link>

          {onCollege ? (
            <a className="btn btn-primary nav-inmenu-cta" href="#proposal">
              Request a Proposal
            </a>
          ) : (
            <Link className="btn btn-primary nav-inmenu-cta" to="/college-solutions#proposal">
              Request a Proposal
            </Link>
          )}

          <div className="nav-mobile-extra">
            <button
              className="theme-toggle raised"
              onClick={toggle}
              type="button"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <MoonIcon width="16" height="16" />
              ) : (
                <SunIcon width="16" height="16" />
              )}
            </button>
            {socialLinks.map((s) => (
              <a
                key={s.label}
                className="theme-toggle raised"
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                title={s.label}
              >
                <Icon name={s.icon} width="16" height="16" />
              </a>
            ))}
            <a
              className="theme-toggle raised"
              href={`mailto:${contact.email}`}
              aria-label="Email QuantEdge"
              title="Email QuantEdge"
            >
              <Icon name="send" width="16" height="16" />
            </a>
          </div>
        </div>

        <div className="nav-cta">
          <button
            className="theme-toggle raised"
            onClick={toggle}
            type="button"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <MoonIcon width="16" height="16" /> : <SunIcon width="16" height="16" />}
          </button>
          {onCollege ? (
            <a className="btn btn-primary" href="#proposal">
              Request a Proposal
            </a>
          ) : (
            <Link className="btn btn-primary" to="/college-solutions#proposal">
              Request a Proposal
            </Link>
          )}
          <button
            className="nav-toggle raised"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((o) => !o)}
            type="button"
          >
            {open ? <CloseIcon width="20" height="20" /> : <MenuIcon width="20" height="20" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
