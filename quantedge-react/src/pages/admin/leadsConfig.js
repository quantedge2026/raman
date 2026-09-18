// Config for each lead resource the admin dashboard manages — shared by
// LeadsTable so it doesn't need a separate component per resource type.
export const RESOURCE_CONFIG = {
  proposals: {
    label: "Proposal Requests",
    path: "/api/proposals",
    statuses: ["new", "contacted", "converted", "closed"],
    columns: [
      { key: "name", label: "Name" },
      { key: "institution", label: "Institution" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
    ],
    detailFields: [
      { key: "designation", label: "Designation" },
      { key: "institutionType", label: "Institution Type" },
      { key: "students", label: "Number of Students" },
      { key: "program", label: "Program / Course" },
      { key: "trainingRequirement", label: "Training Requirement", join: true },
      { key: "mode", label: "Preferred Mode" },
      { key: "duration", label: "Preferred Duration" },
      { key: "message", label: "Message" },
    ],
  },
  contacts: {
    label: "Contact Messages",
    path: "/api/contact",
    statuses: ["new", "contacted", "converted", "closed"],
    columns: [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "institution", label: "Institution" },
    ],
    detailFields: [{ key: "message", label: "Message" }],
  },
  demos: {
    label: "Demo Requests",
    path: "/api/demo",
    statuses: ["new", "scheduled", "completed", "closed"],
    columns: [
      { key: "name", label: "Name" },
      { key: "institution", label: "Institution" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
    ],
    detailFields: [
      { key: "preferredDate", label: "Preferred Date" },
      { key: "preferredTimeSlot", label: "Preferred Time Slot" },
      { key: "attendees", label: "Attendees" },
      { key: "message", label: "Message" },
    ],
  },
};
