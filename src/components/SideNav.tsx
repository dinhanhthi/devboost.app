'use client'

import { cn } from '@/lib/utils'

import { useEffect, useState } from 'react'
import { Configs, SideNavFilterType, Tool } from '../interface'
import { CONFIG_KEYS, DEFAULT_C0NFIGS } from '../lib/config'
import useLocalStorage from '../lib/hooks/use-local-storage'
import { TOOLS, allToolItem } from '../tools/toolList'
import SideNavFilter from './SideNavFilter'
import SideNavItem from './SideNavItem'
import { Badge } from './ui/Badge'
import { Input } from './ui/Input'

type SideNavProps = {
  className?: string
}

export default function SideNav(props: SideNavProps) {
  const [favoriteToolSlugs, setFavoriteToolSlugs] = useLocalStorage<Configs['favoriteToolSlugs']>(
    CONFIG_KEYS.favoriteToolSlugs,
    DEFAULT_C0NFIGS.favoriteToolSlugs
  )
  const [filter, setFilter] = useLocalStorage<Configs['sideNavFilter']>(
    CONFIG_KEYS.sideNavFilter,
    DEFAULT_C0NFIGS.sideNavFilter
  )

  // Usage frequency
  const [usageFrequency, setUsageFrequency] = useState<Configs['usageFrequency']>(
    DEFAULT_C0NFIGS.usageFrequency
  )
  useEffect(() => {
    const newUsageFrequency = window.localStorage.getItem('usageFrequency')
    if (newUsageFrequency) setUsageFrequency(JSON.parse(newUsageFrequency))
  }, [])

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
            {sortTools(TOOLS, filter, favoriteToolSlugs, usageFrequency!)
              .filter(tool => mapFilterToTool(filter, tool, favoriteToolSlugs))
              .map(tool => (
                <SideNavItem
                  key={tool.slug}
                  tool={tool}
                  filter={filter}
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

function mapFilterToTool(filter: SideNavFilterType, tool: Tool, favoriteToolSlugs: string[]) {
  if (filter.showOnlyFavorites) {
    return favoriteToolSlugs.includes(tool.slug)
  }
  return true
}

function sortTools(
  tools: Tool[],
  filter: SideNavFilterType,
  favoriteToolSlugs: string[],
  usageFrequency: Configs['usageFrequency']
) {
  if (filter.sortBy === 'name') {
    if (filter.sortDirection === 'asc') {
      return tools.sort((a, b) => a.name.localeCompare(b.name))
    } else {
      return tools.sort((a, b) => b.name.localeCompare(a.name))
    }
  }
  if (filter.sortBy === 'favorite') {
    if (filter.sortDirection === 'asc') {
      return tools.sort((a, b) => {
        if (favoriteToolSlugs.includes(a.slug) && !favoriteToolSlugs.includes(b.slug)) {
          return -1
        }
        if (!favoriteToolSlugs.includes(a.slug) && favoriteToolSlugs.includes(b.slug)) {
          return 1
        }
        return 0
      })
    } else {
      return tools.sort((a, b) => {
        if (favoriteToolSlugs.includes(a.slug) && !favoriteToolSlugs.includes(b.slug)) {
          return 1
        }
        if (!favoriteToolSlugs.includes(a.slug) && favoriteToolSlugs.includes(b.slug)) {
          return -1
        }
        return 0
      })
    }
  }
  if (filter.sortBy === 'usageFrequency') {
    if (filter.sortDirection === 'asc') {
      return tools.sort((a, b) => {
        const aCount = +usageFrequency[a.slug] || 0
        const bCount = +usageFrequency[b.slug] || 0
        return aCount - bCount
      })
    } else {
      return tools.sort((a, b) => {
        const aCount = +usageFrequency[a.slug] || 0
        const bCount = +usageFrequency[b.slug] || 0
        return bCount - aCount
      })
    }
  }
  return tools
}
