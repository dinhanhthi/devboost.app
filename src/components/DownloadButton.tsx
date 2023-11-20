import SaveIcon from '../icons/SaveIcon'
import Button from './Button'

type DownloadButtonProps = {
  className?: string
  disabled?: boolean
  onClick: () => void
}

export default function DownloadButton(props: DownloadButtonProps) {
  return (
    <Button onClick={props.onClick} disabled={props.disabled}>
      <SaveIcon className="w-4 h-4" />
      Download
    </Button>
  )
}
