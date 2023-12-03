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
      <FaMagic className="w-4 h-4 mr-1.5" /> Generate
    </Button>
  )
}
