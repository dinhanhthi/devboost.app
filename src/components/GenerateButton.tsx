import FaMagic from '../icons/FaMagic'
import Button from './Button'

type GenerateButtonProps = {
  className?: string
  disabled?: boolean
  onClick: () => void
}

export default function GenerateButton(props: GenerateButtonProps) {
  return (
    <Button isPrimary={true} onClick={props.onClick} disabled={props.disabled}>
      <FaMagic className="h-3.5 w-3.5" /> Generate
    </Button>
  )
}
