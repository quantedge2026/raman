import { Link } from "react-router-dom";
import { contact } from "../data/content";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-logo-badge">
              <img src={logo} alt="QuantEdge" className="brand-logo" />
            </div>
            <p
              style={{
                fontSize: ".85rem",
                color: "#B7C0E6",
                marginTop: 12,
                maxWidth: "32ch",
                lineHeight: 1.6,
              }}
            >
              Premium campus placement &amp; employability solutions for engineering and
              management institutions.
            </p>
          </div>
          <div>
            <h6>Programs</h6>
            <ul>
              <li>
                <Link to="/college-solutions#compare">Compare All Programs</Link>
              </li>
              <li>
                <Link to="/college-solutions#methodology">Training Methodology</Link>
              </li>
              <li>
                <Link to="/college-solutions#platform">Learning Platform</Link>
              </li>
            </ul>
          </div>
          <div>
            <h6>Training</h6>
            <ul>
              <li>
                <Link to="/programs#tech">Aptitude &amp; Technical</Link>
              </li>
              <li>
                <Link to="/programs#ai">AI &amp; Data Analytics</Link>
              </li>
              <li>
                <Link to="/programs#company">Company-Specific Prep</Link>
              </li>
            </ul>
          </div>
          <div>
            <h6>Company</h6>
            <ul>
              <li>
                <Link to="/about">About QuantEdge</Link>
              </li>
              <li>
                <Link to="/about#leadership">Leadership</Link>
              </li>
              <li>
                <Link to="/about#credibility">Credibility</Link>
              </li>
              <li>
                <Link to="/testimonials">Testimonials</Link>
              </li>
            </ul>
          </div>
          <div>
            <h6>Contact</h6>
            <ul>
              <li>
                <Link to="/contact">Contact Page</Link>
              </li>
              <li>
                <Link to="/contact#demo">Book a Demo</Link>
              </li>
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 QuantEdge Consultancy Services. All rights reserved.</span>
          <Link to="/terms" style={{ color: "#dde3f7" }}>
            Terms &amp; Conditions
          </Link>
          <span>{contact.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
