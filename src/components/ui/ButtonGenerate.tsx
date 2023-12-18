import FaMagic from '../../icons/FaMagic'
import { Button } from './Button'

type ButtonGenerateProps = {
  className?: string
  disabled?: boolean
  onClick: () => void
}

export default function ButtonGenerate(props: ButtonGenerateProps) {
  return (
    <Button onClick={props.onClick} disabled={props.disabled}>
      <FaMagic className="w-3.5 h-3.5 mr-1.5" /> Generate
    </Button>
  )
}
