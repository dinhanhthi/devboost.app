import { useState } from 'react'

import CheckIcon from '../../icons/CheckIcon'
import CopyIcon from '../../icons/CopyIcon'
import { cn } from '../../lib/utils'
import SimpleTooltip from '../SimpleTooltip'
import { Button } from './Button'

type ButtonCopyProps = {
  text: string
  showText?: boolean
}

export default function ButtonCopy(props: ButtonCopyProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyClicked = () => {
    navigator.clipboard.writeText(props.text)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  return (
    <SimpleTooltip text="Copy to clipboard" hidden={!!props.showText}>
      <Button
        className={cn({
          'w-[100px]': props.showText
        })}
        variant="outline"
        onClick={handleCopyClicked}
        disabled={!props.text || isCopied}
      >
        {isCopied && <CheckIcon className="w-3.5 h-3.5" />}
        {!isCopied && <CopyIcon className="w-3.5 h-3.5" />}
        {props.showText && <span className="ml-1.5">{isCopied ? 'Copied' : 'Copy'}</span>}
      </Button>
    </SimpleTooltip>
  )
}
