import { useState } from 'react'

import CheckIcon from '../icons/CheckIcon'
import CopyIcon from '../icons/CopyIcon'
import Button from './Button'

type CopyButtonProps = {
  text: string
}

export default function CopyButton(props: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyClicked = () => {
    navigator.clipboard.writeText(props.text)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  return (
    <Button className="w-[92px]" onClick={handleCopyClicked} disabled={!props.text || isCopied}>
      {isCopied && <CheckIcon className="h-3.5 w-3.5 shrink-0" />}
      {!isCopied && <CopyIcon className="h-3.5 w-3.5 shrink-0 db-button-active" />}
      {isCopied ? 'Copied' : 'Copy'}
    </Button>
  )
}
