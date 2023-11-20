import { SVGProps } from 'react'

export function ErrorCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12S5.925 1 12 1Zm-1 13h2V6.5h-2V14Zm2.004 1.5H11v2.004h2.004V15.5Z"
      ></path>
    </svg>
  )
}
