import { cn } from '@/lib/utils'

export default function ULIDIcon(props: { className?: string }) {
  return <div className={cn(props.className, 'font-semibold')}>ULID</div>
}
