import LoadingIcon from '../icons/LoadingIcon'
import MainContainer from './MainContainer'

export default function ToolBodySkeleton() {
  return (
    <MainContainer className="items-center justify-center h-full animate-pulse">
      <div className="animate-spin">
        <LoadingIcon className="w-12 h-12 dark:text-green-300 text-sky-600" />
      </div>
    </MainContainer>
  )
}
