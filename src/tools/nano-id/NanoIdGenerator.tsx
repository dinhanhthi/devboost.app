'use client'

import { cn } from '@/lib/utils'
import { customAlphabet, nanoid } from 'nanoid'
import { useRef, useState } from 'react'
import MainContainer from '../../components/MainContainer'
import ButtonClear from '../../components/ui/ButtonClear'
import ButtonCopy from '../../components/ui/ButtonCopy'
import ButtonDownload from '../../components/ui/ButtonDownload'
import ButtonGenerate from '../../components/ui/ButtonGenerate'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'

export default function NanoIdGenerator() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [textareaValue, setTextareaValue] = useState('')
  const inputRecordsRef = useRef<HTMLInputElement>(null)
  const yourCharacterRef = useRef<HTMLInputElement>(null)
  const idSizeRef = useRef<HTMLInputElement>(null)
  const [recordsValue, setRecordsValue] = useState('')
  const [idSizeValue, setIdSizeValue] = useState('')

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
    a.download = 'nanoid_generated_by_DevBoost.app.txt'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleGenerateClicked = async () => {
    const max = inputRecordsRef.current?.value ? parseInt(inputRecordsRef.current?.value) : 1
    const idSize = idSizeRef.current?.value ? parseInt(idSizeRef.current?.value) : null
    const nanoIds = []
    for (let i = 0; i < max; i++) {
      if (yourCharacterRef.current?.value) {
        const customNanoId = customAlphabet(yourCharacterRef.current.value, idSize || 21)
        nanoIds.push(customNanoId())
      } else {
        nanoIds.push(idSize ? nanoid(idSize) : nanoid())
      }
    }
    setTextareaValue(nanoIds.join('\n'))
  }
  return (
    <MainContainer>
      <div className="flex flex-col flex-wrap justify-between gap-4">
        {/* buttons */}
        <div className="flex flex-row flex-wrap items-center gap-6">
          <ButtonGenerate
            onClick={handleGenerateClicked}
            disabled={
              parseInt(recordsValue) > 500 ||
              parseInt(recordsValue) < 1 ||
              parseInt(idSizeValue) > 100 ||
              parseInt(idSizeValue) < 1
            }
          />

          <div className="flex flex-row items-center gap-3">
            <ButtonCopy text={textareaValue} />
            <ButtonDownload onClick={handleDownloadClicked} disabled={!textareaValue} />
            <ButtonClear onClick={handleClearClicked} disabled={!textareaValue} />
          </div>
        </div>

        {/* records */}
        <div className="flex flex-row flex-wrap items-center flex-1 min-w-0 gap-4 h-7">
          <div className="flex flex-row items-center gap-2">
            <div className="text-sm">Generate based on your characters (optional) </div>
            <Input
              ref={yourCharacterRef}
              type="text"
              placeholder="abcXyz123@"
              className={cn('w-64')}
            />
          </div>

          <div className="flex flex-row flex-wrap items-center gap-4">
            <div className="flex flex-row items-center gap-2">
              <div className="text-sm">ID Size</div>
              <Input
                ref={idSizeRef}
                value={idSizeValue}
                onChange={event => setIdSizeValue(event.target.value)}
                type="number"
                placeholder="max 100"
                max={100}
                min={1}
                className={cn('w-28')}
              />
            </div>

            <div className="flex flex-row items-center gap-2">
              <div className="text-sm">How many?</div>
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
      </div>

      {/* textarea */}
      <div className="flex-1 min-h-0">
        <Textarea
          ref={textareaRef}
          value={textareaValue}
          onChange={e => setTextareaValue(e.target.value)}
          placeholder='Click "Generate" button to generate Nano IDs...'
          className={cn('h-full w-full text-base db-scrollbar')}
        />
      </div>
    </MainContainer>
  )
}
