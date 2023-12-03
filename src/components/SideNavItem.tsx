'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { StarIcon } from '../icons/StarIcon'
import { StarOutlineIcon } from '../icons/StarOutlineIcon'
import { Tool } from '../interface'
import { cn } from '../lib/utils'
import { Button } from './ui/Button'

type SideNavItemProps = {
  className?: string
  tool: Tool
  uri?: string
  rightElement?: React.ReactNode
  hideFavorite?: boolean
}

export default function SideNavItem(props: SideNavItemProps) {
  const { className, tool, uri, rightElement } = props

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

  return (
    <Button variant="ghost" size="lg" asChild>
      <Link
        ref={areSameUris(uriToUse, pathname) ? ref : undefined}
        href={uriToUse}
        key={tool.slug}
        aria-selected={areSameUris(uriToUse, pathname)}
        className={cn(
          className,
          'relative group w-full aria-selected:bg-muted aria-selected:text-foreground aria-selected:font-medium !px-2 text-muted-foreground font-normal'
        )}
      >
        <div className="flex items-center w-full gap-2">
          {tool.iconEl}
          {tool.name}
          {rightElement}
        </div>

        {/* Favorite star */}
        {!props.hideFavorite && (
          <button
            className={cn(
              'absolute opacity-0 right-1 group-hover:opacity-100 w-5 h-5 bg-muted rounded-full flex items-center justify-center',
              {
                'opacity-100': tool.favorite
              }
            )}
          >
            {tool.favorite && <StarIcon className="w-4 h-4" />}
            {!tool.favorite && <StarOutlineIcon className="w-4 h-4" />}
          </button>
        )}
      </Link>
    </Button>
  )
}

const areSameUris = (uri: string, currentRoute: string) => {
  return uri === currentRoute || uri === currentRoute + '/'
}
