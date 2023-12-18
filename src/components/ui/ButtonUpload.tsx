import { UploadIcon } from '@radix-ui/react-icons'
import { Button } from './Button'

type ButtonUploadProps = {
  className?: string
  disabled?: boolean
  onClick: () => void
}

export default function ButtonUpload(props: ButtonUploadProps) {
  return (
    <Button variant="outline" onClick={props.onClick} disabled={props.disabled}>
      <UploadIcon className="w-3.5 h-3.5 mr-1.5" />
      Upload
    </Button>
  )
}
