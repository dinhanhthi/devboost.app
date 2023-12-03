import AiOutlineLoading3Quarters from '../../icons/AiOutlineLoading3Quarters'
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
          <AiOutlineLoading3Quarters className="w-4 h-4" />
        </div>
      )}
      {!props.loading && <FaMagic className="w-4 h-4" />}
      <span className="ml-1.5">Decode{props.star && '*'}</span>
    </Button>
  )
}
