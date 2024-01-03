import { UploadIcon } from '@radix-ui/react-icons'
import SimpleTooltip from '../SimpleTooltip'
import { Button } from './Button'

type ButtonUploadProps = {
  className?: string
  disabled?: boolean
  showText?: boolean
  onClick: () => void
}

export default function ButtonUpload(props: ButtonUploadProps) {
  return (
    <SimpleTooltip text="Upload your file" hidden={!!props.showText}>
      <Button variant="outline" onClick={props.onClick} disabled={props.disabled}>
        <UploadIcon className="w-3.5 h-3.5" />
        {props.showText && <span className='ml-1.5'>Upload</span>}
      </Button>
    </SimpleTooltip>
  )
}
