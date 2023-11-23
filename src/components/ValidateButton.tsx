import AiOutlineLoading3Quarters from '../icons/AiOutlineLoading3Quarters'
import FiSearch from '../icons/FiSearch'
import Button from './Button'

type ValidateButtonProps = {
  onClick: () => void
  disabled?: boolean
  isValidating?: boolean
  star?: boolean
}

export default function ValidateButton(props: ValidateButtonProps) {
  return (
    <Button isPrimary={true} onClick={props.onClick} disabled={props.disabled}>
      {props.isValidating && (
        <div className="animate-spin">
          <AiOutlineLoading3Quarters className="h-3.5 w-3.5 db-button-active" />
        </div>
      )}
      {!props.isValidating && <FiSearch className="text-base" />}
      Validate{props.star && '*'}
    </Button>
  )
}
