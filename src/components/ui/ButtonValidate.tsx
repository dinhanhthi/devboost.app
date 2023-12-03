import AiOutlineLoading3Quarters from '../../icons/AiOutlineLoading3Quarters'
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
          <AiOutlineLoading3Quarters className="w-4 h-4 mr-1.5" />
        </div>
      )}
      {!props.loading && <FiSearch className="w-4 h-4 mr-1.5" />}
      Validate{props.star && '*'}
    </Button>
  )
}
