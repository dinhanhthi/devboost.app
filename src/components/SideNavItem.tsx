'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

import { StarIcon } from '../icons/StarIcon'
import { StarOutlineIcon } from '../icons/StarOutlineIcon'
import { SideNavFilterType, Tool } from '../interface'
import { useDateStatus } from '../lib/hooks/use-date-status'
import { cn } from '../lib/utils'
import { Button } from './ui/Button'

type SideNavItemProps = {
  className?: string
  tool: Tool
  favoriteToolSlugs: string[]
  setFavoriteToolSlugs: (value: string[]) => void
  uri?: string
  rightElement?: React.ReactNode
  hideFavorite?: boolean
  filter?: SideNavFilterType
  forceToShowDescription?: boolean
  setOpenSheet?: Dispatch<SetStateAction<boolean>>
}

export default function SideNavItem(props: SideNavItemProps) {
  const { className, tool, uri, rightElement, favoriteToolSlugs, setFavoriteToolSlugs } = props

  const dateStatus = useDateStatus(
    new Date(tool.releaseDate),
    tool.updatedDate ? new Date(tool.updatedDate) : undefined
  )

  const pathname = usePathname()
  const uriToUse = uri || `/tool/${tool.slug}`

  // Auto scroll to the current tool on first load
  const ref = useRef<null | HTMLAnchorElement>(null)
  const scrollToElement = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    scrollToElement()
  }, [pathname])

  const handleAddFavorite = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    if (props.favoriteToolSlugs && setFavoriteToolSlugs) {
      if (favoriteToolSlugs.includes(tool.slug)) {
        setFavoriteToolSlugs(favoriteToolSlugs.filter(slug => slug !== tool.slug))
      } else {
        setFavoriteToolSlugs([...favoriteToolSlugs, tool.slug])
      }
    }
  }

  return (
    <Button variant="ghost" size="lg" className="py-2 h-fit" asChild>
      <Link
        ref={areSameUris(uriToUse, pathname) ? ref : undefined}
        href={uriToUse}
        key={tool.slug}
        aria-selected={areSameUris(uriToUse, pathname)}
        onClick={() => props.setOpenSheet?.(false)}
        className={cn(
          className,
          'relative group w-full aria-selected:bg-muted aria-selected:opacity-100 aria-selected:font-medium !px-2 font-normal text-foreground opacity-95 hover:opacity-100'
        )}
      >
        <div className="flex items-center w-full gap-2">
          <div className="flex items-center w-6">{tool.iconEl}</div>
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex flex-row items-center gap-1">
              {tool.wip && (
                <span className="flex items-center px-1.5 py-0 text-[10px] h-4 rounded-sm bg-primary text-background">
                  WIP
                </span>
              )}
              {(dateStatus === 'new' || dateStatus === 'updated') && !tool.wip && (
                <span
                  className={cn('flex items-center px-1.5 py-0 text-[10px] h-4 rounded-sm', {
                    'bg-success text-background': dateStatus === 'updated',
                    'bg-warning text-primary-foreground': dateStatus === 'new'
                  })}
                >
                  {dateStatus === 'new' && 'new'}
                  {dateStatus === 'updated' && 'updated'}
                </span>
              )}
              <div className="font-medium" dangerouslySetInnerHTML={{ __html: tool.name }}></div>
            </div>
            {(props.filter?.showDescription || props.forceToShowDescription) && (
              <div
                dangerouslySetInnerHTML={{ __html: tool.description! }}
                className="w-full text-xs italic whitespace-break-spaces line-clamp-3 opacity-80"
              ></div>
            )}
          </div>
          <div>{rightElement}</div>
        </div>

        {/* Favorite star */}
        {!props.hideFavorite && (
          <button
            onClick={handleAddFavorite}
            className={cn(
              'absolute opacity-0 right-1 group-hover:opacity-100 w-5 h-5 bg-muted rounded-full flex items-center justify-center',
              {
                'opacity-100': favoriteToolSlugs.includes(tool.slug)
              }
            )}
          >
            {favoriteToolSlugs.includes(tool.slug) && <StarIcon className="w-4 h-4" />}
            {!favoriteToolSlugs.includes(tool.slug) && <StarOutlineIcon className="w-4 h-4" />}
          </button>
        )}
      </Link>
    </Button>
  )
}

const areSameUris = (uri: string, currentRoute: string) => {
  return uri === currentRoute || uri === currentRoute + '/'
}
