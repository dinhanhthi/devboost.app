'use client'

import { useRef, useState } from 'react'
import { Button } from '../../components/ui/Button'
import ButtonClear from '../../components/ui/ButtonClear'
import ButtonClipboard from '../../components/ui/ButtonClipboard'
import ButtonCopy from '../../components/ui/ButtonCopy'
import ButtonDecode from '../../components/ui/ButtonDecode'
import ButtonEncode from '../../components/ui/ButtonEncode'
import ButtonSample from '../../components/ui/ButtonSample'
import { Textarea } from '../../components/ui/Textarea'
import TurnLeftIcon from '../../icons/TurnLeftIcon'
import ButtonUpload from '../../components/ui/ButtonUpload'

export default function Base64String() {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [inputValue, setInputValue] = useState('')
  const outputRef = useRef<HTMLTextAreaElement>(null)
  const [outputValue, setOutputValue] = useState('')

  const handleClearClicked = () => {
    setInputValue('')
    setOutputValue('')
    inputRef.current?.focus()
  }

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value)
    setOutputValue('')
  }

  const handleOnChangeOutput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOutputValue(event.target.value)
  }

  const handleClipText = (text: string) => {
    setInputValue(text)
    setOutputValue('')
  }

  const handleSampleClicked = () => {
    const sample = 'This is a sample text.'
    setInputValue(sample)
    setOutputValue('')
  }

  const handleUseAsInputClicked = () => {
    setInputValue(outputValue)
  }

  const handleEncodeClicked = () => {
    if (!isWellFormed(inputValue)) {
      setOutputValue('Invalid input')
      return
    }
    const binString = String.fromCodePoint(...new TextEncoder().encode(inputValue))
    setOutputValue(btoa(binString))
  }

  const handleDecodeClicked = () => {
    if (!isWellFormed(inputValue)) {
      setOutputValue('Invalid input')
      return
    }
    try {
      const decoded = new TextDecoder().decode(
        Uint8Array.from(atob(inputValue), c => c.charCodeAt(0))
      )
      setOutputValue(decoded)
    } catch (error) {
      setOutputValue('Cannot decode the input!')
    }
  }

  // Quick polyfill since Firefox and Opera do not yet support isWellFormed().
  // encodeURIComponent() throws an error for lone surrogates, which is essentially the same.
  function isWellFormed(str: any) {
    if (typeof str.isWellFormed != 'undefined') {
      return str.isWellFormed()
    } else {
      try {
        encodeURIComponent(str)
        return true
      } catch (error) {
        return false
      }
    }
  }

  const handleOnDrop = (event: React.DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      const text = reader.result
      setInputValue(text as string)
      setOutputValue('')
    }
    reader.readAsText(file)
  }

  const handleUploadFile = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '*'
    input.onchange = (event: any) => {
      const file = event.target.files[0]
      if (!file) return
      if (file.size > 5 * 1024 * 1024) {
        setInputValue('Only file size less than 5MB is supported!')
        setOutputValue('')
        return
      }
      const reader = new FileReader()
      reader.onload = () => {
        const text = reader.result
        setInputValue(text as string)
        setOutputValue('')
      }
      reader.readAsText(file)
    }
    input.click()
  }

  return (
    <div className="flex flex-col w-full h-full gap-4">
      {/* Input */}
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex flex-row items-center gap-4">
          <div className="font-medium">Input</div>
          <div className="flex flex-row items-center gap-3">
            <ButtonEncode onClick={handleEncodeClicked} disabled={!inputValue} />
            <ButtonDecode onClick={handleDecodeClicked} disabled={!inputValue} />
          </div>
          <div className="flex flex-row items-center gap-3">
            <ButtonUpload onClick={handleUploadFile} />
            <ButtonClipboard handleClipText={handleClipText} />
            <ButtonSample onClick={handleSampleClicked} />
          </div>
          <ButtonClear onClick={handleClearClicked} disabled={!inputValue} />
        </div>
        <div className="flex-1 min-h-0">
          <Textarea
            className="h-full db-scrollbar"
            ref={inputRef}
            value={inputValue}
            onChange={handleOnChangeInput}
            onDrop={handleOnDrop}
            placeholder="Type anything or you can drag and drop a file here..."
          />
        </div>
      </div>

      {/* Output */}
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex flex-row items-center gap-4">
          <div className="font-medium">Output</div>
          <ButtonCopy text={outputValue} />
          <Button onClick={handleUseAsInputClicked} variant="outline" disabled={!outputValue}>
            <TurnLeftIcon className="h-4 w-4 mr-1.5" />
            Use as input
          </Button>
        </div>
        <div className="flex-1 min-h-0">
          <Textarea
            className="h-full db-scrollbar"
            ref={outputRef}
            value={outputValue}
            onChange={handleOnChangeOutput}
          />
        </div>
      </div>
    </div>
  )
}
