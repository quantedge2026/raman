import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Reveal from "../components/Reveal";
import { Icon, MapPinIcon } from "../icons/Icons";
import { contact, socialLinks } from "../data/content";
import { usePageTitle } from "../hooks/usePageTitle";
import ContactForm from "./contact/ContactForm";
import DemoForm from "./contact/DemoForm";

export default function Contact() {
  usePageTitle(
    "Contact Us",
    "Reach QuantEdge Consultancy Services — phone, email, proposal requests and demo session bookings."
  );

  const location = useLocation();
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
          <div className="eyebrow">Contact Us</div>
          <h1>Let's talk about your next batch.</h1>
          <p>
            Reach us directly, or use the forms below — proposal requests, general
            questions and demo bookings all reach the same team.
          </p>
        </div>
      </header>

      <section>
        <Reveal className="wrap">
          <div className="contact-info-grid">
            <a className="contact-info-card raised" href={`tel:${contact.phone}`}>
              <div className="ic pressed">
                <Icon name="screen" width="20" height="20" />
              </div>
              <h5>Phone</h5>
              <span>{contact.phoneDisplay}</span>
            </a>
            <a className="contact-info-card raised" href={`mailto:${contact.email}`}>
              <div className="ic pressed">
                <Icon name="send" width="20" height="20" />
              </div>
              <h5>Email</h5>
              <span>{contact.email}</span>
            </a>
            {socialLinks.map((s) => (
              <a
                className="contact-info-card raised"
                href={s.url}
                target="_blank"
                rel="noreferrer"
                key={s.label}
              >
                <div className="ic pressed">
                  <Icon name={s.icon} width="20" height="20" />
                </div>
                <h5>{s.label}</h5>
                <span>Follow QuantEdge</span>
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      <section>
        <Reveal className="wrap">
          <div className="head">
            <div className="eyebrow">Find Us</div>
            <h2>Campus location</h2>
          </div>
          <div className="map-placeholder">
            <div className="ic">
              <MapPinIcon width="26" height="26" />
            </div>
            <h4>Address coming soon</h4>
            <p>
              We don't have a public office address on file yet — reach out by phone or
              email in the meantime, and this section will carry a live map once one is
              confirmed.
            </p>
          </div>
        </Reveal>
      </section>

      <section id="proposal-cta">
        <Reveal className="wrap">
          <div className="assess-card raised-lg">
            <div className="assess-orb" />
            <div style={{ position: "relative" }}>
              <div className="eyebrow" style={{ color: "#C9A6D9" }}>
                Institutional Enquiry
              </div>
              <h3>Representing a college or university?</h3>
              <p>
                Skip straight to the full proposal request — program comparison,
                methodology and a 12-field scoping form built for placement offices.
              </p>
            </div>
            <div style={{ position: "relative", textAlign: "center" }}>
              <a className="btn btn-primary" href="/college-solutions#proposal">
                Go to Full Proposal Form
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="forms">
        <Reveal className="wrap">
          <div className="head">
            <div className="eyebrow">Get In Touch</div>
            <h2>Send a message, or book a demo</h2>
          </div>
          <div className="contact-forms-grid">
            <div id="message">
              <ContactForm />
            </div>
            <div id="demo">
              <DemoForm />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
