import SampleIcon from '../../icons/SampleIcon'
import { Button } from './Button'

type ButtonSampleProps = {
  onClick: () => void
  disabled?: boolean
}

export default function ButtonSample(props: ButtonSampleProps) {
  return (
    <Button variant="outline" onClick={props.onClick} disabled={props.disabled}>
      <SampleIcon className="w-4 h-4 mr-1.5" />
      Sample
    </Button>
  )
}