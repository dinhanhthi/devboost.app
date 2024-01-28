import LoadingIcon from '../icons/LoadingIcon'
import MainContainer from './MainContainer'

export default function ToolBodySkeleton() {
  return (
    <MainContainer className="items-center justify-center h-full animate-pulse">
      <div className="animate-spin">
        <LoadingIcon className="w-8 h-8 text-primary" />
      </div>
    </MainContainer>
  )
}
