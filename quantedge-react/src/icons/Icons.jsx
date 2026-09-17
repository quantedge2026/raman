// Line-only icon set, 1.75px stroke — one consistent hand throughout the app.
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function CapIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M2 9 12 4l10 5-10 5-10-5Z" />
      <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    </svg>
  );
}
export function CodeIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4" />
    </svg>
  );
}
export function AiIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M9 9h6v6H9z" />
      <path d="M4 9h-2M4 15h-2M22 9h-2M22 15h-2M9 4V2M15 4V2M9 22v-2M15 22v-2" />
    </svg>
  );
}
export function PeopleIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20c0-3 3-5 7-5s7 2 7 5" />
      <circle cx="17" cy="8" r="2.4" />
      <path d="M17 12c2.5.3 4 1.8 4 4" />
    </svg>
  );
}
export function BriefcaseIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
    </svg>
  );
}
export function BarsIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 12h4l3 8 4-16 3 8h4" />
    </svg>
  );
}
export function BuildingIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 21V7l8-4 8 4v14" />
      <path d="M9 21v-6h6v6M9 11h.01M15 11h.01" />
    </svg>
  );
}
export function ShieldIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="m9 12 2 2 4-4" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}
export function TargetIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v18M3 12h18" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}
export function ChartIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 12h4l3 8 4-16 3 8h4" />
    </svg>
  );
}
export function CheckIcon(props) {
  return (
    <svg {...base} strokeWidth={2.2} {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
export function ClockIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 8v4l3 3" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}
export function UsersIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20c0-3 3-5 7-5s7 2 7 5" />
      <path d="M17 8h4M17 12h4" />
    </svg>
  );
}
export function ScreenIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}
export function BookIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 19V5a2 2 0 0 1 2-2h11l3 3v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}
export function SearchIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
export function ArrowRightIcon(props) {
  return (
    <svg {...base} strokeWidth={2} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
export function ChevronDownIcon(props) {
  return (
    <svg {...base} strokeWidth={2} {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
export function MenuIcon(props) {
  return (
    <svg {...base} strokeWidth={2} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
export function CloseIcon(props) {
  return (
    <svg {...base} strokeWidth={2} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function ImageIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}

export function LinkedinIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.5 10v7M7.5 7v.01M11.5 17v-4.5c0-1.2 1-2 2.2-2 1.2 0 2.3.8 2.3 2V17" />
    </svg>
  );
}
export function InstagramIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17 7h.01" />
    </svg>
  );
}
export function SendIcon(props) {
  return (
    <svg {...base} strokeWidth={2} {...props}>
      <path d="m3 3 18 9-18 9 4-9-4-9Z" />
    </svg>
  );
}
export function MapPinIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s-7-7.2-7-12a7 7 0 0 1 14 0c0 4.8-7 12-7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}
export function SunIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
    </svg>
  );
}
export function MoonIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
    </svg>
  );
}
export function ChatIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  );
}
export function CalendarIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  );
}

export const iconMap = {
  cap: CapIcon,
  code: CodeIcon,
  ai: AiIcon,
  people: PeopleIcon,
  briefcase: BriefcaseIcon,
  bars: ChartIcon,
  building: BuildingIcon,
  shield: ShieldIcon,
  target: TargetIcon,
  chart: ChartIcon,
  check: CheckIcon,
  clock: ClockIcon,
  users: UsersIcon,
  screen: ScreenIcon,
  book: BookIcon,
  search: SearchIcon,
  image: ImageIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  send: SendIcon,
  pin: MapPinIcon,
  calendar: CalendarIcon,
};

export function Icon({ name, ...rest }) {
  const Cmp = iconMap[name] || ShieldIcon;
  return <Cmp {...rest} />;
}
