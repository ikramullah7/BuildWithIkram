import type { SVGProps } from "react";
export function Arrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}
export function Play(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function Mark() {
  return (
    <svg
      width="32"
      height="34"
      viewBox="0 0 32 34"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 8v18M14 4v26M22 8v18M30 12v10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
