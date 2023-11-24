'use client'

import cn from 'classnames'
import { usePathname } from 'next/navigation'

import { cloneElement, useState } from 'react'
import { kanit } from '../app/fonts'
import DocumentHelpIcon from '../icons/DocumentHelpIcon'
import { Tool } from '../interface'
import { PAGES } from '../libs/config'
import { TOOLS, allToolItem } from '../tools/toolList'
import SideOverDoc from './SideOverDoc'

type HeaderTitleProps = {
  className?: string
}

export default function HeaderTitle(props: HeaderTitleProps) {
  const [openSideDoc, setOpenSideDoc] = useState(false)
  const [uuidDoc, setUuidDoc] = useState<string | undefined>(undefined)
  const pathname = usePathname()
  const unknownTool: Tool = { name: '404', slug: '/' }
  const tool =
    pathname === '/'
      ? allToolItem
      : TOOLS.find(tool => tool.slug === pathname.split('/tool/')[1]?.replace(/^\/+|\/+$/g, '')) ||
        PAGES.find(page => page.slug === pathname.split('/page/')[1]?.replace(/^\/+|\/+$/g, '')) ||
        unknownTool

  const handleOpenSideOverClicked = async () => {
    setOpenSideDoc(true)
    if (!tool.docFile) return
    await fetch(`/docs/tools/${tool.docFile}`)
      .then(res => res.text())
      .then(text => {
        setUuidDoc(text)
      })
  }

  return (
    <>
      <SideOverDoc tool={tool} setOpen={setOpenSideDoc} open={openSideDoc} docContent={uuidDoc} />
      <div
        className={cn(props.className, 'flex min-w-0 flex-row gap-2 items-center justify-center')}
      >
        {/* Title */}
        <div className="">
          <h1
            className={cn(
              'mx-auto flex h-8 w-fit flex-row items-center justify-center gap-2 overflow-hidden !bg-sky-600 dark:!bg-dark db-around-border rounded-lg text-lg'
            )}
          >
            {!!tool.iconEl && (
              <div className={cn('flex h-full items-center justify-center p-2 dark:bg-darker bg-white')}>
                {cloneElement(tool.iconEl!, {
                  className: 'text-xl text-sky-600  dark:text-white'
                })}
              </div>
            )}
            <div
              className={cn(
                'flex items-center gap-2 px-3 tracking-widest dark:text-thighlight text-white',
                kanit.className
              )}
            >
              {tool.name}
            </div>
          </h1>
        </div>
        {(tool.docFile || tool.description) && (
          <button className="p-1.5 group db-button-hover" onClick={handleOpenSideOverClicked}>
            <DocumentHelpIcon className="text-2xl dark:text-tdark text-slate-500 group-hover:dark:text-white group-hover:text-slate-900 db-button-active shrink-0" />
          </button>
        )}
      </div>
    </>
  )
}
