'use client'

import { cn } from '@/lib/utils'

import Fuse, { FuseResult } from 'fuse.js'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { Configs, SideNavFilterType, Tool } from '../interface'
import { CONFIG_KEYS, DEFAULT_C0NFIGS } from '../lib/config'
import useLocalStorage from '../lib/hooks/use-local-storage'
import { allToolItem, TOOLS as originalTools } from '../tools/toolList'
import SideNavFilter from './SideNavFilter'
import SideNavItem from './SideNavItem'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { Input } from './ui/Input'

type SideNavProps = {
  className?: string
  bottomSearch?: boolean // when true, search input and filter will be at the bottom
  setOpenSheet?: Dispatch<SetStateAction<boolean>>
}

export default function SideNav(props: SideNavProps) {
  const [loading, setLoading] = useState(true)
  const [favoriteToolSlugs, setFavoriteToolSlugs] = useLocalStorage<Configs['favoriteToolSlugs']>(
    CONFIG_KEYS.favoriteToolSlugs,
    DEFAULT_C0NFIGS.favoriteToolSlugs
  )
  const [filter, setFilter] = useLocalStorage<Configs['sideNavFilter']>(
    CONFIG_KEYS.sideNavFilter,
    DEFAULT_C0NFIGS.sideNavFilter
  )

  const TOOLS = originalTools.filter(tool => filter.showUnimplemented || tool.implemented)

  // Usage frequency
  const [usageFrequency, setUsageFrequency] = useState<Configs['usageFrequency']>(
    DEFAULT_C0NFIGS.usageFrequency
  )
  useEffect(() => {
    const newUsageFrequency = window.localStorage.getItem('usageFrequency')
    if (newUsageFrequency) setUsageFrequency(JSON.parse(newUsageFrequency))
    setLoading(false)
  }, [])

  // Search
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchResult, setSearchResult] = useState<Tool[]>(TOOLS)
  const [query, setQuery] = useState('')
  // https://www.fusejs.io/api/options.html#findallmatches
  const fuseOptions = {
    includeScore: false,
    keys: ['name', 'description'],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.6 // 0.0 requires a perfect match, 1.0 would match anything
  }
  const fuse = new Fuse(TOOLS, fuseOptions)
  function handleOnchangeInput(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    setQuery(value)
    if (value.length) {
      const result = fuse.search(value)
      setSearchResult(highlight(result))
    } else {
      setSearchResult(TOOLS)
    }
  }
  const toolsToShow = query
    ? searchResult
    : sortTools(TOOLS, filter, favoriteToolSlugs, usageFrequency!).filter(tool =>
        mapFilterToTool(filter, tool, favoriteToolSlugs)
      )

  return (
    <div className={cn(props.className, 'sidebar')}>
      <div className={cn('flex h-full w-full flex-col')}>
        {/* Search */}
        {!props.bottomSearch && (
          <div className={cn('flex items-center gap-1 p-2.5 border-b')}>
            <Input
              ref={inputRef}
              autoComplete="off"
              id="search"
              type="search"
              placeholder={'type to search tools...'}
              value={query}
              onChange={e => handleOnchangeInput(e)}
              className='py-1.5 h-fit'
            />
            <SideNavFilter filter={filter} setFilter={setFilter} />
          </div>
        )}

        {/* Main */}
        <div className={cn('flex w-full flex-1 flex-col overflow-hidden')}>
          {/* All tools */}
          {!props.bottomSearch && (
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
          )}

          {/* Tools */}
          <div className="flex flex-col flex-1 min-h-0 gap-1 p-2 overflow-auto db-scrollbar">
            {!loading &&
              toolsToShow.map(tool => (
                <SideNavItem
                  key={tool.slug}
                  tool={tool}
                  filter={filter}
                  favoriteToolSlugs={favoriteToolSlugs}
                  setFavoriteToolSlugs={setFavoriteToolSlugs}
                  forceToShowDescription={!!query}
                  setOpenSheet={props.setOpenSheet}
                />
              ))}
            {loading &&
              Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center w-full h-10 gap-2 p-2 animate-pulse"
                >
                  <div className="w-6 h-6 rounded-full bg-border"></div>
                  <div className="flex-1 h-full min-w-0 rounded-md bg-border"></div>
                </div>
              ))}
            {query && !toolsToShow.length && (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="text-foreground">No results found.</div>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setQuery('')
                    inputRef.current?.focus()
                  }}
                >
                  Clear search
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Search (bottom) */}
        {props.bottomSearch && (
          <div>
            <div className="p-2 pb-0 border-t">
              <SideNavItem
                uri="/"
                tool={allToolItem}
                hideFavorite={true}
                rightElement={<Badge>{TOOLS.length}</Badge>}
                favoriteToolSlugs={favoriteToolSlugs}
                setFavoriteToolSlugs={setFavoriteToolSlugs}
              />
            </div>
            <div className={cn('flex items-center gap-1 p-2.5')}>
              <Input
                ref={inputRef}
                autoComplete="off"
                id="search"
                type="search"
                placeholder={'type to search tools...'}
                value={query}
                onChange={e => handleOnchangeInput(e)}
              />
              <SideNavFilter filter={filter} setFilter={setFilter} />
            </div>
          </div>
        )}
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

function highlight(result: FuseResult<Tool>[]): Tool[] {
  return result.map(item => {
    const { item: tool, matches } = item
    if (!matches) return tool
    const name = highlightMatches('name', tool.name, matches)
    const description = highlightMatches('description', tool.description!, matches)
    return { ...tool, name, description }
  })
}

const highlightMatches = (
  key: 'name' | 'description',
  value: string,
  matches: FuseResult<Tool>['matches']
): string => {
  if (!matches) return value
  const match = matches.find(match => match.key === key)
  if (!match) return value
  const { indices } = match
  if (!indices || !indices.length) return value
  let newValue = value
  let offset = 0
  indices.forEach(([start, end]) => {
    start += offset
    newValue = insertStringAt(newValue, start, '<span class="fuse-highlight">')
    offset += '<span class="fuse-highlight">'.length
    end += offset + 1
    newValue = insertStringAt(newValue, end, '</span>')
    offset += '</span>'.length
  })
  return newValue
}

function insertStringAt(str: string, index: number, insertString: string) {
  return str.slice(0, index) + insertString + str.slice(index)
}
