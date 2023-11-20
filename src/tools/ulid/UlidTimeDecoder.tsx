import cn from 'classnames'
import { useRef, useState } from 'react'

import { decodeTime, isValid } from 'ulidx'
import ClearButton from '../../components/ClearButton'
import ClipboardButton from '../../components/ClipboardButton'
import AiOutlineLoading3Quarters from '../../icons/AiOutlineLoading3Quarters'
import FormatIcon from '../../icons/FormatIcon'
import { WarningIcon } from '../../icons/WarningIcon'

export default function UlidTimeDecoder() {
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

    if (isValid(value)) {
      const decoded = decodeTime(value)
      setTimeMsValue(decoded.toString())
      setTimeDateValue(new Date(decoded).toString())
    } else {
      setError('ULID is invalid!')
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

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Buttons */}
      <div className="flex flex-row flex-wrap items-center gap-6">
        <button
          disabled={!originalValue}
          onClick={handleDecodeClicked}
          className="flex items-center gap-2 t4d-button _main"
        >
          {!isDecoding && <FormatIcon className="h-3.5 w-3.5" />}
          {isDecoding && (
            <div className="animate-spin">
              <AiOutlineLoading3Quarters className="h-3.5 w-3.5" />
            </div>
          )}{' '}
          Decode
        </button>
        <div className="flex flex-row items-center gap-3">
          <ClipboardButton handleClipText={handleClipText} />
          <ClearButton onClick={handleClearClicked} disabled={!originalValue} />
        </div>
      </div>

      {/* Original */}
      <div className="flex flex-row items-center gap-2 flex-2">
        <div className="text-sm text-tnormal">ULID</div>
        <input
          ref={originalRef}
          value={originalValue}
          onChange={handleOnChangeInput}
          type="text"
          placeholder={'01HFE5Z3SZDQVR53EY0T54C9TS'}
          className={cn('t4d-input flex-1 py-2')}
        />
      </div>

      {/* Result */}
      <div
        className={cn('flex flex-col gap-2 text-sm', {
          'border rounded-lg bg-darker border-border p-4': timeMsValue || timeDateValue || error
        })}
      >
        {timeMsValue && (
          <div data-testid="timeMs" className="flex flex-row items-center gap-2 text-sm">
            <div>Extracted milliseconds since UNIX Epoch from ULID:</div>
            <div className="text-thighlight">{timeMsValue}</div>
          </div>
        )}
        {timeDateValue && (
          <div className="flex flex-row items-center gap-2 text-sm">
            <div>Human friendly:</div>
            <div className="text-thighlight">{timeDateValue}</div>
          </div>
        )}
        {error && (
          <div data-testid="invalid" className="flex flex-row items-center gap-2 text-amber-400 ">
            <WarningIcon className="w-5 h-5" />
            ULID is invalid!
          </div>
        )}
      </div>
    </div>
  )
}
