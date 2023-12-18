import { useState } from 'react'

import CheckIcon from '../../icons/CheckIcon'
import CopyIcon from '../../icons/CopyIcon'
import { Button } from './Button'

type ButtonCopyProps = {
  text: string
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
    <Button
      className='w-[100px]'
      variant="outline"
      onClick={handleCopyClicked}
      disabled={!props.text || isCopied}
    >
      {isCopied && <CheckIcon className="w-3.5 h-3.5 mr-1.5" />}
      {!isCopied && <CopyIcon className="w-3.5 h-3.5 mr-1.5" />}
      {isCopied ? 'Copied' : 'Copy'}
    </Button>
  )
}
