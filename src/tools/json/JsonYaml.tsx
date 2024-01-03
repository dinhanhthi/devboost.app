'use client'

import { json } from '@codemirror/lang-json'
import CodeMirror from '@uiw/react-codemirror'
import { flattenDeep, sortBy, uniq } from 'lodash'

import { useTheme } from 'next-themes'
import { useCallback, useRef, useState } from 'react'
import ButtonClear from '../../components/ui/ButtonClear'
import ButtonClipboard from '../../components/ui/ButtonClipboard'
import ButtonCopy from '../../components/ui/ButtonCopy'
import ButtonSample from '../../components/ui/ButtonSample'
import ButtonUpload from '../../components/ui/ButtonUpload'
import { Input } from '../../components/ui/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/Select'
import { cn } from '../../lib/utils'

const sampleJson = [
  {
    id: 1,
    name: 'David',
    age: 20
  },
  {
    id: 2,
    name: 'Bobby',
    age: 34
  },
  {
    id: 3,
    name: 'Warren',
    age: 28
  }
]

export default function JsonYaml() {
  const defaultSortMethod = 'key-value'
  const defaultSortDirection = 'asc'
  const sortMethods = [
    { value: 'key-name', name: 'by Key Name' },
    { value: 'key-value', name: 'by Key Value' }
  ]
  const sortDirections = [
    { value: 'asc', name: 'Asc' },
    { value: 'desc', name: 'Desc' }
  ]

  const { theme } = useTheme()
  const [jsonValue, setJsonValue] = useState(JSON.stringify(sampleJson, null, 2))
  const [yamlValue, setYamlValue] = useState(
    sortJson(JSON.stringify(sampleJson), defaultSortMethod, defaultSortDirection, 'name')
  )
  const [sortMethod, setSortMethod] = useState<'key-name' | 'key-value'>(defaultSortMethod)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(defaultSortDirection)
  const inputKeyNameRef = useRef<HTMLInputElement>(null)
  const [keyNameValue, setKeyNameValue] = useState('name')

  const handleOnChangeInput = useCallback((val: string, _viewUpdate: any) => {
    setJsonValue(val)
    const sortedString = sortJson(val, sortMethod, sortDirection, keyNameValue)
    setYamlValue(sortedString)
  }, [])

  const handleOnChangeOutput = useCallback((val: string, _viewUpdate: any) => {
    setYamlValue(val)
  }, [])

  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleClearClicked = () => {
    setJsonValue('')
    setYamlValue('')
    setKeyNameValue('')
    inputRef.current?.focus()
  }

  const handleClipboardClicked = (text: string) => {
    setJsonValue(text)
    setYamlValue(sortJson(text, sortMethod, sortDirection, keyNameValue))
  }

  const handleSampleClicked = () => {
    setJsonValue(JSON.stringify(sampleJson, null, 2))
    setKeyNameValue('name')
    setYamlValue(
      sortJson(JSON.stringify(sampleJson), sortMethod, sortDirection, 'name')
    )
  }

  const handleUploadFile = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (event: any) => {
      const file = event.target.files[0]
      if (!file) return
      if (file.size > 5 * 1024 * 1024) {
        setJsonValue('Only file size less than 5MB is supported!')
        setYamlValue('')
        return
      }
      const reader = new FileReader()
      setYamlValue('')
      reader.onload = () => {
        const text = reader.result
        setJsonValue(text as string)
      }
      reader.onerror = e => {
        setJsonValue(`Error: ${e}`)
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const handleSortMethodChange = (value: 'key-name' | 'key-value') => {
    setSortMethod(value)
    const sortedString = sortJson(jsonValue, value, sortDirection, keyNameValue)
    setYamlValue(sortedString)
  }

  const handleSortDirectionChange = (value: 'asc' | 'desc') => {
    setSortDirection(value)
    const sortedString = sortJson(jsonValue, sortMethod, value, keyNameValue)
    setYamlValue(sortedString)
  }

  const handleKeyNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyNameValue(event.target.value)
    const sortedString = sortJson(jsonValue, sortMethod, sortDirection, event.target.value)
    setYamlValue(sortedString)
  }

  return (
    <div className="flex flex-col w-full h-full gap-4 2xl:flex-row">
      {/* Input */}
      <div className="flex flex-col flex-1 gap-4 max-h-[50%] 2xl:max-h-none">
        <div className="flex flex-row flex-wrap items-center gap-4">
          <div className="font-medium">JSON</div>
          <ButtonUpload onClick={handleUploadFile} />
          <ButtonClipboard handleClipText={handleClipboardClicked} />
          <ButtonSample onClick={handleSampleClicked} />
          <ButtonClear onClick={handleClearClicked} disabled={!jsonValue} />
        </div>
        <div className="flex-1 min-h-0">
          <CodeMirror
            value={jsonValue}
            height="100%"
            extensions={[json()]}
            onChange={handleOnChangeInput}
            className="db-scrollbar db-code-mirror"
            theme={theme === 'dark' ? 'dark' : 'light'}
          />
        </div>
      </div>

      {/* Output */}
      <div className="flex flex-col flex-1 gap-4 max-h-[50%] 2xl:max-h-none">
        <div className="flex flex-row flex-wrap items-center gap-4">
          <div className="font-medium">YAML</div>
          <ButtonCopy text={yamlValue} />
          <Select
            defaultValue={defaultSortDirection}
            onValueChange={handleSortDirectionChange}
            name="sort-direciton-selection"
          >
            <SelectTrigger className="h-8 w-[80px]">
              <SelectValue placeholder="Select a sort direction" />
            </SelectTrigger>
            <SelectContent>
              {sortDirections.map(({ value, name }) => (
                <SelectItem key={value} value={value}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            defaultValue={defaultSortMethod}
            onValueChange={handleSortMethodChange}
            name="sort-method-selection"
          >
            <SelectTrigger className="h-8 w-fit">
              <SelectValue placeholder="Select a sort method" />
            </SelectTrigger>
            <SelectContent>
              {sortMethods.map(({ value, name }) => (
                <SelectItem key={value} value={value}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {sortMethod === 'key-value' && (
            <Input
              ref={inputKeyNameRef}
              value={keyNameValue}
              onChange={handleKeyNameChanged}
              type="text"
              placeholder="Key name"
              className={cn('w-40 h-8')}
            />
          )}
        </div>
        <div className="flex-1 min-h-0">
          <CodeMirror
            value={yamlValue}
            height="100%"
            extensions={[json()]}
            onChange={handleOnChangeOutput}
            className="db-scrollbar db-code-mirror"
            theme={theme === 'dark' ? 'dark' : 'light'}
          />
        </div>
      </div>
    </div>
  )
}

function sortJson(
  jsonString: string,
  sortMethod: 'key-name' | 'key-value',
  sortDirection: 'asc' | 'desc',
  keyName: string
): string {
  if (!jsonString) return ''

  try {
    JSON.parse(jsonString)
  } catch (e) {
    return 'Invalid JSON!'
  }

  const jsonArr = JSON.parse(jsonString)

  if (!Array.isArray(jsonArr)) return 'You have to input an array of objects!'

  if (!keyName) return 'Missing key name!'

  if (!uniq(flattenDeep(jsonArr.map(item => Object.keys(item))))?.includes(keyName)) {
    return 'Invalid key name!'
  }

  try {
    if (sortMethod === 'key-value') {
      const sorted = sortBy(jsonArr, [
        function (o) {
          return o[keyName]
        }
      ])
      if (sortDirection === 'desc') return JSON.stringify(sorted.reverse(), null, 2)
      return JSON.stringify(sorted, null, 2)
    } else {
      const sortObjectKeys = (obj: any) => {
        const keys = Object.keys(obj)
        keys.sort()
        if (sortDirection === 'desc') keys.reverse()
        const sortedObj = {} as any
        keys.forEach(key => {
          sortedObj[key] = obj[key];
        });
        return sortedObj;
      };
      const sorted = jsonArr.map(obj => sortObjectKeys(obj));
      return JSON.stringify(sorted, null, 2)
    }
  } catch (e) {
    return 'There is an error when sorting!'
  }

  return ''
}
