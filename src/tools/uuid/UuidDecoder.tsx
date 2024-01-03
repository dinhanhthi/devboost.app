import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { validate as uuidValidate } from 'uuid'

import ButtonClear from '../../components/ui/ButtonClear'
import ButtonClipboard from '../../components/ui/ButtonClipboard'
import ButtonDecode from '../../components/ui/ButtonDecode'
import ButtonSample from '../../components/ui/ButtonSample'
import { Input } from '../../components/ui/Input'

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

  const handleSampleClicked = () => {
    const sample = '123639f0-8522-11ee-9b23-0500b4b78763'
    setOriginalValue(sample)
    setResult('')
  }

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Buttons */}
      <div className="flex flex-row flex-wrap items-center gap-4">
        <ButtonDecode
          onClick={handleDecodeClicked}
          disabled={!originalValue}
          loading={isDecoding}
          star={true}
        />

        <div className="flex flex-row items-center gap-2">
          <ButtonClear onClick={handleClearClicked} disabled={!originalValue || isDecoding} />
          <ButtonClipboard handleClipText={handleClipText} disabled={isDecoding} />
          <ButtonSample onClick={handleSampleClicked} />
        </div>
      </div>

      {/* Original */}
      <div className="flex flex-row items-center gap-2 flex-2">
        <div className="text-sm">UUID</div>
        <Input
          data-testid="uuid-input"
          ref={originalRef}
          value={originalValue}
          onChange={handleOnChangeInput}
          type="text"
          placeholder={'123639f0-8522-11ee-9b23-0500b4b78763'}
          className={cn('flex-1 py-2')}
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
          className="underline underline-offset-4"
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
