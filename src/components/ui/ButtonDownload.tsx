import SaveIcon from '../../icons/SaveIcon'
import { Button } from './Button'

type ButtonDownloadProps = {
  className?: string
  disabled?: boolean
  onClick: () => void
}

export default function ButtonDownload(props: ButtonDownloadProps) {
  return (
    <Button variant="outline" onClick={props.onClick} disabled={props.disabled}>
      <SaveIcon className="w-4 h-4 mr-1.5" />
      Download
    </Button>
  )
}
