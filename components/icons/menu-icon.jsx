export function MenuIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      >
        <path d="M5 5L12 12L19 5">
          <animate
            fill="freeze"
            attributeName="d"
            dur="0.4s"
            values="M5 5L12 12L19 5;M5 5L12 5L19 5"
          ></animate>
        </path>
        <path d="M12 12H12">
          <animate
            fill="freeze"
            attributeName="d"
            dur="0.4s"
            values="M12 12H12;M5 12H19"
          ></animate>
        </path>
        <path d="M5 19L12 12L19 19">
          <animate
            fill="freeze"
            attributeName="d"
            dur="0.4s"
            values="M5 19L12 12L19 19;M5 19L12 19L19 19"
          ></animate>
        </path>
      </g>
    </svg>
  );
}
