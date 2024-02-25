import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'

import { ulid } from 'ulidx'
import ButtonClear from '../../components/ui/ButtonClear'
import ButtonCopy from '../../components/ui/ButtonCopy'
import ButtonDownload from '../../components/ui/ButtonDownload'
import ButtonGenerate from '../../components/ui/ButtonGenerate'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
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
      <div className="flex flex-row flex-wrap items-center gap-4">
        {/* buttons */}
        <div className="flex flex-row flex-wrap items-center gap-4">
          <ButtonGenerate
            onClick={handleGenerateClicked}
            disabled={parseInt(recordsValue) > 500 || parseInt(recordsValue) < 1}
          />

          <div className="flex flex-row items-center gap-2">
            <ButtonCopy text={textareaValue} />
            <ButtonDownload onClick={handleDownloadClicked} disabled={!textareaValue} />
            <ButtonClear onClick={handleClearClicked} disabled={!textareaValue} />
          </div>
        </div>

        {/* records */}
        <div className="flex flex-row flex-wrap items-center gap-x-1 gap-y-2 h-fit">
          <Input
            ref={inputTimeSeedRef}
            type="text"
            placeholder="time seed"
            className={cn('w-52')}
          />
          <div className="flex items-center gap-1 flex-nowrap">
            <Times className="w-5 h-5 text-gray-500 dark:text-tdark" />
            <Input
              ref={inputRecordsRef}
              value={recordsValue}
              onChange={event => setRecordsValue(event.target.value)}
              type="number"
              placeholder="max 500"
              max={500}
              min={1}
              className={cn('w-28')}
            />
          </div>
        </div>
      </div>

      {/* textarea */}
      <div className="flex-1 min-h-0">
        <Textarea
          ref={textareaRef}
          value={textareaValue}
          onChange={e => setTextareaValue(e.target.value)}
          placeholder='Click "Generate" button to generate ULIDs...'
          className="w-full h-full text-base resize-none db-scrollbar"
        />
      </div>
    </div>
  )
}
