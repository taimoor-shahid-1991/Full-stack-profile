import type { ReactNode } from "react";

type IconProps = {
  className?: string;
};

const svgProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 100 100",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function WebDevIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <rect x="18" y="18" width="64" height="44" rx="4" />
      <path d="M18 30h64" />
      <circle cx="26" cy="24" r="1.5" fill="currentColor" />
      <circle cx="32" cy="24" r="1.5" fill="currentColor" />
      <circle cx="38" cy="24" r="1.5" fill="currentColor" />
      <path d="M28 40h44" />
      <path d="M28 48h32" />
      <path d="M28 56h24" />
      <path d="M38 62v8" />
      <path d="M62 62v8" />
      <path d="M32 70h36" />
    </svg>
  );
}

export function MobileDevIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <rect x="32" y="12" width="36" height="76" rx="6" />
      <path d="M42 20h16" />
      <rect x="38" y="28" width="24" height="44" rx="2" />
      <circle cx="50" cy="80" r="2" fill="currentColor" />
    </svg>
  );
}

export function FrontendDevIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M20 58l30-16 30 16-30 16-30-16z" />
      <path d="M30 48l20-10 20 10" />
      <path d="M40 38l10-5 10 5" />
    </svg>
  );
}

export function BackendDevIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <rect x="16" y="24" width="68" height="20" rx="4" />
      <circle cx="28" cy="34" r="2" fill="currentColor" />
      <circle cx="36" cy="34" r="2" fill="currentColor" />
      <rect x="16" y="56" width="68" height="20" rx="4" />
      <circle cx="28" cy="66" r="2" fill="currentColor" />
      <circle cx="36" cy="66" r="2" fill="currentColor" />
    </svg>
  );
}

export function CmsDevIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <rect x="24" y="24" width="22" height="22" rx="3" />
      <rect x="54" y="24" width="22" height="22" rx="3" />
      <rect x="24" y="54" width="22" height="22" rx="3" />
      <rect x="54" y="54" width="22" height="22" rx="3" />
    </svg>
  );
}

export function DeploymentIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <path d="M50 18c-14 0-26 10-30 24l-6 3 4 4-4 4 8 2 2 8 4-4 4 4 3-5c14-3 25-14 25-30z" />
      <circle cx="44" cy="34" r="4" />
      <path d="M26 62l-4 4" />
      <path d="M34 70l-3 3" />
      <path d="M42 76l-2 2" />
    </svg>
  );
}
