'use client'

import HideSidebarIcon from '../icons/HideSidebarIcon'
import SimpleTooltip from './SimpleTooltip'
import { Button } from './ui/Button'

export default function ToggleSidebar() {
  const handleHideSidenavClicked = () => {
    document.querySelector('.sidebar')?.classList.toggle('!hidden')
  }
  return (
    <SimpleTooltip text="Toggle sidebar">
      <Button onClick={handleHideSidenavClicked} variant="ghost" size="icon">
        <HideSidebarIcon className="w-5 h-5" />
      </Button>
    </SimpleTooltip>
  )
}
