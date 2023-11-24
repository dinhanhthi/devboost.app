import cn from 'classnames'
import Link from 'next/link'
import { cloneElement } from 'react'

import { Tool } from '../interface'

type ToolCardProps = {
  tool: Tool
  className?: string
}

export default function ToolCard(props: ToolCardProps) {
  const { tool, className } = props

  return (
    <Link
      href={`/tool/${tool.slug}`}
      className={cn(
        className,
        'flex transform flex-col items-center justify-center gap-4 p-4 text-center transition-all hover:scale-105 hover:dark:border-thighlight hover:border-sky-600 db-around-border rounded-lg group'
      )}
    >
      {cloneElement(tool.iconEl!, {
        className: 'text-2xl dark:text-thighlight text-sky-600 h-8 w-fit db-button-active'
      })}
      {tool.name}
    </Link>
  )
}

export function ToolCardSkeleton() {
  return (
    <div
      className={cn(`flex transform flex-col items-center justify-center gap-4 rounded-lg
        border-border bg-dark border p-4 animate-pulse h-[106px]`)}
    >
      <div className="w-8 h-8 rounded-full bg-light"></div>
      <div className="w-4/5 h-4 rounded-full bg-light"></div>
    </div>
  )
}
