import { cn } from "@/lib/utils";

export function ArrowIcon(props, className) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <g
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path strokeDasharray="20" strokeDashoffset="20" d="M21 12H3.5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.3s"
            values="20;0"
          ></animate>
        </path>
        <path
          strokeDasharray="12"
          strokeDashoffset="12"
          d="M3 12L10 19M3 12L10 5"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.3s"
            dur="0.2s"
            values="12;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
}
