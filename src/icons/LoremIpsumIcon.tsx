import cn from 'classnames'

export default function LoremIpsumIcon(props: { className?: string }) {
  return (
    <div className={cn(props.className, 'rounded-md bg-slate-500 p-1 font-semibold leading-none')}>
      Li
    </div>
  )
}
