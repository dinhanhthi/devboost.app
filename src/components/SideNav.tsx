'use client'

import { cn } from '@/lib/utils'

import { Tool } from '../interface'
import useLocalStorage from '../lib/hooks/use-local-storage'
import { TOOLS, allToolItem } from '../tools/toolList'
import SideNavFilter from './SideNavFilter'
import SideNavItem from './SideNavItem'
import { Badge } from './ui/Badge'
import { Input } from './ui/Input'

export type SideNavFilter = {
  showOnlyFavorites: boolean
}

export const defaultFilter: SideNavFilter = {
  showOnlyFavorites: false
}

type SideNavProps = {
  className?: string
}

export default function SideNav(props: SideNavProps) {
  const [favoriteToolSlugs, setFavoriteToolSlugs] = useLocalStorage<string[]>(
    'favoriteToolSlugs',
    []
  )
  const [filter, setFilter] = useLocalStorage<SideNavFilter>('sideNavFilter', defaultFilter)

  return (
    <div className={cn(props.className, 'border-r')}>
      <div className={cn('flex h-full w-full flex-col')}>
        {/* Search */}
        <div className={cn('flex items-center gap-1 p-2.5 border-b')}>
          <Input id="search" type="search" placeholder={'type to search tools...'} />
          <SideNavFilter filter={filter} setFilter={setFilter} />
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
              favoriteToolSlugs={favoriteToolSlugs}
              setFavoriteToolSlugs={setFavoriteToolSlugs}
            />
          </div>

          {/* Tools */}
          <div className="flex flex-col flex-1 min-h-0 gap-1 p-2 overflow-auto db-scrollbar">
            {TOOLS.filter(tool => mapFilterToTool(filter, tool, favoriteToolSlugs)).map(tool => (
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

function mapFilterToTool(filter: SideNavFilter, tool: Tool, favoriteToolSlugs: string[]) {
  if (filter.showOnlyFavorites) {
    return favoriteToolSlugs.includes(tool.slug)
  }
  return true
}
