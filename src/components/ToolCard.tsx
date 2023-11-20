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
        `flex transform flex-col items-center justify-center gap-4 rounded-lg border
        border-border bg-dark p-4 text-center text-tnormal
        transition-all hover:scale-105 hover:border-thighlight`
      )}
    >
      {cloneElement(tool.iconEl!, { className: 'text-2xl text-thighlight h-8 w-fit' })}
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
