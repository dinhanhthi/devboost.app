import CleanIcon from '../../icons/CleanIcon'
import SimpleTooltip from '../SimpleTooltip'
import { Button } from './Button'

type ButtonClearProps = {
  onClick: () => void
  disabled?: boolean
  showText?: boolean
}

export default function ButtonClear(props: ButtonClearProps) {
  return (
    <SimpleTooltip text="Clear all" hidden={!!props.showText}>
      <Button variant="outline" onClick={props.onClick} disabled={props.disabled}>
        <CleanIcon className="w-3.5 h-3.5" />
        {props.showText && <span className="ml-1.5">Clear</span>}
      </Button>
    </SimpleTooltip>
  )
}
