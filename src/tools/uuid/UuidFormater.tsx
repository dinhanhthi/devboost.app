import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'
import { validate as uuidValidate } from 'uuid'

import { Button } from '../../components/ui/Button'
import ButtonClear from '../../components/ui/ButtonClear'
import ButtonClipboard from '../../components/ui/ButtonClipboard'
import ButtonCopy from '../../components/ui/ButtonCopy'
import ButtonSample from '../../components/ui/ButtonSample'
import { Input } from '../../components/ui/Input'
import FormatIcon from '../../icons/FormatIcon'

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
      <div className="flex flex-row flex-wrap items-center gap-4">
        <Button disabled={!originalValue} onClick={handleFormatClicked}>
          <FormatIcon className="h-4 w-4 mr-1.5" /> Format
        </Button>
        <div className="flex flex-row items-center gap-2">
          <ButtonClear onClick={handleClearClicked} disabled={!originalValue} />
          <ButtonClipboard handleClipText={handleClipText} />
          <ButtonSample onClick={handleSampleClicked} />
        </div>
      </div>

      {/* Original */}
      <div className="flex flex-row items-center gap-2 flex-2">
        <label htmlFor="original-input" className="text-sm">
          String to format
        </label>
        <Input
          id="original-input"
          ref={originalRef}
          value={originalValue}
          onChange={handleOnChangeInput}
          type="text"
          placeholder={'123639f0852211ee9b230500b4b78763'}
          className={cn('flex-1 py-2')}
        />
      </div>

      {/* Target */}
      <div className="flex flex-row items-center gap-2 flex-2">
        <label htmlFor="uuid-input" className="text-sm">
          UUID
        </label>
        <Input
          id="uuid-input"
          ref={targetRef}
          value={targetValue}
          onChange={event => setTargetValue(event.target.value)}
          type="text"
          placeholder={'123639f0-8522-11ee-9b23-0500b4b78763'}
          className={cn('flex-1 py-2')}
        />
        <ButtonCopy text={targetValue} />
      </div>
    </div>
  )
}
