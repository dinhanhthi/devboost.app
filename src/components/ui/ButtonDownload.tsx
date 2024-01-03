import { DownloadIcon } from '@radix-ui/react-icons'
import SimpleTooltip from '../SimpleTooltip'
import { Button } from './Button'

type ButtonDownloadProps = {
  className?: string
  disabled?: boolean
  onClick: () => void
  showText?: boolean
}

export default function ButtonDownload(props: ButtonDownloadProps) {
  return (
    <SimpleTooltip text="Download your file" hidden={!!props.showText}>
      <Button variant="outline" onClick={props.onClick} disabled={props.disabled}>
        <DownloadIcon className="w-3.5 h-3.5" />
        {props.showText && <span className="ml-1.5">Download</span>}
      </Button>
    </SimpleTooltip>
  )
}
