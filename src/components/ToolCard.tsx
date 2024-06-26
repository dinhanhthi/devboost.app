'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { cloneElement } from 'react'

import { Tool } from '../interface'
import { useDateRangeStatus, useDateStatus } from '../lib/hooks/use-date-status'

type ToolCardProps = {
  tool: Tool
  className?: string
}

export default function ToolCard(props: ToolCardProps) {
  const { tool, className } = props

  const dateStatus = useDateStatus(
    new Date(tool.releaseDate),
    tool.updatedDate ? new Date(tool.updatedDate) : undefined
  )

  const dateRangeStatus = useDateRangeStatus(
    tool.updatedDate ? new Date(tool.updatedDate) : new Date(tool.releaseDate)
  )

  const classNames = cn(
    className,
    'h-full flex transform flex-col items-center justify-center gap-4 p-4 text-center transition-all hover:scale-105 hover:dark:border-thighlight border hover:border-primary rounded-lg group bg-accent relative overflow-hidden'
  )

  return (
    <div className={cn({ 'opacity-50 hover:opacity-100': !tool.implemented })}>
      {tool.implemented && (
        <Link href={`/tool/${tool.slug}`} className={classNames}>
          {cloneElement(tool.iconEl!, {
            className: 'text-xl dark:text-thighlight text-primary h-6 w-fit'
          })}
          <span className="text-base">{tool.name}</span>
          {tool.wip && (
            <div className="absolute top-0 right-0 py-0.5 px-1.5 text-[10px] bg-primary text-accent">
              WIP
            </div>
          )}
          {(dateStatus === 'new' || dateStatus === 'updated') && !tool.wip && (
            <div
              className={cn('absolute top-0 right-0 py-0.5 px-1.5 text-[10px]', {
                'bg-success text-background': dateStatus === 'updated',
                'bg-warning text-primary-foreground': dateStatus === 'new'
              })}
            >
              {dateStatus === 'new' && 'new'}
              {dateStatus === 'updated' && 'updated'} {dateRangeStatus}
            </div>
          )}
        </Link>
      )}
      {!tool.implemented && (
        <div className={classNames}>
          {cloneElement(tool.iconEl!, {
            className: 'text-xl dark:text-thighlight text-primary h-6 w-fit'
          })}
          <span className="text-base">{tool.name}</span>
          <div className="absolute top-0 right-0 py-0.5 px-1.5 text-[10px] bg-foreground text-accent">
            not ready
          </div>
        </div>
      )}
    </div>
  )
}

export function ToolCardSkeleton() {
  return (
    <div
      className={cn(
        `flex transform flex-col items-center justify-center gap-4 rounded-lg border-border bg-dark border p-4 animate-pulse h-[106px]`
      )}
    >
      <div className="w-6 h-6 rounded-full"></div>
      <div className="w-4/5 h-3 rounded-full"></div>
    </div>
  )
}
