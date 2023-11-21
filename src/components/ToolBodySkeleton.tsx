import AiOutlineLoading3Quarters from '../icons/AiOutlineLoading3Quarters'
import MainContainer from './MainContainer'

export default function ToolBodySkeleton() {
  return (
    <MainContainer className="items-center justify-center h-full animate-pulse">
      <div className="animate-spin">
        <AiOutlineLoading3Quarters className="w-12 h-12 text-green-300" />
      </div>
    </MainContainer>
  )
}
