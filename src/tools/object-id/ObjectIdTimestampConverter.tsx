import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'

import ButtonClear from '../../components/ui/ButtonClear'
import ButtonClipboard from '../../components/ui/ButtonClipboard'
import ButtonDecode from '../../components/ui/ButtonDecode'
import ButtonSample from '../../components/ui/ButtonSample'
import { Input } from '../../components/ui/Input'
import WarningIcon from '../../icons/WarningIcon'
import { ObjectId } from 'bson'

export default function ObjectIdTimestampConverter() {
  const originalRef = useRef<HTMLInputElement>(null)
  const [originalValue, setOriginalValue] = useState('')
  const [timeMsValue, setTimeMsValue] = useState('')
  const [timeDateValue, setTimeDateValue] = useState('')
  const [error, setError] = useState('')
  const [isDecoding, setIsDecoding] = useState(false)

  const handleClipText = (text: string) => {
    setOriginalValue(text)
  }

  const handleClearClicked = () => {
    setOriginalValue('')
    reset()
    originalRef.current?.focus()
  }

  const handleDecodeClicked = async () => {
    setError('')
    setIsDecoding(true)
    const value = originalRef.current?.value
    if (!value) return

    if (ObjectId.isValid(value)) {
      const id = new ObjectId(value)
      setTimeMsValue(id.getTimestamp().getTime().toString())
      setTimeDateValue(new Date(id.getTimestamp()).toString())
    } else {
      setError('ObjectID is invalid!')
    }

    setIsDecoding(false)
  }

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOriginalValue(event.target.value)
    reset()
  }

  const reset = () => {
    setTimeMsValue('')
    setTimeDateValue('')
    setError('')
  }

  const handleSampleClicked = () => {
    const sample = '65928cfc7038ef70dcda1f36'
    setOriginalValue(sample)
    reset()
  }

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Buttons */}
      <div className="flex flex-row flex-wrap items-center gap-4">
        <ButtonDecode
          onClick={handleDecodeClicked}
          disabled={!originalValue}
          loading={isDecoding}
        />
        <div className="flex flex-row items-center gap-2">
          <ButtonClipboard handleClipText={handleClipText} />
          <ButtonClear onClick={handleClearClicked} disabled={!originalValue} />
          <ButtonSample onClick={handleSampleClicked} />
        </div>
      </div>

      {/* Original */}
      <div className="flex flex-row items-center gap-2 flex-2">
        <div className="text-sm">ObjectID</div>
        <Input
          ref={originalRef}
          value={originalValue}
          onChange={handleOnChangeInput}
          type="text"
          placeholder={'65928cfc7038ef70dcda1f36'}
          className={cn('flex-1 py-2')}
        />
      </div>

      {/* Result */}
      <div
        className={cn('flex flex-col gap-2 text-sm', {
          'border rounded-lg bg-muted dark:border-border p-4':
            timeMsValue || timeDateValue || error
        })}
      >
        {timeMsValue && (
          <div data-testid="timeMs" className="flex flex-row items-center gap-2 text-sm">
            <div>Extracted milliseconds since UNIX Epoch from ObjectID:</div>
            <div className="text-success dark:text-thighlight">{timeMsValue}</div>
          </div>
        )}
        {timeDateValue && (
          <div className="flex flex-row items-center gap-2 text-sm">
            <div>Human friendly:</div>
            <div className="text-success dark:text-thighlight">{timeDateValue}</div>
          </div>
        )}
        {error && (
          <div
            data-testid="invalid"
            className="flex flex-row items-center gap-2 text-warning "
          >
            <WarningIcon className="w-5 h-5" />
            ObjectID is invalid!
          </div>
        )}
      </div>
    </div>
  )
}
