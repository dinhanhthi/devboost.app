'use client'

import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { MarkdownComponents } from '../../../../components/MarkdownComponents'
import AiOutlineLoading3Quarters from '../../../../icons/AiOutlineLoading3Quarters'

type PageContentTemplateProps = {
  filePath: string
  className?: string
}

export default function PageContentTemplate(props: PageContentTemplateProps) {
  const [content, setContent] = useState<string | undefined>(undefined)
  useEffect(() => {
    const fetchContent = async () => {
      const data = await fetch(props.filePath).then(res => res.text())
      setContent(data)
    }
    fetchContent().catch(console.error)
  }, [])

  return (
    <div className={cn('flex flex-col gap-4 h-full px-4 py-2', props.className)}>
      {content && (
        <ReactMarkdown className="db-prose" components={MarkdownComponents}>
          {content}
        </ReactMarkdown>
      )}
      {!content && (
        <div className="flex items-center justify-center h-full animate-pulse">
          <div className="animate-spin">
            <AiOutlineLoading3Quarters className="w-12 h-12 text-primary" />
          </div>
        </div>
      )}
    </div>
  )
}
