'use client'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

import { kanit } from '../app/fonts'
import { Tool } from '../interface'
import { TOOLS, allToolItem } from '../tools/toolList'

type HeaderTitleProps = {
  className?: string
}

export default function HeaderTitle(props: HeaderTitleProps) {
  const pathname = usePathname()
  const unknownTool: Tool = { name: '404', slug: '/' }
  const tool =
    pathname === '/'
      ? allToolItem
      : TOOLS.find(tool => tool.slug === pathname.split('/tool/')[1]?.replace(/^\/+|\/+$/g, '')) ||
        unknownTool

  return (
    <>
      <div className={cn(props.className, 'flex gap-2 items-center justify-center')}>
        <div className="">
          <h1
            className={cn(
              'gap-2 overflow-hidden text-xl font-semibold text-primary',
              kanit.className
            )}
          >
            {tool.name}
          </h1>
        </div>
      </div>
    </>
  )
}
