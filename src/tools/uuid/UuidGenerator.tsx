'use client'

import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  NIL as NIL_UUID,
  validate as uuidValidate,
  v1 as uuidv1,
  v3 as uuidv3,
  v4 as uuidv4,
  v5 as uuidv5
} from 'uuid'

import Button from '../../components/Button'
import ClearButton from '../../components/ClearButton'
import CopyButton from '../../components/CopyButton'
import DownloadButton from '../../components/DownloadButton'
import GenerateButton from '../../components/GenerateButton'
import SelectOptions from '../../components/SelectOptions'
import FaMagic from '../../icons/FaMagic'
import Times from '../../icons/Times'

export default function UuidGenerator() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [textareaValue, setTextareaValue] = useState('')
  const inputRecordsRef = useRef<HTMLInputElement>(null)
  const inputNamespaceRef = useRef<HTMLInputElement>(null)
  const inputNameRef = useRef<HTMLInputElement>(null)
  const [namespaceValue, setNamespaceValue] = useState('')
  const [nameValue, setNameValue] = useState('')
  const [recordsValue, setRecordsValue] = useState('')

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value)
  }

  const handleClearClicked = () => {
    setTextareaValue('')
    textareaRef.current?.focus()
  }

  const {
    control: controlVersion,
    getValues: getValuesVersion,
    watch: watchVersion
  } = useForm<{ version: 'v1' | 'v3' | 'v4' | 'v5' }>({ defaultValues: { version: 'v1' } })

  const uuidVersion = watchVersion('version')
  useEffect(() => {
    if (uuidVersion) {
      setNameValue('')
      setNamespaceValue('')
      setTextareaValue('')
    }
  }, [uuidVersion])

  const uuidVersions = [
    { value: 'v1', name: 'UUID v1 (time-based)' },
    { value: 'v3', name: 'UUID v3 (name-based (MD5))' },
    { value: 'v4', name: 'UUID v4 (random)' },
    { value: 'v5', name: 'UUID v5 (name-based (SHA-1))' }
  ]

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
    const version = getValuesVersion('version')
    const max = inputRecordsRef.current?.value ? parseInt(inputRecordsRef.current.value) : 1
    const uuids = []
    for (let i = 0; i < max; i++) {
      switch (version) {
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
            <GenerateButton
              onClick={handleGenerateClicked}
              disabled={parseInt(recordsValue) > 500 || parseInt(recordsValue) < 1}
            />
            <Button
              className="text-sm"
              isPrimary={true}
              onClick={handleNilClicked}
              disabled={parseInt(recordsValue) > 500 || parseInt(recordsValue) < 1}
            >
              <FaMagic className="h-3.5 w-3.5" />
              NIL
            </Button>
          </div>

          <div className="flex flex-row items-center gap-3">
            <CopyButton text={textareaValue} />
            <DownloadButton onClick={handleDownloadClicked} disabled={!textareaValue} />
            <ClearButton onClick={handleClearClicked} disabled={!textareaValue} />
          </div>
        </div>

        {/* versions */}
        <div className="relative z-10 flex flex-row items-center gap-1 h-7">
          <SelectOptions
            data={uuidVersions}
            control={controlVersion}
            formName="version"
            initSelectedValue={getValuesVersion('version')}
            dropdownStyle={{ width: 260, maxHeight: 300 }}
          />
          <Times className="w-5 h-5 text-tdark" />
          <input
            ref={inputRecordsRef}
            value={recordsValue}
            onChange={event => setRecordsValue(event.target.value)}
            type="number"
            placeholder="max 500"
            min={1}
            max={500}
            className={cn('db-input w-28')}
          />
        </div>
      </div>

      {/* v3 and v5 */}
      {(uuidVersion === 'v3' || uuidVersion === 'v5') && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-3">
            <div className="flex flex-row items-center w-full gap-2">
              <label htmlFor="namespace" className="text-sm text-tnormal">
                Namespace
              </label>
              <input
                id="namespace"
                ref={inputNamespaceRef}
                value={namespaceValue}
                onChange={event => setNamespaceValue(event.target.value)}
                type="text"
                placeholder="6ba7b810-9dad-11d1-80b4-00c04fd430c8"
                className={cn('db-input flex-1 py-2')}
              />
              <button onClick={handleNamespaceClicked('dns')} className="db-button">
                ns:DNS
              </button>
              <button onClick={handleNamespaceClicked('url')} className="db-button">
                ns:URL
              </button>
              <button onClick={handleNamespaceClicked('oid')} className="db-button">
                ns:OID
              </button>
              <button onClick={handleNamespaceClicked('x500')} className="db-button">
                ns:X500
              </button>
              <button onClick={handleNamespaceClicked('random')} className="db-button">
                Random
              </button>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <label htmlFor="name" className="text-sm text-tnormal">
              Name
            </label>
            <input
              id="name"
              ref={inputNameRef}
              value={nameValue}
              onChange={event => setNameValue(event.target.value)}
              type="text"
              placeholder="Enter name..."
              className={cn('db-input w-full py-2')}
            />
          </div>
        </div>
      )}

      {/* textarea */}
      <div className="flex-1 min-h-0">
        <textarea
          ref={textareaRef}
          value={textareaValue}
          onChange={handleTextareaChange}
          placeholder='Click "Generate" button to generate UUIDs...'
          className={cn('db-textarea h-full max-h-full w-full text-base')}
        />
      </div>
    </div>
  )
}
