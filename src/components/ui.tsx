import type { ReactNode } from "react";

export type IconName =
  | "home"
  | "heart"
  | "hospital"
  | "users"
  | "cart"
  | "car"
  | "gift"
  | "calendar"
  | "shield"
  | "rupee"
  | "support"
  | "chat"
  | "pin"
  | "bell"
  | "arrow"
  | "close"
  | "chevron"
  | "play"
  | "check"
  | "leaf"
  | "clock"
  | "sparkles"
  | "arrow-left"
  | "search"
  | "plus"
  | "edit"
  | "check-circle";

const iconPaths: Record<IconName, ReactNode> = {
  home: <path d="m3 10 9-7 9 7v11h-6v-7H9v7H3z" />,
  heart: <path d="M20 5a5 5 0 0 0-8 1 5 5 0 0 0-8-1c-5 5 1 10 8 16 7-6 13-11 8-16Z" />,
  hospital: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6m-3-3v6m-3 5h1m4 0h1m-5 5v-3h4v3" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 21v-3a6 6 0 0 1 12 0v3m1-16a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5" />
    </>
  ),
  cart: (
    <>
      <path d="M2 3h3l3 13h11l3-9H6" />
      <circle cx="9" cy="21" r="1" />
      <circle cx="18" cy="21" r="1" />
    </>
  ),
  car: <path d="m4 10 2-6h12l2 6M3 11h18v7H3zm2 7v3m14-3v3M6 14h2m8 0h2" />,
  gift: (
    <>
      <rect x="3" y="8" width="18" height="5" rx="1" />
      <path d="M5 13v8h14v-8M12 8v13M12 8C4 8 6 1 9 3l3 5c8 0 6-7 3-5z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M7 3v4m10-4v4M3 11h18" />
    </>
  ),
  shield: (
    <>
      <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  rupee: <path d="M6 4h12M6 8h12M8 4c9 0 9 9 0 9H6l10 8" />,
  support: (
    <>
      <path d="M4 13v-2a8 8 0 0 1 16 0v7q0 4-7 4" />
      <rect x="2" y="11" width="4" height="8" rx="2" />
      <rect x="18" y="11" width="4" height="8" rx="2" />
    </>
  ),
  chat: (
    <>
      <path d="M21 11a9 9 0 0 1-9 9H4l-3 2 2-7a9 9 0 1 1 18-4Z" />
      <path d="M7 10h10m-10 4h6" />
    </>
  ),
  pin: (
    <>
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2" />
    </>
  ),
  bell: <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4" />,
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  chevron: <path d="m9 5 7 7-7 7" />,
  play: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m10 8 6 4-6 4z" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  leaf: (
    <>
      <path d="M20 3c0 10-3 16-10 16a6 6 0 0 1-6-6C4 6 10 3 20 3Z" />
      <path d="m3 21 12-12" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  sparkles: (
    <>
      <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />
      <path d="M20 2v4m-2-2h4M3 18v4m-2-2h4" />
    </>
  ),
  "arrow-left": <path d="M20 12H4m6-6-6 6 6 6" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  edit: (
    <>
      <path d="m15 5 4 4M4 20l4-1 13-13a2.8 2.8 0 0 0-4-4L4 15l-1 6 1-1Z" />
      <path d="M13 21h8" />
    </>
  ),
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
};

export function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      className={`ico${className ? ` ${className}` : ""}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {iconPaths[name]}
    </svg>
  );
}

export function Brand() {
  return (
    <span className="brand">
      <svg viewBox="0 0 38 38" aria-hidden="true" focusable="false">
        <path d="M17 32C2 30 3 11 2 5c15 4 18 15 15 27" fill="#447a43" />
        <path d="M21 32C19 15 28 8 37 4c0 17-7 27-16 28" fill="#62985a" />
        <path d="m7 12 10 20M31 13 21 32" fill="none" stroke="#a8c59b" />
      </svg>
      saatth.
    </span>
  );
}

export function MapPreview() {
  return (
    <div
      className="map"
      role="img"
      aria-label="Illustrative companion route in Vaishali Nagar, Jaipur, with a sample arrival estimate of 12 minutes"
    >
      <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <rect width="320" height="180" fill="#eef0e7" />

        <g fill="#e4e8dc" stroke="#dce2d2" strokeWidth="0.5">
          <rect x="13" y="64" width="43" height="48" rx="5" />
          <rect x="86" y="66" width="31" height="28" rx="4" />
          <rect x="139" y="66" width="47" height="50" rx="5" />
          <rect x="219" y="69" width="32" height="45" rx="4" />
          <rect x="281" y="66" width="43" height="48" rx="5" />
          <rect x="86" y="149" width="39" height="37" rx="4" />
          <rect x="139" y="149" width="48" height="24" rx="4" />
          <rect x="217" y="149" width="37" height="35" rx="4" />
        </g>
        <path d="M14 4h37a7 7 0 0 1 7 7v21a7 7 0 0 1-7 7H14a7 7 0 0 1-7-7V11a7 7 0 0 1 7-7Z" fill="#dce5ce" />
        <path d="M264 152h48v28h-48z" fill="#dce5ce" />
        <g fill="#c5d6b4" opacity="0.85">
          <circle cx="22" cy="18" r="5" />
          <circle cx="34" cy="28" r="4" />
          <circle cx="47" cy="16" r="6" />
          <circle cx="281" cy="164" r="5" />
          <circle cx="297" cy="173" r="6" />
        </g>

        <g fill="none" stroke="#fafbf6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0 52h320M0 132h320M70-10v200M202-10v200" strokeWidth="14" />
          <path d="M132 52v132M266 52v132M70 104h62M9 119l43 43" strokeWidth="7" />
          <path d="m-15 190 91-84 62-54 71-66" strokeWidth="9" />
        </g>
        <g fill="#8c9781" fontFamily="Arial, sans-serif" fontSize="6.5" letterSpacing="0.6">
          <text x="88" y="25">VAISHALI NAGAR</text>
          <text x="100" y="43" fontSize="6" letterSpacing="0.1">Gandhi Path</text>
          <text x="224" y="145" fontSize="6" letterSpacing="0.1">Queens Road</text>
        </g>

        <path
          d="M70 101V71a19 19 0 0 1 19-19h94a19 19 0 0 1 19 19v42a19 19 0 0 0 19 19h45"
          fill="none"
          stroke="#c7d4bd"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.65"
        />
        <path
          d="M70 101V71a19 19 0 0 1 19-19h94a19 19 0 0 1 19 19v42a19 19 0 0 0 19 19h45"
          fill="none"
          stroke="#497153"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="4 5"
        />

        <circle cx="70" cy="103" r="16" fill="#244f3e" opacity="0.08" />
        <circle cx="70" cy="100" r="14" fill="#fffdf7" stroke="#d6dfce" />
        <circle cx="70" cy="100" r="10" fill="#e9d9c5" />
        <circle cx="70" cy="97" r="3.2" fill="#976f52" />
        <path d="M64.5 106a5.5 5.5 0 0 1 11 0" fill="#976f52" />
        <circle cx="79" cy="90" r="3.5" fill="#497153" stroke="#fffdf7" strokeWidth="1.5" />

        <circle cx="266" cy="134" r="16" fill="#244f3e" opacity="0.08" />
        <circle cx="266" cy="132" r="14" fill="#244f3e" stroke="#fffdf7" strokeWidth="3" />
        <path d="m260 131 6-5 6 5v7h-4v-4h-4v4h-4z" fill="none" stroke="#fffdf7" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
      <span className="eta"><strong>12 min</strong> away</span>
      <span className="map-caption">Illustrative route</span>
    </div>
  );
}
