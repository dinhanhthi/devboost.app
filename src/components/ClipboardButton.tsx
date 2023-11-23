import ClipboardIcon from '../icons/ClipboardIcon'
import Button from './Button'

type ClipboardButtonProps = {
  handleClipText: (text: string) => void
  disabled?: boolean
}

export default function ClipboardButton(props: ClipboardButtonProps) {
  const handleClipboardClicked = () => {
    navigator.clipboard.readText().then(clipText => {
      props.handleClipText(clipText)
    })
  }

  return (
    <Button onClick={handleClipboardClicked} disabled={props.disabled}>
      <ClipboardIcon className="h-3.5 w-3.5" /> Clipboard
    </Button>
  )
}
