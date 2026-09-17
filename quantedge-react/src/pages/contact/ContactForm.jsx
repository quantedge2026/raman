import { useState } from "react";
import { CheckIcon } from "../../icons/Icons";
import { submitContact } from "../../utils/api";
import { openWhatsApp, buildContactMessage } from "../../utils/whatsapp";

const initial = { name: "", email: "", phone: "", institution: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await submitContact(form);
    } catch (err) {
      // Saving to QuantEdge's records failed, but WhatsApp is the primary
      // delivery channel here — still send the visitor on to it below.
      console.error("Contact save failed (WhatsApp will still open):", err);
    }

    openWhatsApp(buildContactMessage(form));
    setSubmitting(false);
    setSent(true);
  }

  return (
    <div className="pform-shell raised-lg">
      <div className="pform-top">
        <div>
          <h3>Send a Message</h3>
          <p>General questions, partnership enquiries — anything that doesn't need the full proposal form.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="pf-grid">
          <div className="pf-field">
            <label htmlFor="cf-name">
              Name <span className="req">*</span>
            </label>
            <input
              id="cf-name"
              className="pf-input"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Full name"
            />
            {errors.name && <span className="pf-error">{errors.name}</span>}
          </div>

          <div className="pf-field">
            <label htmlFor="cf-email">
              Email <span className="req">*</span>
            </label>
            <input
              id="cf-email"
              className="pf-input"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
            />
            {errors.email && <span className="pf-error">{errors.email}</span>}
          </div>

          <div className="pf-field">
            <label htmlFor="cf-phone">Phone</label>
            <input
              id="cf-phone"
              className="pf-input"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+91 (optional)"
            />
          </div>

          <div className="pf-field">
            <label htmlFor="cf-institution">Institution</label>
            <input
              id="cf-institution"
              className="pf-input"
              type="text"
              value={form.institution}
              onChange={(e) => update("institution", e.target.value)}
              placeholder="Optional"
            />
          </div>
        </div>

        <div className="pf-field full">
          <label htmlFor="cf-message">
            Message <span className="req">*</span>
          </label>
          <textarea
            id="cf-message"
            className="pf-input"
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="What can we help with?"
          />
          {errors.message && <span className="pf-error">{errors.message}</span>}
        </div>

        <div className="pf-submit-row">
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <span className="spinner" /> Sending…
              </>
            ) : (
              "Send Message"
            )}
          </button>
          <p className="pf-note">
            Saves your message with QuantEdge, then opens WhatsApp with everything filled
            in — just press send there to reach us.
          </p>
        </div>

        {sent && (
          <div className="pf-success">
            <CheckIcon width="16" height="16" />
            WhatsApp opened in a new tab with your message filled in — press send there to
            reach QuantEdge.
          </div>
        )}
      </form>
    </div>
  );
}
