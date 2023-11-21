import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Suspense } from 'react'
import ToolBodySkeleton from '../../../components/ToolBodySkeleton'
import ToolPageTemplate from '../../../components/ToolPageTemplate'
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
