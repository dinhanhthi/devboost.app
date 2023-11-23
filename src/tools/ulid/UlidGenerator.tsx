import cn from 'classnames'
import { useRef, useState } from 'react'

import { ulid } from 'ulidx'
import ClearButton from '../../components/ClearButton'
import CopyButton from '../../components/CopyButton'
import DownloadButton from '../../components/DownloadButton'
import GenerateButton from '../../components/GenerateButton'
import Times from '../../icons/Times'

export default function UlidGenerator() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [textareaValue, setTextareaValue] = useState('')
  const inputRecordsRef = useRef<HTMLInputElement>(null)
  const inputTimeSeedRef = useRef<HTMLInputElement>(null)
  const [recordsValue, setRecordsValue] = useState('')

  const handleClearClicked = () => {
    setTextareaValue('')
    textareaRef.current?.focus()
  }

  const handleDownloadClicked = () => {
    const blob = new Blob([textareaValue], { type: 'text/plain;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = 'ulids_generated_by_DevBoost.app.txt'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleGenerateClicked = async () => {
    const max = inputRecordsRef.current?.value ? parseInt(inputRecordsRef.current?.value) : 1
    const ulids = []
    for (let i = 0; i < max; i++) {
      if (inputTimeSeedRef.current?.value) {
        ulids.push(ulid(parseInt(inputTimeSeedRef.current?.value)))
      } else {
        ulids.push(ulid())
      }
    }
    setTextareaValue(ulids.join('\n'))
  }

  return (
    <div className={cn('flex h-full flex-col gap-4')}>
      <div className="flex flex-row flex-wrap items-center justify-between gap-4">
        {/* buttons */}
        <div className="flex flex-row flex-wrap items-center gap-6">
          <GenerateButton
            onClick={handleGenerateClicked}
            disabled={parseInt(recordsValue) > 500 || parseInt(recordsValue) < 1}
          />

          <div className="flex flex-row items-center gap-3">
            <CopyButton text={textareaValue} />
            <DownloadButton onClick={handleDownloadClicked} disabled={!textareaValue} />
            <ClearButton onClick={handleClearClicked} disabled={!textareaValue} />
          </div>
        </div>

        {/* records */}
        <div className="flex flex-row items-center gap-1 h-7">
          <input
            ref={inputTimeSeedRef}
            type="text"
            placeholder="time seed"
            className={cn('db-input w-52')}
          />
          <Times className="w-5 h-5 text-gray-500 dark:text-tdark" />
          <input
            ref={inputRecordsRef}
            value={recordsValue}
            onChange={event => setRecordsValue(event.target.value)}
            type="number"
            placeholder="max 500"
            max={500}
            min={1}
            className={cn('db-input w-28')}
          />
        </div>
      </div>

      {/* textarea */}
      <div className="flex-1 min-h-0">
        <textarea
          ref={textareaRef}
          value={textareaValue}
          onChange={e => setTextareaValue(e.target.value)}
          placeholder='Click "Generate" button to generate ULIDs...'
          className={cn('db-textarea h-full max-h-full w-full text-base')}
        />
      </div>
    </div>
  )
}
