import LoadingIcon from '../../icons/LoadingIcon'
import FaMagic from '../../icons/FaMagic'
import { Button } from './Button'

type ButtonDecodeProps = {
  className?: string
  disabled?: boolean
  loading?: boolean
  star?: boolean
  onClick: () => void
}

export default function ButtonDecode(props: ButtonDecodeProps) {
  return (
    <Button onClick={props.onClick} disabled={props.disabled}>
      {props.loading && (
        <div className="animate-spin">
          <LoadingIcon className="w-3.5 h-3.5" />
        </div>
      )}
      {!props.loading && <FaMagic className="w-3.5 h-3.5" />}
      <span className="ml-1.5">Decode{props.star && '*'}</span>
    </Button>
  )
}
