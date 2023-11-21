import { SampleIcon } from '../icons/SampleIcon'
import Button from './Button'

type SampleButtonProps = {
  onClick: () => void
  disabled?: boolean
}

export default function SampleButton(props: SampleButtonProps) {
  return (
    <Button onClick={props.onClick} disabled={props.disabled}>
      <SampleIcon className="w-4 h-4" />
      Sample
    </Button>
  )
}
