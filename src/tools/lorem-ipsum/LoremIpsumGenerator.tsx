'use client'

import { cn } from '@/lib/utils'
import { LoremIpsum } from 'lorem-ipsum'
import { useRef, useState } from 'react'
import MainContainer from '../../components/MainContainer'
import ButtonClear from '../../components/ui/ButtonClear'
import ButtonCopy from '../../components/ui/ButtonCopy'
import ButtonDownload from '../../components/ui/ButtonDownload'
import ButtonGenerate from '../../components/ui/ButtonGenerate'
import { Input } from '../../components/ui/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/Select'
import { Textarea } from '../../components/ui/Textarea'
import Times from '../../icons/Times'

type GenerateTypes = 'words' | 'sentences' | 'paragraph'
type FormatTypes = 'html' | 'plain'

export default function LoremIpsumGenerator() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [textareaValue, setTextareaValue] = useState('')
  const inputRecordsRef = useRef<HTMLInputElement>(null)
  const [recordsValue, setRecordsValue] = useState(3)

  const wpsMinRef = useRef<HTMLInputElement>(null)
  const [wpsMinValue, setWpsMinValue] = useState(3)
  const wpsMaxRef = useRef<HTMLInputElement>(null)
  const [wpsMaxValue, setWpsMaxValue] = useState(7)
  const sppMinRef = useRef<HTMLInputElement>(null)
  const [sppMinValue, setSppMinValue] = useState(1)
  const sppMaxRef = useRef<HTMLInputElement>(null)
  const [sppMaxValue, setSppMaxValue] = useState(5)

  const defaultGenerateType = 'paragraph'
  const [generateType, setGenerateType] = useState<GenerateTypes>(defaultGenerateType)
  const generateTypes = [
    { value: 'words', name: 'Generate Words' },
    { value: 'sentences', name: 'Generate Sentences' },
    { value: 'paragraph', name: 'Generate Paragraphs' }
  ]
  const handleSelectTypes = (value: GenerateTypes) => {
    setTextareaValue('')
    setGenerateType(value)
  }

  const maxRecords = generateType === 'words' ? 1000 : generateType === 'sentences' ? 500 : 100

  const defaultFormat = 'plain'
  const [format, setFormat] = useState<FormatTypes>(defaultFormat)
  const formatTypes = [
    { value: 'html', name: 'Format HTML' },
    { value: 'plain', name: 'Format Plain Text' }
  ]
  const handleSelectFormats = (value: FormatTypes) => {
    setTextareaValue('')
    setFormat(value)
  }

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
    a.download = 'lorem_ipsum_generated_by_DevBoost.app.txt'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleGenerateClicked = async () => {
    switch (generateType) {
      case 'words': {
        const lorem = new LoremIpsum({}, format)
        setTextareaValue(lorem.generateWords(recordsValue))
        break
      }

      case 'sentences': {
        const lorem = new LoremIpsum(
          {
            wordsPerSentence: {
              max: wpsMaxValue,
              min: wpsMinValue
            }
          },
          format
        )
        setTextareaValue(lorem.generateSentences(recordsValue))
        break
      }

      case 'paragraph': {
        const lorem = new LoremIpsum(
          {
            sentencesPerParagraph: {
              max: sppMaxValue,
              min: sppMinValue
            },
            wordsPerSentence: {
              max: wpsMaxValue,
              min: wpsMinValue
            }
          },
          format
        )
        setTextareaValue(lorem.generateParagraphs(recordsValue))
        break
      }

      default: {
        setTextareaValue('')
      }
    }
  }
  return (
    <MainContainer>
      <div className="flex flex-col flex-wrap justify-between gap-4">
        {/* header */}
        <div className="flex flex-wrap justify-between gap-4">
          {/* buttons */}
          <div className="flex flex-row flex-wrap items-center gap-4">
            <ButtonGenerate
              onClick={handleGenerateClicked}
              disabled={
                recordsValue < 1 ||
                recordsValue > maxRecords ||
                wpsMinValue < 1 ||
                wpsMaxValue < 1 ||
                wpsMaxValue < wpsMinValue ||
                sppMinValue < 1 ||
                sppMaxValue < 1 ||
                sppMaxValue < sppMinValue
              }
            />

            <div className="flex flex-row items-center gap-2">
              <ButtonCopy text={textareaValue} />
              <ButtonDownload onClick={handleDownloadClicked} disabled={!textareaValue} />
              <ButtonClear onClick={handleClearClicked} disabled={!textareaValue} />
            </div>
          </div>

          {/* format x type x number */}
          <div className="relative z-10 flex flex-row items-center h-8 gap-1">
            <Select
              defaultValue={defaultFormat}
              onValueChange={handleSelectFormats}
              name="format-selection"
            >
              <SelectTrigger className="w-[170px] h-8">
                <SelectValue placeholder="Select a format" />
              </SelectTrigger>
              <SelectContent>
                {formatTypes.map(({ value, name }) => (
                  <SelectItem key={value} value={value}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              defaultValue={defaultGenerateType}
              onValueChange={handleSelectTypes}
              name="types-selection"
            >
              <SelectTrigger className="w-[200px] h-8">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                {generateTypes.map(({ value, name }) => (
                  <SelectItem key={value} value={value}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Times className="w-5 h-5 text-gray-500 dark:text-tdark" />
            <Input
              ref={inputRecordsRef}
              value={recordsValue}
              onChange={event => setRecordsValue(+event.target.value)}
              type="number"
              placeholder={`max ${maxRecords}`}
              min={1}
              max={maxRecords}
              className={cn('w-28 h-8')}
            />
          </div>
        </div>

        {/* Options */}
        {generateType !== 'words' && (
          <div className="flex flex-row flex-wrap items-center flex-1 min-w-0 gap-4 h-7">
            {/* Words per sentence */}
            <div className="flex flex-row items-center gap-2">
              <div className="text-sm">Words per sentence</div>
              <Input
                ref={wpsMinRef}
                value={wpsMinValue}
                onChange={event => setWpsMinValue(+event.target.value)}
                type="number"
                placeholder="min"
                min={1}
                className={cn('w-28')}
              />
              (min)
              <Input
                ref={wpsMaxRef}
                value={wpsMaxValue}
                onChange={event => setWpsMaxValue(+event.target.value)}
                type="number"
                placeholder="max"
                min={1}
                className={cn('w-28')}
              />
              (max)
            </div>

            {/* Sentences per paragraph */}
            {generateType === 'paragraph' && (
              <div className="flex flex-row items-center gap-2">
                <div className="text-sm">Sentences per paragraph</div>
                <Input
                  ref={sppMinRef}
                  value={sppMinValue}
                  onChange={event => setSppMinValue(+event.target.value)}
                  type="number"
                  placeholder="min"
                  min={1}
                  className={cn('w-28')}
                />
                (min)
                <Input
                  ref={sppMaxRef}
                  value={sppMaxValue}
                  onChange={event => setSppMaxValue(+event.target.value)}
                  type="number"
                  placeholder="max"
                  min={1}
                  className={cn('w-28')}
                />
                (max)
              </div>
            )}
          </div>
        )}
      </div>

      {/* textarea */}
      <div className="flex-1 min-h-0">
        <Textarea
          ref={textareaRef}
          value={textareaValue}
          onChange={e => setTextareaValue(e.target.value)}
          placeholder='Click "Generate" button to generate Nano IDs...'
          className="w-full h-full text-base resize-none db-scrollbar"
        />
      </div>
    </MainContainer>
  )
}
