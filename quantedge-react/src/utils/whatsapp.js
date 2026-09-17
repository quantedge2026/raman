import { contact } from "../data/content";

// Opens WhatsApp (app on mobile, WhatsApp Web on desktop) with a prefilled
// message, in a new tab so the site itself stays open behind it.
export function openWhatsApp(message) {
  const url = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function line(label, value) {
  if (value === undefined || value === null || value === "") return null;
  return `*${label}:* ${value}`;
}

function buildMessage(intro, fieldLines) {
  const body = fieldLines.filter(Boolean).join("\n");
  return `${intro}\n\n${body}\n\n— Sent via quantedgecs.com`;
}

export function buildProposalMessage(form, trainingRequirement = []) {
  return buildMessage("Hi QuantEdge! I'd like to request a training proposal.", [
    line("Name", form.name),
    line("Designation", form.designation),
    line("Institution", form.institution),
    line("Institution Type", form.institutionType),
    line("Email", form.email),
    line("Phone", form.phone),
    line("Number of Students", form.students),
    line("Program / Course", form.program),
    line("Training Requirement", trainingRequirement.join(", ")),
    line("Preferred Mode", form.mode),
    line("Preferred Duration", form.duration),
    line("Message", form.message),
  ]);
}

export function buildDemoMessage(form) {
  return buildMessage("Hi QuantEdge! I'd like to book a demo session.", [
    line("Name", form.name),
    line("Institution", form.institution),
    line("Email", form.email),
    line("Phone", form.phone),
    line("Preferred Date", form.preferredDate),
    line("Preferred Time Slot", form.preferredTimeSlot),
    line("Attendees", form.attendees),
    line("Message", form.message),
  ]);
}

export function buildTrainingInterestMessage(vertical) {
  return buildMessage(`Hi QuantEdge! I'm interested in your *${vertical.title}* track.`, [
    line("Track Covers", vertical.short),
    "I'd like to know more about batch scheduling, delivery mode and pricing.",
  ]);
}

export function buildContactMessage(form) {
  return buildMessage("Hi QuantEdge! I have a question.", [
    line("Name", form.name),
    line("Email", form.email),
    line("Phone", form.phone),
    line("Institution", form.institution),
    line("Message", form.message),
  ]);
}
