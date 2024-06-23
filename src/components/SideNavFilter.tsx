'use client'

import { CheckboxProps } from '@radix-ui/react-checkbox'
import { isEqual } from 'lodash'
import { useState } from 'react'
import CleanIcon from '../icons/CleanIcon'
import IoFilter from '../icons/IoFilter'
import { SideNavFilterSortBy, SideNavFilterType } from '../interface'
import { DEFAULT_C0NFIGS } from '../lib/config'
import { Button } from './ui/Button'
import { Checkbox } from './ui/Checkbox'
import { Popover, PopoverContent, PopoverTrigger } from './ui/Popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select'

type SideNavFilterProps = {
  filter: SideNavFilterType
  setFilter: (value: SideNavFilterType) => void
}

type CheckedState = CheckboxProps['checked']

export default function SideNavFilter(props: SideNavFilterProps) {
  const { filter, setFilter } = props
  const [openPopover, setOpenPopover] = useState(false)

  const handleShowOnlyFavoriteChange = (checked: CheckedState) => {
    setFilter({ ...filter, showOnlyFavorites: checked === true })
  }

  const handleShowDescriptionChange = (checked: CheckedState) => {
    setFilter({ ...filter, showDescription: checked === true })
  }

  const handleShowUnimplementedChange = (checked: CheckedState) => {
    setFilter({ ...filter, showUnimplemented: checked === true })
  }

  const sortByOptions: { value: SideNavFilterSortBy; name: string }[] = [
    { value: 'name', name: 'Name' },
    { value: 'favorite', name: 'Favorite' },
    { value: 'usageFrequency', name: 'Usage frequency' }
  ]

  const handleSortByChange = (value: SideNavFilterSortBy) => {
    setFilter({ ...filter, sortBy: value })
  }

  const sortDirectionOptions: { value: 'asc' | 'desc'; name: string }[] = [
    { value: 'asc', name: 'Ascending' },
    { value: 'desc', name: 'Descending' }
  ]

  const handleSortDirectionChange = (value: 'asc' | 'desc') => {
    setFilter({ ...filter, sortDirection: value })
  }

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <Button className="relative" variant="ghost" size="icon">
          <IoFilter className="w-4 h-4" />
          {!isEqual(filter, DEFAULT_C0NFIGS.sideNavFilter) && (
            <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-primary"></div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4" align="start">
        <div className="flex flex-col gap-4 text-sm">
          {/* Show only favorites */}
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={filter.showOnlyFavorites}
              id="show-only-favorites"
              onCheckedChange={handleShowOnlyFavoriteChange}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="show-only-favorites"
                className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show favorites only
              </label>
            </div>
          </div>
          {/* Show description */}
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={filter.showDescription}
              id="show-description"
              onCheckedChange={handleShowDescriptionChange}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="show-description"
                className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show descriptions
              </label>
            </div>
          </div>
          {/* Show unimplemented tools */}
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={filter.showUnimplemented}
              id="show-unimplemented"
              onCheckedChange={handleShowUnimplementedChange}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="show-unimplemented"
                className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show unimplemented tools
              </label>
            </div>
          </div>
          {/* Sort by */}
          <div className="flex items-center space-x-2">
            <div className="whitespace-nowrap">Sort tools by</div>
            <Select
              defaultValue={filter.sortBy}
              onValueChange={handleSortByChange}
              name="sort-by-selection"
            >
              <SelectTrigger className="h-7">
                <SelectValue placeholder="Select a sort type" />
              </SelectTrigger>
              <SelectContent>
                {sortByOptions.map(({ value, name }) => (
                  <SelectItem key={value} value={value}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Sort direction */}
          <div className="flex items-center space-x-2">
            <div className="whitespace-nowrap">Sort direction</div>
            <Select
              defaultValue={filter.sortDirection}
              onValueChange={handleSortDirectionChange}
              name="sort-by-selection"
            >
              <SelectTrigger className="h-7">
                <SelectValue placeholder="Select a direction" />
              </SelectTrigger>
              <SelectContent>
                {sortDirectionOptions.map(({ value, name }) => (
                  <SelectItem key={value} value={value}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Clear filters */}
        <div className="flex items-center gap-2 pt-2">
          <Button variant="outline" onClick={() => setFilter(DEFAULT_C0NFIGS.sideNavFilter)}>
            <CleanIcon className="w-4 h-4" />
            Reset filters
          </Button>
          <Button variant={'outline'} onClick={() => setOpenPopover(false)}>
            Cancel
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
