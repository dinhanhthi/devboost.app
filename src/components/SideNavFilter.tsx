'use client'

import { CheckedState } from '@radix-ui/react-checkbox'
import { isEqual } from 'lodash'
import CleanIcon from '../icons/CleanIcon'
import IoFilter from '../icons/IoFilter'
import { SideNavFilterType } from '../interface'
import { DEFAULT_C0NFIGS } from '../lib/config'
import { Button } from './ui/Button'
import { Checkbox } from './ui/Checkbox'
import { Popover, PopoverContent, PopoverTrigger } from './ui/Popover'

type SideNavFilterProps = {
  filter: SideNavFilterType
  setFilter: (value: SideNavFilterType) => void
}

export default function SideNavFilter(props: SideNavFilterProps) {
  const { filter, setFilter } = props

  const handleShowOnlyFavoriteChange = (checked: CheckedState) => {
    setFilter({ ...filter, showOnlyFavorites: checked === true })
  }

  const handleShowDescriptionChange = (checked: CheckedState) => {
    setFilter({ ...filter, showDescription: checked === true })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="relative" variant="ghost" size="icon">
          <IoFilter className="w-4 h-4" />
          {!isEqual(filter, DEFAULT_C0NFIGS.sideNavFilter) && (
            <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-primary"></div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4 divide-y" align="start">
        <div className="flex flex-col gap-4">
          {/* Show only favorites */}
          <div className="flex space-x-2 items-top">
            <Checkbox
              checked={filter.showOnlyFavorites}
              id="show-only-favorites"
              onCheckedChange={handleShowOnlyFavoriteChange}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="show-only-favorites"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show favorites only
              </label>
            </div>
          </div>
          {/* Show description */}
          <div className="flex space-x-2 items-top">
            <Checkbox
              checked={filter.showDescription}
              id="show-description"
              onCheckedChange={handleShowDescriptionChange}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="show-description"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show descriptions
              </label>
            </div>
          </div>
        </div>
        {/* Clear filters */}
        <div className="pt-2 -mb-1">
          <button
            className="flex items-center gap-1.5 text-sm hover:bg-accent hover:text-accent-foreground px-3 py-1 rounded-sm"
            onClick={() => setFilter(DEFAULT_C0NFIGS.sideNavFilter)}
          >
            <CleanIcon className="w-4 h-4" />
            Clear filters
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
