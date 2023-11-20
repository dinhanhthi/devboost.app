export default function LuBinary(props: { className?: string }) {
  return (
    <svg
      className={props.className}
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="14" y="14" width="4" height="6" rx="2"></rect>
      <rect x="6" y="4" width="4" height="6" rx="2"></rect>
      <path d="M6 20h4"></path>
      <path d="M14 10h4"></path>
      <path d="M6 14h2v6"></path>
      <path d="M14 4h2v6"></path>
    </svg>
  )
}
