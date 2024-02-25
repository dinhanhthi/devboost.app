'use client'

import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'
import MainContainer from '../../components/MainContainer'
import ButtonClear from '../../components/ui/ButtonClear'
import ButtonClipboard from '../../components/ui/ButtonClipboard'
import ButtonSample from '../../components/ui/ButtonSample'
import ButtonValidate from '../../components/ui/ButtonValidate'
import { Input } from '../../components/ui/Input'
import BsFillCheckCircleFill from '../../icons/BsFillCheckCircleFill'
import WarningIcon from '../../icons/WarningIcon'

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
      // https://platform.openai.com/docs/api-reference/models/list
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

  const handleSampleClicked = () => {
    const sample = 'sk-dvREYJKERUIeXANAZfABC3BlbkFJs4FlBU4TYxgqkfH9UAV0'
    setApiKeyInputValue(sample)
    setResult('')
  }

  return (
    <MainContainer>
      <div className="flex flex-col flex-wrap flex-1 w-full min-h-0 gap-5">
        {/* Buttons */}
        <div className="flex flex-row flex-wrap items-center gap-4">
          <ButtonValidate
            loading={isChecking}
            onClick={handleValidateClicked}
            disabled={!apiKeyInputValue || isChecking}
          />
          <div className="flex flex-row items-center gap-2">
            <ButtonClipboard handleClipText={handleClipText} disabled={isChecking} />
            <ButtonClear onClick={handleClearClicked} disabled={!apiKeyInputValue} />
            <ButtonSample onClick={handleSampleClicked} disabled={isChecking} />
          </div>
        </div>

        {/* API key */}
        <div className="flex flex-row items-center gap-2 flex-2">
          <div className="w-16 text-sm">API Key</div>
          <Input
            data-testid="api-key-input"
            ref={apiKeyInputRef}
            value={apiKeyInputValue}
            onChange={handleOnChangeApiKeyInput}
            type="text"
            placeholder={'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'}
            className={cn('flex-1 py-2')}
          />
        </div>

        {/* Result */}
        {result && (
          <div className="p-4 border rounded-lg dark:border-border bg-muted">
            {result === 'valid' && (
              <div
                data-testid="valid"
                className="flex flex-row items-center gap-2 text-sm text-success"
              >
                <BsFillCheckCircleFill className="w-5 h-5" />
                The key is valid!
              </div>
            )}
            {result === 'invalid' && (
              <div
                data-testid="invalid"
                className="flex flex-row items-center gap-2 text-sm text-warning"
              >
                <WarningIcon className="w-5 h-5" /> The key is invalid!
              </div>
            )}
            {result === 'error' && (
              <div
                data-testid="error"
                className="flex flex-row items-center gap-2 text-sm text-danger"
              >
                ⚠️ There is an error when validaing your key!
              </div>
            )}
          </div>
        )}
      </div>
    </MainContainer>
  )
}
