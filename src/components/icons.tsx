import type { SVGProps } from "react";

/**
 * Hand-authored line-icon set, drawn specifically for this project.
 * Deliberately avoids any third-party icon library so the whole visual
 * language — illustrations and iconography alike — stays original.
 */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconConcierge(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 19h16" />
      <path d="M5 19v-4a7 7 0 0 1 14 0v4" />
      <path d="M12 8V5" />
      <path d="M9.5 5h5" />
      <circle cx="12" cy="3.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconKey(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="8" cy="15" r="3.4" />
      <path d="M10.3 12.7 18 5" />
      <path d="M15.2 7.8 17.4 10" />
      <path d="M17.6 5.6 19.8 7.8" />
    </svg>
  );
}

export function IconCards(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="7" y="4" width="10" height="15" rx="1.6" transform="rotate(8 12 11.5)" />
      <rect x="5.4" y="5.6" width="10" height="15" rx="1.6" />
    </svg>
  );
}

export function IconGlass(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 4h12l-5.2 7v7" />
      <path d="M8.8 18h6.4" />
      <path d="M6 4c0 3 2.7 5.4 6 5.4S18 7 18 4" />
    </svg>
  );
}

export function IconSpa(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20c4-1.4 6-4.6 6-8.3C18 8 15.5 5 12 3c-3.5 2-6 5-6 8.7 0 3.7 2 6.9 6 8.3Z" />
      <path d="M12 20V9" />
    </svg>
  );
}

export function IconCigar(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="10.5" width="15" height="4.2" rx="2.1" transform="rotate(-8 10.5 12.6)" />
      <path d="M18 12.2c1.4-.4 2.6.2 3 1.4" />
    </svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 19 6v5.5c0 5-3 8-7 9-4-1-7-4-7-9V6Z" />
      <path d="M9 12l2 2 4-4.5" />
    </svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function IconMapPin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-6.2 7-11.6A7 7 0 0 0 5 9.4C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.4" r="2.4" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.8" />
      <path d="M4 6.5l8 6.4 8-6.4" />
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5.5 8.5 12 15l6.5-6.5" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 5l14 14" />
      <path d="M19 5 5 19" />
    </svg>
  );
}

export function IconStarDiamond(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2 15 12 12 22 9 12Z" />
    </svg>
  );
}

export function IconCar(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 16v-2.5L6 9h12l2 4.5V16" />
      <path d="M4 16h16" />
      <path d="M4 16v2.2" />
      <path d="M20 16v2.2" />
      <circle cx="7.6" cy="16" r="1.3" />
      <circle cx="16.4" cy="16" r="1.3" />
      <path d="M6 9l1.2-3h9.6L18 9" />
    </svg>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8.5" r="2.6" />
      <path d="M3.8 19c0-3 2.3-5 5.2-5s5.2 2 5.2 5" />
      <circle cx="16.5" cy="9.2" r="2.1" />
      <path d="M15.4 14.3c2.3.2 4 2 4 4.7" />
    </svg>
  );
}
