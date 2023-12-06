'use client'

import IoFilter from '../icons/IoFilter'
import { Button } from './ui/Button'
import { Checkbox } from './ui/Checkbox'
import { Popover, PopoverContent, PopoverTrigger } from './ui/Popover'

export default function SideNavFilter() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <IoFilter className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <div className="flex space-x-2 items-top">
          <Checkbox id="terms1" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show favorites only
            </label>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
