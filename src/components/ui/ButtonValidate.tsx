import LoadingIcon from '../../icons/LoadingIcon'
import FiSearch from '../../icons/FiSearch'
import { Button } from './Button'

type ButtonValidateProps = {
  onClick: () => void
  disabled?: boolean
  loading?: boolean
  star?: boolean
}

export default function ButtonValidate(props: ButtonValidateProps) {
  return (
    <Button onClick={props.onClick} disabled={props.disabled}>
      {props.loading && (
        <div className="animate-spin">
          <LoadingIcon className="w-4 h-4" />
        </div>
      )}
      {!props.loading && <FiSearch className="w-4 h-4" />}
      <span className="ml-1.5">Validate{props.star && '*'}</span>
    </Button>
  )
}
