'use client'

import { cloneElement, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import LoadingIcon from '../icons/LoadingIcon'
import { FooterLink } from '../interface'
import { FOOTER_LINKS } from '../lib/config'
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

export default function FooterLinksModals() {
  const [docContent, setDocContent] = useState<string | undefined>(undefined)

  const handleOpenDocClicked = async (link: FooterLink) => {
    if (!link.docFile) return
    await fetch(`/docs/page/${link.docFile}`)
      .then(res => res.text())
      .then(text => {
        setDocContent(text)
      })
  }

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      setDocContent(undefined)
    }
  }

  return (
    <div>
      {FOOTER_LINKS.map(link => (
        <Dialog key={link.docFile} onOpenChange={handleOnOpenChange}>
          <DialogTrigger asChild>
            <Button
              onClick={() => handleOpenDocClicked(link)}
              variant="ghost"
              className="px-2 font-normal group"
            >
              {cloneElement(link.icon!, { className: 'w-5 h-5 mr-1.5' })}
              <span className="text-sm">{link.name}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col max-h-[95%] h-full max-w-[90%] sm:max-w-xl lg:max-w-3xl xl:max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl text-primary">
                {cloneElement(link.icon!, { className: 'w-6 h-6' })}
                {link.name}
              </DialogTitle>
              {link.description && <DialogDescription>{link.description}</DialogDescription>}
            </DialogHeader>
            <div className="flex-1 min-h-0 pt-0 overflow-hidden">
              <div className="h-full overflow-auto db-prose db-scrollbar">
                {docContent && (
                  <ReactMarkdown components={MarkdownComponents}>{docContent}</ReactMarkdown>
                )}
                {!docContent && link.docFile && (
                  <div className="flex items-center justify-center w-full h-full">
                    <div className="animate-spin">
                      <LoadingIcon className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                )}
                {!link.docFile && (
                  <div className="flex items-center justify-center w-full h-full">
                    <p className="text-base text-white">This tool has no document.</p>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}
