import CleanIcon from '../icons/CleanIcon'
import Button from './Button'

type ClearButtonProps = {
  onClick: () => void
  disabled?: boolean
}

export default function ClearButton(props: ClearButtonProps) {
  return (
    <Button onClick={props.onClick} disabled={props.disabled}>
      <CleanIcon className="w-4 h-4 db-button-active" />
      Clear
    </Button>
  )
}
