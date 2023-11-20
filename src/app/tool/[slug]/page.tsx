import cn from 'classnames'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Suspense } from 'react'
import ToolPageTemplate from '../../../components/ToolPageTemplate'
import AiOutlineLoading3Quarters from '../../../icons/AiOutlineLoading3Quarters'
import { DynamicSegmentParamsProps } from '../../../interface'
import { SETTINGS } from '../../../libs/config'
import { TOOLS } from '../../../tools/toolList'

export const revalidate = 20

export async function generateMetadata({ params }: DynamicSegmentParamsProps): Promise<Metadata> {
  const slug = params.slug || ''
  const tool = TOOLS.find(tool => tool.slug === slug)

  const title = `${tool?.name} | ${SETTINGS.siteName}` || `Unknown tool | ${SETTINGS.siteName}`
  const description = tool?.description || 'A tool for developers'

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: [
        // ###TODO: Customize image for each tool
        {
          url: 'https://i.imgur.com/PyXUtfTh.png',
          width: 1024,
          height: 581
        }
      ]
    }
  }
}

export async function generateStaticParams() {
  const params = TOOLS.map(post => ({ slug: post.slug }))
  return params
}

export default async function ToolPage({ params }: DynamicSegmentParamsProps) {
  const slug = params.slug || ''
  if (!slug) notFound()

  try {
    const tool = TOOLS.find(tool => tool.slug === slug)
    if (!tool) notFound()
    return (
      <Suspense fallback={<ToolBodySkeleton />}>
        <ToolPageTemplate tool={tool} />
      </Suspense>
    )
  } catch (error) {
    console.log('🚨Error when loading a single note page', error)
    notFound()
  }
}

export function ToolBodySkeleton() {
  return (
    <div
      className={cn(
        'h-full w-full rounded-xl border border-border bg-dark p-4 flex items-center justify-center animate-pulse'
      )}
    >
      <div className="animate-spin">
        <AiOutlineLoading3Quarters className="w-12 h-12 text-green-300" />
      </div>
    </div>
  )
}
