import { Suspense } from 'react'
import ToolBodySkeleton from '../components/ToolBodySkeleton'
import ToolListTemplate from '../components/ToolListTemplate'

export default function Home() {
  return (
    <Suspense fallback={<ToolBodySkeleton />}>
      <ToolListTemplate />
    </Suspense>
  )
}
