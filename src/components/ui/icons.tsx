import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

function Percent({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <circle cx="7" cy="7" r="2.25" />
      <circle cx="17" cy="17" r="2.25" />
      <path d="M18.5 5.5 5.5 18.5" />
    </svg>
  );
}

function Wallet({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z" />
      <path d="M16 12.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentColor" stroke="none" />
      <path d="M3 9h18" />
    </svg>
  );
}

function Chart({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M3 19V5" />
      <path d="M3 19h18" />
      <path d="m6 14 3-3 3 2 5-6" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Phone({ size = 24, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10 18.5h4" />
    </svg>
  );
}

function ArrowRight({ size = 18, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function ArrowDown({ size = 18, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M12 5v14" />
      <path d="m6 13 6 6 6-6" />
    </svg>
  );
}

const map = {
  percent: Percent,
  wallet: Wallet,
  chart: Chart,
  phone: Phone,
  arrowRight: ArrowRight,
  arrowDown: ArrowDown,
} as const;

export type IconName = keyof typeof map;

export function Icon({ name, ...rest }: { name: IconName } & IconProps) {
  const Cmp = map[name];
  return <Cmp {...rest} />;
}
