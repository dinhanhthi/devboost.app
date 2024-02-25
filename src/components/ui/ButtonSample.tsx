import SampleIcon from '../../icons/SampleIcon'
import SimpleTooltip from '../SimpleTooltip'
import { Button } from './Button'

type ButtonSampleProps = {
  onClick: () => void
  disabled?: boolean
  showText?: boolean
  dataTestId?: string
}

export default function ButtonSample(props: ButtonSampleProps) {
  return (
    <SimpleTooltip text="An example" hidden={!!props.showText}>
      <Button
        data-testid={props.dataTestId || 'sample-button'}
        data-id
        variant="outline"
        onClick={props.onClick}
        disabled={props.disabled}
      >
        <SampleIcon className="w-3.5 h-3.5" />
        {props.showText && <span className="ml-1.5">Sample</span>}
      </Button>
    </SimpleTooltip>
  )
}
