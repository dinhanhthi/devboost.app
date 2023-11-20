import cn from 'classnames'

type ButtonProps = {
  isPrimary?: boolean
  className?: string
  onClick: () => void
  disabled?: boolean
  children?: React.ReactNode
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className={cn(props.className, 'flex items-center justify-center gap-1.5 t4d-button', {
        _main: props.isPrimary
      })}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}
