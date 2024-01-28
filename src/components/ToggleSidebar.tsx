'use client'

import HideSidebarIcon from '../icons/HideSidebarIcon'
import SimpleTooltip from './SimpleTooltip'
import { Button } from './ui/Button'

type ToggleSidebarProps = {
  className?: string
}

export default function ToggleSidebar(props: ToggleSidebarProps) {
  const handleHideSidenavClicked = () => {
    document.querySelector('.sidebar')?.classList.toggle('!hidden')
  }
  return (
    <div className={props.className}>
      <SimpleTooltip text="Toggle sidebar">
        <Button onClick={handleHideSidenavClicked} variant="ghost" size="icon">
          <HideSidebarIcon className="w-5 h-5" />
        </Button>
      </SimpleTooltip>
    </div>
  )
}
