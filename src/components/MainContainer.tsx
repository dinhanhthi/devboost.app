import { cn } from '@/lib/utils'

type MainContainerProps = {
  children: React.ReactNode
  className?: string
}
export default function MainContainer(props: MainContainerProps) {
  return (
    <div
      className={cn(
        props.className,
        'min-h-0 flex-1 w-full overflow-auto db-scrollbar flex flex-col gap-6'
      )}
    >
      {props.children}
    </div>
  )
}
