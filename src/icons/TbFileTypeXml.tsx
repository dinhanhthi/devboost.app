export default function TbFileTypeXml(props: { className?: string }) {
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
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
      <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4"></path>
      <path d="M4 15l4 6"></path>
      <path d="M4 21l4 -6"></path>
      <path d="M19 15v6h3"></path>
      <path d="M11 21v-6l2.5 3l2.5 -3v6"></path>
    </svg>
  )
}
