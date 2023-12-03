'use client'

import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'

import {
  NIL as NIL_UUID,
  validate as uuidValidate,
  v1 as uuidv1,
  v3 as uuidv3,
  v4 as uuidv4,
  v5 as uuidv5
} from 'uuid'

import { Button } from '../../components/ui/Button'
import ButtonClear from '../../components/ui/ButtonClear'
import ButtonCopy from '../../components/ui/ButtonCopy'
import ButtonDownload from '../../components/ui/ButtonDownload'
import ButtonGenerate from '../../components/ui/ButtonGenerate'
import { Input } from '../../components/ui/Input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/Select'
import { Textarea } from '../../components/ui/Textarea'
import FaMagic from '../../icons/FaMagic'
import Times from '../../icons/Times'

type UuidVersion = 'v1' | 'v3' | 'v4' | 'v5'

export default function UuidGenerator() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [textareaValue, setTextareaValue] = useState('')
  const inputRecordsRef = useRef<HTMLInputElement>(null)
  const inputNamespaceRef = useRef<HTMLInputElement>(null)
  const inputNameRef = useRef<HTMLInputElement>(null)
  const [namespaceValue, setNamespaceValue] = useState('')
  const [nameValue, setNameValue] = useState('')
  const [recordsValue, setRecordsValue] = useState('')
  const [uuidVersion, setUuidVersion] = useState<UuidVersion>('v1')

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value)
  }

  const handleClearClicked = () => {
    setTextareaValue('')
    textareaRef.current?.focus()
  }

  const uuidVersions = [
    { value: 'v1', name: 'UUID v1 (time-based)' },
    { value: 'v3', name: 'UUID v3 (name-based (MD5))' },
    { value: 'v4', name: 'UUID v4 (random)' },
    { value: 'v5', name: 'UUID v5 (name-based (SHA-1))' }
  ]

  const handleSelectVersionsChange = (value: UuidVersion) => {
    setNameValue('')
    setNamespaceValue('')
    setTextareaValue('')
    setUuidVersion(value)
  }

  const handleNamespaceClicked = (namespace: string) => () => {
    switch (namespace) {
      case 'dns':
        setNamespaceValue('6ba7b810-9dad-11d1-80b4-00c04fd430c8')
        break

      case 'url':
        setNamespaceValue('6ba7b811-9dad-11d1-80b4-00c04fd430c8')
        break

      case 'oid':
        setNamespaceValue('6ba7b812-9dad-11d1-80b4-00c04fd430c8')
        break

      case 'x500':
        setNamespaceValue('6ba7b814-9dad-11d1-80b4-00c04fd430c8')
        break

      case 'random':
        setNamespaceValue(uuidv4())
        break
    }
  }

  const handleDownloadClicked = () => {
    const blob = new Blob([textareaValue], { type: 'text/plain;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = 'uuids_generated_by_DevBoost.app.txt'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleGenerateClicked = () => {
    const max = inputRecordsRef.current?.value ? parseInt(inputRecordsRef.current.value) : 1
    const uuids = []
    for (let i = 0; i < max; i++) {
      switch (uuidVersion) {
        case 'v1':
          uuids.push(uuidv1())
          break
        case 'v3': {
          const isValidNamespace = uuidValidate(namespaceValue)
          if (isValidNamespace) {
            uuids.push(uuidv3(nameValue, namespaceValue))
          } else {
            uuids.push('⚠️ Invalid namespace')
          }
          break
        }
        case 'v4':
          uuids.push(uuidv4())
          break
        case 'v5': {
          const isValidNamespace = uuidValidate(namespaceValue)
          if (isValidNamespace) {
            uuids.push(uuidv5(nameValue, namespaceValue))
          } else {
            uuids.push('⚠️ Invalid namespace')
          }
          break
        }
        default:
          break
      }
    }
    setTextareaValue(uuids.join('\n'))
  }

  const handleNilClicked = () => {
    const max = inputRecordsRef.current?.value ? parseInt(inputRecordsRef.current?.value) : 1
    const uuids = []
    for (let i = 0; i < max; i++) {
      uuids.push(NIL_UUID)
    }
    setTextareaValue(uuids.join('\n'))
  }

  return (
    <div className={cn('flex h-full flex-col gap-4')}>
      <div className="flex flex-col flex-wrap justify-between gap-4">
        {/* buttons */}
        <div className="flex flex-row flex-wrap items-center gap-6">
          <div className="flex flex-row items-center gap-3">
            <ButtonGenerate
              onClick={handleGenerateClicked}
              disabled={parseInt(recordsValue) > 500 || parseInt(recordsValue) < 1}
            />
            <Button
              className="text-sm"
              onClick={handleNilClicked}
              disabled={parseInt(recordsValue) > 500 || parseInt(recordsValue) < 1}
            >
              <FaMagic className="w-4 h-4 mr-1.5" />
              NIL
            </Button>
          </div>

          <div className="flex flex-row items-center gap-3">
            <ButtonCopy text={textareaValue} />
            <ButtonDownload onClick={handleDownloadClicked} disabled={!textareaValue} />
            <ButtonClear onClick={handleClearClicked} disabled={!textareaValue} />
          </div>
        </div>

        {/* versions */}
        <div className="relative z-10 flex flex-row items-center h-8 gap-1">
          <Select defaultValue="v1" onValueChange={handleSelectVersionsChange}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a version" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {uuidVersions.map(({ value, name }) => (
                  <SelectItem key={value} value={value}>
                    {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Times className="w-5 h-5 text-gray-500 dark:text-tdark" />
          <Input
            ref={inputRecordsRef}
            value={recordsValue}
            onChange={event => setRecordsValue(event.target.value)}
            type="number"
            placeholder="max 500"
            min={1}
            max={500}
            className={cn('w-28')}
          />
        </div>
      </div>

      {/* v3 and v5 */}
      {(uuidVersion === 'v3' || uuidVersion === 'v5') && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-3">
            <div className="flex flex-row items-center w-full gap-2">
              <label htmlFor="namespace" className="text-sm">
                Namespace
              </label>
              <Input
                id="namespace"
                ref={inputNamespaceRef}
                value={namespaceValue}
                onChange={event => setNamespaceValue(event.target.value)}
                type="text"
                placeholder="6ba7b810-9dad-11d1-80b4-00c04fd430c8"
                className={cn('flex-1 py-2')}
              />
              <Button variant="secondary" onClick={handleNamespaceClicked('dns')}>
                ns:DNS
              </Button>
              <Button variant="secondary" onClick={handleNamespaceClicked('url')}>
                ns:URL
              </Button>
              <Button variant="secondary" onClick={handleNamespaceClicked('oid')}>
                ns:OID
              </Button>
              <Button variant="secondary" onClick={handleNamespaceClicked('x500')}>
                ns:X500
              </Button>
              <Button variant="secondary" onClick={handleNamespaceClicked('random')}>
                Random
              </Button>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <label htmlFor="name" className="text-sm">
              Name
            </label>
            <Input
              id="name"
              ref={inputNameRef}
              value={nameValue}
              onChange={event => setNameValue(event.target.value)}
              type="text"
              placeholder="Enter name..."
              className={cn('w-full py-2')}
            />
          </div>
        </div>
      )}

      {/* textarea */}
      <div className="flex-1 min-h-0">
        <Textarea
          ref={textareaRef}
          value={textareaValue}
          onChange={handleTextareaChange}
          placeholder='Click "Generate" button to generate UUIDs...'
        />
      </div>
    </div>
  )
}
