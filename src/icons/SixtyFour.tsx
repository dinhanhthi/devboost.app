import cn from 'classnames'

export default function SixtyFour(props: { className?: string }) {
  return (
    <div className={cn(props.className, 'w-fit rounded-md bg-slate-500 p-1 leading-none')}>64</div>
  )
}
