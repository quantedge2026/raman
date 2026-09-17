import Reveal from "../components/Reveal";
import { contact } from "../data/content";
import { usePageTitle } from "../hooks/usePageTitle";

const SECTIONS = [
  {
    title: "1. Website Use",
    body: "This website is provided for information about QuantEdge's training, placement and employability solutions. Please use the website only for lawful purposes.",
  },
  {
    title: "2. Training & Placement",
    body: "Our programs are designed to improve students' skills and placement readiness. However, participation in our programs does not guarantee placement, employment, salary, or selection by any particular company.",
  },
  {
    title: "3. Content & Materials",
    body: "All website content, training materials, branding, logos, and resources belong to QuantEdge Consultancy Services or their respective owners. They may not be copied, reproduced, or distributed without permission.",
  },
  {
    title: "4. Information Accuracy",
    body: "We make reasonable efforts to keep information accurate and updated. Program details, schedules, and services may change when required.",
  },
  {
    title: "5. User Information",
    body: "Information submitted through our contact, proposal, or registration forms should be accurate and may be used to respond to your enquiry or provide our services.",
  },
  {
    title: "6. Third-Party Links",
    body: "Our website may contain links to third-party websites. QuantEdge is not responsible for their content, policies, or services.",
  },
  {
    title: "7. Changes to Terms",
    body: "QuantEdge reserves the right to update these Terms & Conditions when necessary. Any updates will be published on this page.",
  },
];

export default function Terms() {
  usePageTitle(
    "Terms & Conditions",
    "Terms and conditions for using the QuantEdge Consultancy Services website and training programs."
  );

  return (
    <section className="legal-page">
      <Reveal className="wrap legal-wrap">
        <div className="eyebrow">Legal</div>
        <h1>Terms &amp; Conditions</h1>
        <p className="legal-updated">Last Updated: 2026</p>

        <p className="legal-intro">
          Welcome to QuantEdge Consultancy Services. By accessing and using our website, you
          agree to the following terms:
        </p>

        {SECTIONS.map((s) => (
          <div className="legal-section" key={s.title}>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}

        <div className="legal-section">
          <h3>8. Contact</h3>
          <p>
            For questions regarding these Terms, contact us at:
            <br />
            Email: {contact.email}
            <br />
            Phone: {contact.phoneDisplay}
          </p>
        </div>

        <p className="legal-footer-note">
          © 2026 QuantEdge Consultancy Services. All Rights Reserved.
        </p>
      </Reveal>
    </section>
  );
}
