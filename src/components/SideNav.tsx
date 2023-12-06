'use client'

import { cn } from '@/lib/utils'

import { useState } from 'react'
import { TOOLS, allToolItem } from '../tools/toolList'
import SideNavFilter from './SideNavFilter'
import SideNavItem from './SideNavItem'
import { Badge } from './ui/Badge'
import { Input } from './ui/Input'

type SideNavProps = {
  className?: string
}

export default function SideNav(props: SideNavProps) {
  const [favoriteToolSlugs, setFavoriteToolSlugs] = useState<string[]>(
    TOOLS.filter(tool => tool.favorite).map(tool => tool.slug)
  )

  return (
    <div className={cn(props.className, 'border-r')}>
      <div className={cn('flex h-full w-full flex-col')}>
        {/* Search */}
        <div className={cn('flex items-center gap-1 p-2.5 border-b')}>
          <Input id="search" type="search" placeholder={'type to search tools...'} />
          <SideNavFilter />
        </div>

        {/* Main */}
        <div className={cn('flex w-full flex-1 flex-col overflow-hidden')}>
          {/* All tools */}
          <div className="p-2 border-b">
            <SideNavItem
              uri="/"
              tool={allToolItem}
              hideFavorite={true}
              rightElement={<Badge>{TOOLS.length}</Badge>}
            />
          </div>

          {/* Tools */}
          <div className="flex flex-col flex-1 min-h-0 gap-1 p-2 overflow-auto db-scrollbar">
            {TOOLS.map(tool => (
              <SideNavItem
                key={tool.slug}
                tool={tool}
                favoriteToolSlugs={favoriteToolSlugs}
                setFavoriteToolSlugs={setFavoriteToolSlugs}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
