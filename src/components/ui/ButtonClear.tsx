import CleanIcon from '../../icons/CleanIcon'
import { Button } from './Button'

type ButtonClearProps = {
  onClick: () => void
  disabled?: boolean
}

export default function ButtonClear(props: ButtonClearProps) {
  return (
    <Button variant="outline" onClick={props.onClick} disabled={props.disabled}>
      <CleanIcon className="w-3.5 h-3.5 mr-1.5" />
      Clear
    </Button>
  )
}
