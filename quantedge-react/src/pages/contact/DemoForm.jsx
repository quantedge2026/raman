import { useState } from "react";
import { CheckIcon } from "../../icons/Icons";
import { submitDemoRequest } from "../../utils/api";
import { openWhatsApp, buildDemoMessage } from "../../utils/whatsapp";

const initial = {
  name: "",
  email: "",
  phone: "",
  institution: "",
  preferredDate: "",
  preferredTimeSlot: "",
  attendees: "",
  message: "",
};

const timeSlots = ["Morning (10am–12pm)", "Afternoon (12pm–4pm)", "Evening (4pm–6pm)"];

export default function DemoForm() {
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
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) e.phone = "Valid phone required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await submitDemoRequest({
        ...form,
        attendees: form.attendees ? Number(form.attendees) : undefined,
      });
    } catch (err) {
      // Saving to QuantEdge's records failed, but WhatsApp is the primary
      // delivery channel here — still send the visitor on to it below.
      console.error("Demo request save failed (WhatsApp will still open):", err);
    }

    openWhatsApp(buildDemoMessage(form));
    setSubmitting(false);
    setSent(true);
  }

  return (
    <div className="pform-shell raised-lg">
      <div className="pform-top">
        <div>
          <h3>Book a Demo Session</h3>
          <p>A walkthrough of the training approach and web portal, scheduled around your team.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="pf-grid">
          <div className="pf-field">
            <label htmlFor="df-name">
              Name <span className="req">*</span>
            </label>
            <input
              id="df-name"
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
            <label htmlFor="df-institution">Institution</label>
            <input
              id="df-institution"
              className="pf-input"
              type="text"
              value={form.institution}
              onChange={(e) => update("institution", e.target.value)}
              placeholder="Optional"
            />
          </div>

          <div className="pf-field">
            <label htmlFor="df-email">
              Email <span className="req">*</span>
            </label>
            <input
              id="df-email"
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
            <label htmlFor="df-phone">
              Phone <span className="req">*</span>
            </label>
            <input
              id="df-phone"
              className="pf-input"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+91"
            />
            {errors.phone && <span className="pf-error">{errors.phone}</span>}
          </div>

          <div className="pf-field">
            <label htmlFor="df-date">Preferred Date</label>
            <input
              id="df-date"
              className="pf-input"
              type="date"
              value={form.preferredDate}
              onChange={(e) => update("preferredDate", e.target.value)}
            />
          </div>

          <div className="pf-field">
            <label htmlFor="df-slot">Preferred Time Slot</label>
            <select
              id="df-slot"
              className="pf-input"
              value={form.preferredTimeSlot}
              onChange={(e) => update("preferredTimeSlot", e.target.value)}
            >
              <option value="">Select a slot</option>
              {timeSlots.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="pf-field">
            <label htmlFor="df-attendees">Number of Attendees</label>
            <input
              id="df-attendees"
              className="pf-input"
              type="number"
              min="1"
              value={form.attendees}
              onChange={(e) => update("attendees", e.target.value)}
              placeholder="e.g. 3"
            />
          </div>
        </div>

        <div className="pf-field full">
          <label htmlFor="df-message">Message</label>
          <textarea
            id="df-message"
            className="pf-input"
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Anything specific you'd like covered in the demo."
          />
        </div>

        <div className="pf-submit-row">
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <span className="spinner" /> Sending…
              </>
            ) : (
              "Request Demo Session"
            )}
          </button>
          <p className="pf-note">
            Saves your request with QuantEdge, then opens WhatsApp with everything filled
            in — just press send there to confirm.
          </p>
        </div>

        {sent && (
          <div className="pf-success">
            <CheckIcon width="16" height="16" />
            WhatsApp opened in a new tab with your demo request filled in — press send
            there to reach QuantEdge.
          </div>
        )}
      </form>
    </div>
  );
}
