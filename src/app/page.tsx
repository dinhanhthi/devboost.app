import { Suspense } from 'react'
import ToolListTemplate from '../components/ToolListTemplate'
import { ToolBodySkeleton } from './tool/[slug]/page'

export default function Home() {
  return (
    <Suspense fallback={<ToolBodySkeleton />}>
      <ToolListTemplate />
    </Suspense>
  )
}
