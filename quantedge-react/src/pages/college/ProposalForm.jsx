import { useState } from "react";
import Reveal from "../../components/Reveal";
import { CheckIcon } from "../../icons/Icons";
import {
  contact,
  verticals,
  institutionTypes,
  programCourses,
  preferredModes,
  preferredDurations,
} from "../../data/content";
import { submitProposal } from "../../utils/api";
import { openWhatsApp, buildProposalMessage } from "../../utils/whatsapp";

const initial = {
  name: "",
  designation: "",
  institution: "",
  institutionType: "",
  email: "",
  phone: "",
  students: "",
  program: "",
  mode: "",
  duration: "",
  message: "",
};

export default function ProposalForm() {
  const [form, setForm] = useState(initial);
  const [needs, setNeeds] = useState([]);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleNeed(title) {
    setNeeds((n) => (n.includes(title) ? n.filter((x) => x !== title) : [...n, title]));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.designation.trim()) e.designation = "Required";
    if (!form.institution.trim()) e.institution = "Required";
    if (!form.institutionType) e.institutionType = "Required";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) e.phone = "Valid phone required";
    if (!form.students || Number(form.students) < 1) e.students = "Required";
    if (!form.program) e.program = "Required";
    if (needs.length === 0) e.needs = "Select at least one";
    if (!form.mode) e.mode = "Required";
    if (!form.duration) e.duration = "Required";
    if (!form.message.trim()) e.message = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await submitProposal({
        name: form.name,
        designation: form.designation,
        institution: form.institution,
        institutionType: form.institutionType,
        email: form.email,
        phone: form.phone,
        students: form.students ? Number(form.students) : undefined,
        program: form.program,
        trainingRequirement: needs,
        mode: form.mode,
        duration: form.duration,
        message: form.message,
      });
    } catch (err) {
      // Saving to QuantEdge's records failed, but WhatsApp is the primary
      // delivery channel here — still send the visitor on to it below.
      console.error("Proposal save failed (WhatsApp will still open):", err);
    }

    openWhatsApp(buildProposalMessage(form, needs));
    setSubmitting(false);
    setSent(true);
  }

  return (
    <section id="proposal">
      <Reveal className="wrap">
        <div className="head">
          <div className="eyebrow">Request a Proposal</div>
          <h2>Tell us about your institution.</h2>
          <p>
            One form reaches QuantEdge directly — no sales queue. A structured proposal
            comes back mapped to your batch size, calendar and training requirement.
          </p>
        </div>

        <div className="pform-shell raised-lg">
          <div className="pform-top">
            <div>
              <h3>Institutional Proposal Request</h3>
              <p>Every field below is required — it's what lets us scope an accurate proposal on the first pass.</p>
            </div>
            <div className="pform-direct">
              <span>Prefer to talk directly?</span>
              <a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="pf-grid">
              <div className="pf-field">
                <label htmlFor="pf-name">
                  Name <span className="req">*</span>
                </label>
                <input
                  id="pf-name"
                  className={`pf-input${errors.name ? " err" : ""}`}
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Full name"
                />
                {errors.name && <span className="pf-error">{errors.name}</span>}
              </div>

              <div className="pf-field">
                <label htmlFor="pf-designation">
                  Designation <span className="req">*</span>
                </label>
                <input
                  id="pf-designation"
                  className={`pf-input${errors.designation ? " err" : ""}`}
                  type="text"
                  value={form.designation}
                  onChange={(e) => update("designation", e.target.value)}
                  placeholder="e.g. Training & Placement Officer"
                />
                {errors.designation && <span className="pf-error">{errors.designation}</span>}
              </div>

              <div className="pf-field">
                <label htmlFor="pf-institution">
                  Institution <span className="req">*</span>
                </label>
                <input
                  id="pf-institution"
                  className={`pf-input${errors.institution ? " err" : ""}`}
                  type="text"
                  value={form.institution}
                  onChange={(e) => update("institution", e.target.value)}
                  placeholder="Institution name"
                />
                {errors.institution && <span className="pf-error">{errors.institution}</span>}
              </div>

              <div className="pf-field">
                <label htmlFor="pf-institution-type">
                  Institution Type <span className="req">*</span>
                </label>
                <select
                  id="pf-institution-type"
                  className={`pf-input${errors.institutionType ? " err" : ""}`}
                  value={form.institutionType}
                  onChange={(e) => update("institutionType", e.target.value)}
                >
                  <option value="">Select institution type</option>
                  {institutionTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.institutionType && (
                  <span className="pf-error">{errors.institutionType}</span>
                )}
              </div>

              <div className="pf-field">
                <label htmlFor="pf-email">
                  Email <span className="req">*</span>
                </label>
                <input
                  id="pf-email"
                  className={`pf-input${errors.email ? " err" : ""}`}
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="name@institution.edu"
                />
                {errors.email && <span className="pf-error">{errors.email}</span>}
              </div>

              <div className="pf-field">
                <label htmlFor="pf-phone">
                  Phone <span className="req">*</span>
                </label>
                <input
                  id="pf-phone"
                  className={`pf-input${errors.phone ? " err" : ""}`}
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91"
                />
                {errors.phone && <span className="pf-error">{errors.phone}</span>}
              </div>

              <div className="pf-field">
                <label htmlFor="pf-students">
                  Number of Students <span className="req">*</span>
                </label>
                <input
                  id="pf-students"
                  className={`pf-input${errors.students ? " err" : ""}`}
                  type="number"
                  min="1"
                  value={form.students}
                  onChange={(e) => update("students", e.target.value)}
                  placeholder="e.g. 240"
                />
                {errors.students && <span className="pf-error">{errors.students}</span>}
              </div>

              <div className="pf-field">
                <label htmlFor="pf-program">
                  Program / Course <span className="req">*</span>
                </label>
                <select
                  id="pf-program"
                  className={`pf-input${errors.program ? " err" : ""}`}
                  value={form.program}
                  onChange={(e) => update("program", e.target.value)}
                >
                  <option value="">Select program</option>
                  {programCourses.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                {errors.program && <span className="pf-error">{errors.program}</span>}
              </div>

              <div className="pf-field">
                <label htmlFor="pf-mode">
                  Preferred Mode <span className="req">*</span>
                </label>
                <select
                  id="pf-mode"
                  className={`pf-input${errors.mode ? " err" : ""}`}
                  value={form.mode}
                  onChange={(e) => update("mode", e.target.value)}
                >
                  <option value="">Select mode</option>
                  {preferredModes.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                {errors.mode && <span className="pf-error">{errors.mode}</span>}
              </div>

              <div className="pf-field">
                <label htmlFor="pf-duration">
                  Preferred Duration <span className="req">*</span>
                </label>
                <select
                  id="pf-duration"
                  className={`pf-input${errors.duration ? " err" : ""}`}
                  value={form.duration}
                  onChange={(e) => update("duration", e.target.value)}
                >
                  <option value="">Select duration</option>
                  {preferredDurations.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.duration && <span className="pf-error">{errors.duration}</span>}
              </div>
            </div>

            <div className="pf-field full">
              <label>
                Training Requirement <span className="req">*</span>
              </label>
              <span className="hint">Select every vertical relevant to this batch.</span>
              <div className={`pf-chip-group${errors.needs ? " err" : ""}`}>
                {verticals.map((v) => {
                  const checked = needs.includes(v.title);
                  return (
                    <label
                      className={`pf-chip${checked ? " checked" : ""}`}
                      key={v.id}
                      htmlFor={`need-${v.id}`}
                    >
                      <input
                        id={`need-${v.id}`}
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleNeed(v.title)}
                      />
                      {checked && <CheckIcon width="13" height="13" />}
                      {v.title}
                    </label>
                  );
                })}
              </div>
              {errors.needs && <span className="pf-error">{errors.needs}</span>}
            </div>

            <div className="pf-field full">
              <label htmlFor="pf-message">
                Message <span className="req">*</span>
              </label>
              <textarea
                id="pf-message"
                className={`pf-input${errors.message ? " err" : ""}`}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Academic calendar, target companies, anything else worth knowing before we scope this."
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
                  "Send Proposal Request"
                )}
              </button>
              <p className="pf-note">
                Saves your request with QuantEdge, then opens WhatsApp with everything
                filled in — just press send there to complete it.
              </p>
            </div>

            {sent && (
              <div className="pf-success">
                <CheckIcon width="16" height="16" />
                WhatsApp opened in a new tab with your proposal request filled in — press
                send there to reach QuantEdge.
              </div>
            )}
          </form>
        </div>
      </Reveal>
    </section>
  );
}
