import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'

import { validate as uuidValidate } from 'uuid'
import ButtonClear from '../../components/ui/ButtonClear'
import ButtonClipboard from '../../components/ui/ButtonClipboard'
import ButtonSample from '../../components/ui/ButtonSample'
import ButtonValidate from '../../components/ui/ButtonValidate'
import { Input } from '../../components/ui/Input'
import BsFillCheckCircleFill from '../../icons/BsFillCheckCircleFill'
import WarningIcon from '../../icons/WarningIcon'

export default function UuidValidator() {
  const originalRef = useRef<HTMLInputElement>(null)
  const [originalValue, setOriginalValue] = useState('')
  const [result, setResult] = useState<'valid' | 'invalid' | ''>('')

  const handleClipText = (text: string) => {
    setOriginalValue(text)
    setResult('')
  }

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResult('')
    setOriginalValue(event.target.value)
  }

  const handleClearClicked = () => {
    setOriginalValue('')
    setResult('')
    originalRef.current?.focus()
  }

  const handleValidateClicked = async () => {
    const isValid = uuidValidate(originalValue)
    setResult(isValid ? 'valid' : 'invalid')
  }

  const handleSampleClicked = () => {
    const sample = '123639f0-8522-11ee-9b23-0500b4b78763'
    setOriginalValue(sample)
    setResult('')
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Buttons */}
      <div className="flex flex-row flex-wrap items-center gap-6">
        <ButtonValidate onClick={handleValidateClicked} disabled={!originalValue} />
        <div className="flex flex-row items-center gap-3">
          <ButtonClipboard handleClipText={handleClipText} />
          <ButtonClear onClick={handleClearClicked} disabled={!originalValue} />
          <ButtonSample onClick={handleSampleClicked} />
        </div>
      </div>

      {/* UUID */}
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

      {/* Result */}
      {result && (
        <div className="p-4 border rounded-lg dark:border-border bg-slate-100">
          {result === 'valid' && (
            <div className="flex flex-row items-center gap-2 text-sm text-green-700 dark:text-green-300">
              <BsFillCheckCircleFill className="w-5 h-5" />
              UUID is valid!
            </div>
          )}
          {result === 'invalid' && (
            <div className="flex flex-row items-center gap-2 text-sm dark:text-amber-400 text-amber-600">
              <WarningIcon className="w-5 h-5" /> UUID is invalid!
            </div>
          )}
        </div>
      )}
    </div>
  )
}
