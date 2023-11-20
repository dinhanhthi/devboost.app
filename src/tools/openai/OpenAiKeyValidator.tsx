'use client'

import cn from 'classnames'
import { useRef, useState } from 'react'
import ClearButton from '../../components/ClearButton'
import ClipboardButton from '../../components/ClipboardButton'
import ValidateButton from '../../components/ValidateButton'
import BsFillCheckCircleFill from '../../icons/BsFillCheckCircleFill'
import { WarningIcon } from '../../icons/WarningIcon'

export default function OpenAiKeyValidator() {
  const apiKeyInputRef = useRef<HTMLInputElement>(null)
  const [apiKeyInputValue, setApiKeyInputValue] = useState('')
  const [result, setResult] = useState<'valid' | 'invalid' | 'error' | ''>('')
  const [isChecking, setIsChecking] = useState(false)

  const handleClipText = (text: string) => {
    setApiKeyInputValue(text)
    setResult('')
  }

  const handleOnChangeApiKeyInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResult('')
    setApiKeyInputValue(event.target.value)
  }

  const handleClearClicked = () => {
    setApiKeyInputValue('')
    setResult('')
    apiKeyInputRef.current?.focus()
  }

  const handleValidateClicked = async () => {
    setIsChecking(true)
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          Authorization: `Bearer ${apiKeyInputValue}`
        }
      })
      if (response.status === 200) {
        setResult('valid')
      } else {
        setResult('invalid')
      }
    } catch (error) {
      setResult('error')
    }
    setIsChecking(false)
  }

  return (
    <div
      className={cn(
        'h-full w-full overflow-hidden rounded-xl border border-border bg-dark p-4 flex flex-col gap-6'
      )}
    >
      <div className="flex flex-col flex-wrap flex-1 w-full min-h-0 gap-5">
        {/* Buttons */}
        <div className="flex flex-row flex-wrap items-center gap-6">
          <ValidateButton
            isValidating={isChecking}
            onClick={handleValidateClicked}
            disabled={!apiKeyInputValue || isChecking}
          />
          <div className="flex flex-row items-center gap-3">
            <ClipboardButton handleClipText={handleClipText} disabled={isChecking} />
            <ClearButton onClick={handleClearClicked} disabled={!apiKeyInputValue} />
          </div>
        </div>

        {/* API key */}
        <div className="flex flex-row items-center gap-2 flex-2">
          <div className="w-16 text-sm text-tnormal">API Key</div>
          <input
            data-testid="api-key-input"
            ref={apiKeyInputRef}
            value={apiKeyInputValue}
            onChange={handleOnChangeApiKeyInput}
            type="text"
            placeholder={'sk-1234567890AbcXyz'}
            className={cn('t4d-input flex-1 py-2')}
          />
        </div>

        {/* Result */}
        {result && (
          <div className="p-4 border rounded-lg border-border bg-darker">
            {result === 'valid' && (
              <div
                data-testid="valid"
                className="flex flex-row items-center gap-2 text-sm text-green-300"
              >
                <BsFillCheckCircleFill className="w-5 h-5" />
                The key is valid!
              </div>
            )}
            {result === 'invalid' && (
              <div
                data-testid="invalid"
                className="flex flex-row items-center gap-2 text-sm text-amber-400"
              >
                <WarningIcon className="w-5 h-5" /> The key is invalid!
              </div>
            )}
            {result === 'error' && (
              <div
                data-testid="error"
                className="flex flex-row items-center gap-2 text-sm text-red-400"
              >
                ⚠️ There is an error when validaing your key!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
