'use client'

import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { StarIcon } from '../icons/StarIcon'
import { StarOutlineIcon } from '../icons/StarOutlineIcon'
import { Tool } from '../interface'

type SideNavItemProps = {
  className?: string
  tool: Tool
  uri?: string
  titleClassName?: string
  rightElement?: React.ReactNode
  hideFavorite?: boolean
}

export default function SideNavItem(props: SideNavItemProps) {
  const { className, tool, uri, titleClassName, rightElement } = props

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
    <Link
      ref={areSameUris(uriToUse, pathname) ? ref : undefined}
      href={uriToUse}
      key={tool.slug}
      aria-current={areSameUris(uriToUse, pathname) ? 'page' : undefined}
      className={cn(className, 'relative group flex w-full flex-row items-center')}
    >
      <div
        className={cn('py-1', {
          'opacity-100': areSameUris(uriToUse, pathname),
          'opacity-0': !areSameUris(uriToUse, pathname)
        })}
      >
        <div
          className={cn(
            '-ml-0.5 h-full w-1.5 rounded-lg border-r-4 dark:border-green-400 border-sky-600'
          )}
        ></div>
      </div>
      <div className="w-full pl-2 pr-2">
        <div
          className={cn(
            'flex w-full flex-row items-center gap-2 rounded-lg pl-1.5 py-2 pr-4 text-sm text-slate-700 dark:text-tnormal group-hover:dark:bg-darker group-hover:bg-gray-200 group-hover:dark:text-white',
            { 'dark:!text-thighlight !text-sky-600': areSameUris(uriToUse, pathname) }
          )}
        >
          <div className="flex items-center justify-center w-8 db-button-active">
            {tool.iconEl}
          </div>
          <div className={titleClassName}>{tool.name}</div>
          {rightElement}
        </div>
      </div>

      {/* Favorite star */}
      {!props.hideFavorite && (
        <button
          className={cn(
            'absolute p-1 bg-gray-100 rounded-full opacity-0 dark:bg-light right-4 group-hover:opacity-100 hover:text-amber-500 hover:dark:text-amber-300',
            { 'opacity-100': tool.favorite }
          )}
        >
          {tool.favorite && <StarIcon className="text-lg text-amber-500 dark:text-amber-300" />}
          {!tool.favorite && <StarOutlineIcon className="text-lg" />}
        </button>
      )}
    </Link>
  )
}

const areSameUris = (uri: string, currentRoute: string) => {
  return uri === currentRoute || uri === currentRoute + '/'
}
