import { useId } from "react";
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
export function Mark() {
  const gradientId = useId();
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 112 112"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#2874e8" />
          <stop offset="1" stopColor="#5146c8" />
        </linearGradient>
      </defs>
      <rect
        x="24"
        y="24"
        width="64"
        height="64"
        rx="22"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M41 57L52 68 73 44"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 8v16M72 8v16M40 88v16M72 88v16M8 40h16M8 72h16M88 40h16M88 72h16"
        stroke="#3566d6"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <g fill="#3566d6">
        <circle cx="40" cy="8" r="4" />
        <circle cx="72" cy="8" r="4" />
        <circle cx="40" cy="104" r="4" />
        <circle cx="72" cy="104" r="4" />
        <circle cx="8" cy="40" r="4" />
        <circle cx="8" cy="72" r="4" />
        <circle cx="104" cy="40" r="4" />
        <circle cx="104" cy="72" r="4" />
      </g>
    </svg>
  );
}

export function ServiceIcon({
  kind,
}: {
  kind: "workflow" | "document" | "system" | "ai" | "outcome";
}) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {kind === "ai" ? (
        <>
          <rect x="6" y="6" width="12" height="12" rx="3" />
          <path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4M9 14l3-5 3 5m-5-2h4" />
        </>
      ) : kind === "outcome" ? (
        <>
          <circle cx="11" cy="13" r="8" />
          <circle cx="11" cy="13" r="4" />
          <path d="m11 13 9-9m-5 0h5v5" />
        </>
      ) : kind === "workflow" ? (
        <>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <path d="M10 6h7v5m-3-3 3 3 3-3M6 10v7h5" />
        </>
      ) : kind === "document" ? (
        <>
          <path d="M14 3H5v18h14V8zM14 3v5h5M8 12h8M8 16h5" />
        </>
      ) : (
        <>
          <rect x="3" y="3" width="18" height="7" rx="2" />
          <rect x="3" y="14" width="18" height="7" rx="2" />
          <path d="M7 6.5h.01M7 17.5h.01M11 6.5h6M11 17.5h6M12 10v4" />
        </>
      )}
    </svg>
  );
}
