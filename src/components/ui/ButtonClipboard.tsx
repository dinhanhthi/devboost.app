import { ClipboardIcon } from '@radix-ui/react-icons'
import SimpleTooltip from '../SimpleTooltip'
import { Button } from './Button'

type ButtonClipboardProps = {
  handleClipText: (text: string) => void
  disabled?: boolean
  showText?: boolean
  dataTestId?: string
}

export default function ButtonClipboard(props: ButtonClipboardProps) {
  const handleClipboardClicked = () => {
    navigator.clipboard.readText().then(clipText => {
      props.handleClipText(clipText)
    })
  }

  return (
    <SimpleTooltip text="Paste your text" hidden={!!props.showText}>
      <Button
        data-testid={props.dataTestId || 'clipboard-button'}
        variant="outline"
        onClick={handleClipboardClicked}
        disabled={props.disabled}
      >
        <ClipboardIcon className="w-3.5 h-3.5" />
        {props.showText && <span className="ml-1.5">Clipboard</span>}
      </Button>
    </SimpleTooltip>
  )
}
