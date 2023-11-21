import { Suspense } from 'react'
import MainContainer from '../../components/MainContainer'
import PageContent from '../../components/PageContent'
import ToolBodySkeleton from '../../components/ToolBodySkeleton'

export default async function HowToContributePage() {
  return (
    <Suspense fallback={<ToolBodySkeleton />}>
      <MainContainer className="h-full">
        <PageContent filePath={'docs/page/how-to-contribute.md'} />
      </MainContainer>
    </Suspense>
  )
}
