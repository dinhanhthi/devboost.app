import cn from 'classnames'
import { useRef, useState } from 'react'
import { validate as uuidValidate } from 'uuid'

import ClearButton from '../../components/ClearButton'
import ClipboardButton from '../../components/ClipboardButton'
import CopyButton from '../../components/CopyButton'
import FormatIcon from '../../icons/FormatIcon'
import SampleButton from '../../components/SampleButton'

export default function UuidFormater() {
  const originalRef = useRef<HTMLInputElement>(null)
  const targetRef = useRef<HTMLInputElement>(null)
  const [originalValue, setOriginalValue] = useState('')
  const [targetValue, setTargetValue] = useState('')

  const handleFormatClicked = () => {
    const value = originalRef.current?.value
    if (!value) return

    const formatted = value
      .replace(/-/g, '')
      .replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5')

    if (!uuidValidate(formatted)) {
      setTargetValue('⚠️ Invalid UUID')
      return
    }

    setTargetValue(formatted)
  }

  const handleClipText = (text: string) => {
    setOriginalValue(text)
  }

  const handleClearClicked = () => {
    setOriginalValue('')
    setTargetValue('')
    originalRef.current?.focus()
  }

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOriginalValue(event.target.value)
    setTargetValue('')
  }

  const handleSampleClicked = () => {
    const sample = '123639f0852211ee9b230500b4b78763'
    setOriginalValue(sample)
    setTargetValue('')
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Buttons */}
      <div className="flex flex-row flex-wrap items-center gap-6">
        <button
          disabled={!originalValue}
          onClick={handleFormatClicked}
          className="flex items-center gap-2 db-button _main"
        >
          <FormatIcon className="h-3.5 w-3.5" /> Format
        </button>
        <div className="flex flex-row items-center gap-3">
          <ClearButton onClick={handleClearClicked} disabled={!originalValue} />
          <ClipboardButton handleClipText={handleClipText} />
          <SampleButton onClick={handleSampleClicked} />
        </div>
      </div>

      {/* Original */}
      <div className="flex flex-row items-center gap-2 flex-2">
        <label htmlFor="original-input" className="text-sm text-tnormal">
          String to format
        </label>
        <input
          id="original-input"
          ref={originalRef}
          value={originalValue}
          onChange={handleOnChangeInput}
          type="text"
          placeholder={'123639f0852211ee9b230500b4b78763'}
          className={cn('db-input flex-1 py-2')}
        />
      </div>

      {/* Target */}
      <div className="flex flex-row items-center gap-2 flex-2">
        <label htmlFor="uuid-input" className="text-sm text-tnormal">
          UUID
        </label>
        <input
          id="uuid-input"
          ref={targetRef}
          value={targetValue}
          onChange={event => setTargetValue(event.target.value)}
          type="text"
          placeholder={'123639f0-8522-11ee-9b23-0500b4b78763'}
          className={cn('db-input flex-1 py-2')}
        />
        <CopyButton text={targetValue} />
      </div>
    </div>
  )
}
