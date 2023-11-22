import cn from 'classnames'
import { useRef, useState } from 'react'

import ClearButton from '../../components/ClearButton'
import ClipboardButton from '../../components/ClipboardButton'
import ValidateButton from '../../components/ValidateButton'
import BsFillCheckCircleFill from '../../icons/BsFillCheckCircleFill'
import { WarningIcon } from '../../icons/WarningIcon'
import SampleButton from '../../components/SampleButton'

export default function UlidValidator() {
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
    const { isValid: ulidValidate } = await import('ulidx')
    const isValid = ulidValidate(originalValue)
    setResult(isValid ? 'valid' : 'invalid')
  }

  const handleSampleClicked = () => {
    const sample = '01HFE5Z3SZDQVR53EY0T54C9TS'
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

      {/* ULID */}
      <div className="flex flex-row items-center gap-2 flex-2">
        <div className="text-sm text-tnormal">ULID</div>
        <input
          data-testid="ulid-input"
          ref={originalRef}
          value={originalValue}
          onChange={handleOnChangeInput}
          type="text"
          placeholder={'01HFE5Z3SZDQVR53EY0T54C9TS'}
          className={cn('db-input flex-1 py-2')}
        />
      </div>

      {/* Result */}
      {result && (
        <div className="p-4 border rounded-lg border-border bg-darker">
          {result === 'valid' && (
            <div className="flex flex-row items-center gap-2 text-sm text-green-300">
              <BsFillCheckCircleFill className="w-5 h-5" />
              ULID is valid!
            </div>
          )}
          {result === 'invalid' && (
            <div className="flex flex-row items-center gap-2 text-sm text-amber-400">
              <WarningIcon className="w-5 h-5" /> ULID is invalid!
            </div>
          )}
        </div>
      )}
    </div>
  )
}
