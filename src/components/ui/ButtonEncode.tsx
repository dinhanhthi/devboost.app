import EncryptIcon from '../../icons/EncryptIcon'
import LoadingIcon from '../../icons/LoadingIcon'
import { Button } from './Button'

type ButtonEncodeProps = {
  className?: string
  disabled?: boolean
  loading?: boolean
  star?: boolean
  onClick: () => void
}

export default function ButtonEncode(props: ButtonEncodeProps) {
  return (
    <Button onClick={props.onClick} disabled={props.disabled}>
      {props.loading && (
        <div className="animate-spin">
          <LoadingIcon className="w-4 h-4" />
        </div>
      )}
      {!props.loading && <EncryptIcon className="w-4 h-4" />}
      <span className="ml-1.5">Encode{props.star && '*'}</span>
    </Button>
  )
}
