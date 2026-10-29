import type { SVGProps } from "react";

// Brand marks are inline SVGs. Lucide removed brand icons in its 1.x release.
type IconProps = SVGProps<SVGSVGElement>;
const defaults: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function XIcon(props: IconProps) {
  return (
    <svg {...defaults} fill="currentColor" stroke="none" {...props}>
      <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-7.38L5.62 22H2.5l7.99-9.13L.8 2h6.4l4.42 6.75L18.9 2Zm-1.1 18h1.73L6.25 3.9H4.4L17.8 20Z" />
    </svg>
  );
}
export function InstagramIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.5 10v7M11.5 17v-7m0 3a3 3 0 0 1 6 0v4" />
      <circle cx="7.5" cy="7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function GitHubIcon(props: IconProps) {
  return (
    <svg {...defaults} fill="currentColor" stroke="none" {...props}>
      <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-2.1c-3.12.68-3.78-1.32-3.78-1.32-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.71 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.49-.28-5.11-1.25-5.11-5.54 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.08 1.15A10.73 10.73 0 0 1 12 6.2c.95 0 1.9.13 2.79.38 2.14-1.45 3.08-1.15 3.08-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.3-2.62 5.25-5.12 5.53.4.35.76 1.03.76 2.08v3.09c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
    </svg>
  );
}
