'use client'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { kanit } from '../app/fonts'
import AiOutlineLoading3Quarters from '../icons/AiOutlineLoading3Quarters'
import DocDuoToneIcon from '../icons/DocDuaToneIcon'
import DocumentHelpIcon from '../icons/DocumentHelpIcon'
import { Tool } from '../interface'
import { PAGES } from '../lib/config'
import { TOOLS, allToolItem } from '../tools/toolList'
import { MarkdownComponents } from './MarkdownComponents'
import { Button } from './ui/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/Dialog'

type HeaderTitleProps = {
  className?: string
}

export default function HeaderTitle(props: HeaderTitleProps) {
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
    if (!tool.docFile) return
    await fetch(`/docs/tools/${tool.docFile}`)
      .then(res => res.text())
      .then(text => {
        setUuidDoc(text)
      })
  }

  return (
    <>
      <div className={cn(props.className, 'flex gap-2 items-center justify-center')}>
        {/* Title */}
        <div className="">
          <h1 className={cn('gap-2 overflow-hidden text-xl font-semibold text-foreground', kanit.className)}>
            {tool.name}
          </h1>
        </div>
        {/* Tool Doc */}
        {(tool.docFile || tool.description) && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={handleOpenSideOverClicked}
                variant="ghost"
                size="icon"
                className="group"
              >
                <DocumentHelpIcon className="w-5 h-5 opacity-70 group-hover:opacity-100" />
              </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col max-h-[95%] h-full max-w-[90%] sm:max-w-xl lg:max-w-3xl xl:max-w-4xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl text-primary">
                  <DocDuoToneIcon className="w-6 h-6" />
                  {tool.name}
                </DialogTitle>
                {tool.description && <DialogDescription>{tool.description}</DialogDescription>}
              </DialogHeader>
              <div className="flex-1 min-h-0 pt-0 overflow-hidden">
                <div className="h-full overflow-auto db-prose db-scrollbar">
                  {uuidDoc && (
                    <ReactMarkdown components={MarkdownComponents}>{uuidDoc}</ReactMarkdown>
                  )}
                  {!uuidDoc && tool.docFile && (
                    <div className="flex items-center justify-center w-full h-full">
                      <div className="animate-spin">
                        <AiOutlineLoading3Quarters className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                  )}
                  {!tool.docFile && (
                    <div className="flex items-center justify-center w-full h-full">
                      <p className="text-base text-white">This tool has no document.</p>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  )
}
