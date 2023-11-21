import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import MainContainer from '../../../components/MainContainer'
import PageContent from '../../../components/PageContent'
import ToolBodySkeleton from '../../../components/ToolBodySkeleton'
import { DynamicSegmentParamsProps } from '../../../interface'
import { PAGES, SETTINGS } from '../../../libs/config'

export const revalidate = 20

export async function generateMetadata({ params }: DynamicSegmentParamsProps): Promise<Metadata> {
  const slug = params.slug || ''
  const tool = PAGES.find(page => page.slug === slug)

  const title = `${tool?.name} | ${SETTINGS.siteName}` || `Unknown page | ${SETTINGS.siteName}`

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    title,
    openGraph: {
      title,
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
  const params = PAGES.map(page => ({ slug: page.slug }))
  return params
}

export default async function SinglePage({ params }: DynamicSegmentParamsProps) {
  const slug = params.slug || ''
  if (!slug) notFound()

  try {
    const page = PAGES.find(page => page.slug === slug)
    if (!page) notFound()
    return (
      <Suspense fallback={<ToolBodySkeleton />}>
        <MainContainer className="h-full">
          <PageContent filePath={`/docs/page/${page.slug}.md`} />
        </MainContainer>
      </Suspense>
    )
  } catch (error) {
    console.log('🚨Error when loading a page!', error)
    notFound()
  }
}
