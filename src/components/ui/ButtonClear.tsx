import CleanIcon from '../../icons/CleanIcon'
import { Button } from './Button'

type ButtonClearProps = {
  onClick: () => void
  disabled?: boolean
}

export default function ButtonClear(props: ButtonClearProps) {
  return (
    <Button className='!bg-white' variant="outline" onClick={props.onClick} disabled={props.disabled}>
      <CleanIcon className="w-4 h-4 mr-1.5" />
      Clear
    </Button>
  )
}
