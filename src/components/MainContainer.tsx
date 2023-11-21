import cn from 'classnames'

type MainContainerProps = {
  children: React.ReactNode
  className?: string
}
export default function MainContainer(props: MainContainerProps) {
  return (
    <div
      className={cn(
        props.className,
        'min-h-0 flex-1 w-full overflow-hidden rounded-xl border border-border bg-dark p-4 flex flex-col gap-6'
      )}
    >
      {props.children}
    </div>
  )
}
