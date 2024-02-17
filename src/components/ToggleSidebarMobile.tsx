'use client'

import { useState } from 'react'
import HideSidebarIcon from '../icons/HideSidebarIcon'
import SideNav from './SideNav'
import { Button } from './ui/Button'
import { Sheet, SheetContent, SheetTrigger } from './ui/Sheet'

type ToggleSidebarMobileProps = {
  className?: string
}

export default function ToggleSidebarMobile(props: ToggleSidebarMobileProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className={props.className}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <HideSidebarIcon className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent className="px-0 pb-1">
          <SideNav className="h-full" bottomSearch={true} setOpenSheet={setOpen} />
        </SheetContent>
      </Sheet>
    </div>
  )
}
