import cn from 'classnames'

export default function ULIDIcon(props: { className?: string }) {
  return <div className={cn(props.className, 'db-icon-text')}>ULID</div>
}
