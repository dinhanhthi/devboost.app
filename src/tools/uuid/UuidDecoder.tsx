import cn from 'classnames'
import { useRef, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { validate as uuidValidate } from 'uuid'

import Button from '../../components/Button'
import ClearButton from '../../components/ClearButton'
import ClipboardButton from '../../components/ClipboardButton'
import AiOutlineLoading3Quarters from '../../icons/AiOutlineLoading3Quarters'
import FormatIcon from '../../icons/FormatIcon'

export default function UuidDecoder() {
  const originalRef = useRef<HTMLInputElement>(null)
  const [originalValue, setOriginalValue] = useState('')
  const [result, setResult] = useState('')
  const [isDecoding, setIsLoading] = useState(false)

  const handleClipText = (text: string) => {
    setOriginalValue(text)
  }

  const handleClearClicked = () => {
    setOriginalValue('')
    setResult('')
    originalRef.current?.focus()
  }

  const handleDecodeClicked = async () => {
    setIsLoading(true)
    const value = originalRef.current?.value
    if (!value) return

    if (!uuidValidate(value)) {
      setResult('Invalid UUID')
      setIsLoading(false)
      return
    }

    const decoded = await fetch(`https://www.uuidtools.com/api/decode/${value}`).then(res =>
      res.json()
    )
    setResult(JSON.stringify(decoded, null, 4))
    setIsLoading(false)
  }

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOriginalValue(event.target.value)
    setResult('')
  }

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Buttons */}
      <div className="flex flex-row flex-wrap items-center gap-6">
        <Button isPrimary={true} onClick={handleDecodeClicked} disabled={!originalValue}>
          {!isDecoding && <FormatIcon className="h-3.5 w-3.5" />}
          {isDecoding && (
            <div className="animate-spin">
              <AiOutlineLoading3Quarters className="h-3.5 w-3.5" />
            </div>
          )}
          Decode*
        </Button>
        <div className="flex flex-row items-center gap-3">
          <ClearButton onClick={handleClearClicked} disabled={!originalValue || isDecoding} />
          <ClipboardButton handleClipText={handleClipText} disabled={isDecoding} />
        </div>
      </div>

      {/* Original */}
      <div className="flex flex-row items-center gap-2 flex-2">
        <div className="text-sm text-tnormal">UUID</div>
        <input
          data-testid="uuid-input"
          ref={originalRef}
          value={originalValue}
          onChange={handleOnChangeInput}
          type="text"
          placeholder={'123639f0-8522-11ee-9b23-0500b4b78763'}
          className={cn('db-input flex-1 py-2')}
        />
      </div>

      {/* result */}
      <div className="flex-1 overflow-hidden text-sm rounded-lg min-h-5">
        {result && (
          <div data-testid="result">
            <SyntaxHighlighter className="p-4" language="json" style={dracula}>
              {result}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
      <div className={cn('pb-1.5 text-sm italic text-tdark')}>
        *We use{' '}
        <a
          className="underline underline-offset-4 hover:text-tlight"
          href="https://www.uuidtools.com/decode"
          target="_blank"
          rel="noopener noreferrer"
        >
          an external API
        </a>{' '}
        for this task.
      </div>
    </div>
  )
}
