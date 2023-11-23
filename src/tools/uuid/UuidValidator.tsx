import cn from 'classnames'
import { useRef, useState } from 'react'

import { validate as uuidValidate } from 'uuid'
import ClearButton from '../../components/ClearButton'
import ClipboardButton from '../../components/ClipboardButton'
import SampleButton from '../../components/SampleButton'
import ValidateButton from '../../components/ValidateButton'
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
        <ValidateButton onClick={handleValidateClicked} disabled={!originalValue} />
        <div className="flex flex-row items-center gap-3">
          <ClipboardButton handleClipText={handleClipText} />
          <ClearButton onClick={handleClearClicked} disabled={!originalValue} />
          <SampleButton onClick={handleSampleClicked} />
        </div>
      </div>

      {/* UUID */}
      <div className="flex flex-row items-center gap-2 flex-2">
        <div className="text-sm">UUID</div>
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

      {/* Result */}
      {result && (
        <div className="p-4 border rounded-lg dark:border-border dark:bg-darker bg-slate-100">
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
