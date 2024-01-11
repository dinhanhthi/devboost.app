'use client'

import { json } from '@codemirror/lang-json'
import CodeMirror from '@uiw/react-codemirror'
import Papa from 'papaparse'

import { useTheme } from 'next-themes'
import { useCallback, useState } from 'react'
import { Button } from '../../components/ui/Button'
import ButtonClear from '../../components/ui/ButtonClear'
import ButtonClipboard from '../../components/ui/ButtonClipboard'
import ButtonCopy from '../../components/ui/ButtonCopy'
import ButtonDownload from '../../components/ui/ButtonDownload'
import ButtonSample from '../../components/ui/ButtonSample'
import ButtonUpload from '../../components/ui/ButtonUpload'
import { Checkbox } from '../../components/ui/Checkbox'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/Popover'
import IoFilter from '../../icons/IoFilter'

const sampleJson = [
  {
    'Column 1': '1-1',
    'Column 2': '1-2',
    'Column 3': '1-3',
    'Column 4': '1-4'
  },
  {
    'Column 1': '2-1',
    'Column 2': '2-2',
    'Column 3': '2-3',
    'Column 4': '2-4'
  },
  {
    'Column 1': '3-1',
    'Column 2': '3-2',
    'Column 3': '3-3',
    'Column 4': '3-4'
  },
  {
    'Column 1': 4,
    'Column 2': 5,
    'Column 3': 6,
    'Column 4': 7
  }
]

export default function JsonCsv() {
  const { theme } = useTheme()
  const [configs, setConfigs] = useState({
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true
  })
  const [jsonValue, setJsonValue] = useState(JSON.stringify(sampleJson, null, 2))
  const [csvValue, setCsvValue] = useState(json2csv(sampleJson, configs))

  const handleHeaderRowsChange = (checked: boolean) => {
    setConfigs({ ...configs, header: checked })
    setJsonValue(JSON.stringify(csv2json(csvValue, { ...configs, header: checked }), null, 2))
  }

  const handleSkipEmptyLinesChange = (checked: boolean) => {
    setConfigs({ ...configs, skipEmptyLines: checked })
    setJsonValue(
      JSON.stringify(csv2json(csvValue, { ...configs, skipEmptyLines: checked }), null, 2)
    )
  }

  const handleDynamicTypingChange = (checked: boolean) => {
    setConfigs({ ...configs, dynamicTyping: checked })
    setJsonValue(
      JSON.stringify(csv2json(csvValue, { ...configs, dynamicTyping: checked }), null, 2)
    )
  }

  const handleOnChangeJson = useCallback((val: string, _viewUpdate: any) => {
    setJsonValue(val)
    if (!val) {
      setCsvValue('')
      return
    }
    try {
      setCsvValue(json2csv(JSON.parse(val), configs))
    } catch (error) {
      setCsvValue('Invalid JSON format!')
    }
  }, [])

  const handleOnChangeCsv = useCallback((val: string, _viewUpdate: any) => {
    setCsvValue(val)
    if (!val) {
      setJsonValue('')
      return
    }
    try {
      const jsonString = JSON.stringify(csv2json(val, configs), null, 2)
      JSON.parse(jsonString)
      setJsonValue(jsonString)
    } catch (error) {
      setJsonValue('Invalid CSV format!')
    }
  }, [])

  const handleClearClicked = () => {
    setJsonValue('')
    setCsvValue('')
  }

  const handleClipboardJsonClicked = (text: string) => {
    setJsonValue(text)
    try {
      setCsvValue(json2csv(JSON.parse(text), configs))
    } catch (error) {
      setCsvValue('Invalid JSON format!')
    }
  }

  const handleClipboardCsvClicked = (text: string) => {
    setCsvValue(text)
    setJsonValue(JSON.stringify(csv2json(text, configs), null, 2))
  }

  const handleSampleClicked = () => {
    setJsonValue(JSON.stringify(sampleJson, null, 2))
    setCsvValue(json2csv(sampleJson, configs))
  }

  const handleJsonUploadFile = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (event: any) => {
      const file = event.target.files[0]
      if (!file) return
      if (file.size > 5 * 1024 * 1024) {
        setJsonValue('Only file size less than 5MB is supported!')
        setCsvValue('')
        return
      }
      const reader = new FileReader()
      setCsvValue('')
      reader.onload = () => {
        const text = reader.result
        setJsonValue(text as string)
        setCsvValue(json2csv(JSON.parse(text as string), configs))
      }
      reader.onerror = e => {
        setJsonValue(`Error: ${e}`)
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const handleCsvUploadFile = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.csv'
    input.onchange = (event: any) => {
      const file = event.target.files[0]
      if (!file) return
      if (file.size > 5 * 1024 * 1024) {
        setJsonValue('Only file size less than 5MB is supported!')
        setCsvValue('')
        return
      }
      const reader = new FileReader()
      setCsvValue('')
      reader.onload = () => {
        const text = reader.result
        setCsvValue(text as string)
        setJsonValue(JSON.stringify(csv2json(text as string, configs), null, 2))
      }
      reader.onerror = e => {
        setJsonValue(`Error: ${e}`)
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const handleDownloadJsonClicked = () => {
    const blob = new Blob([jsonValue], { type: 'text/json;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = 'file_generated_by_DevBoost.app.json'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleDownloadCsvClicked = () => {
    const blob = new Blob([csvValue], { type: 'text/csv;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = 'file_generated_by_DevBoost.app.csv'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col w-full h-full gap-4 2xl:flex-row">
      {/* JSON */}
      <div className="flex flex-col flex-1 gap-4 max-h-[50%] 2xl:max-h-none">
        <div className="flex flex-row flex-wrap items-center gap-2">
          <div className="font-medium">JSON</div>
          <ButtonUpload onClick={handleJsonUploadFile} />
          <ButtonClipboard handleClipText={handleClipboardJsonClicked} />
          <ButtonSample onClick={handleSampleClicked} />
          <ButtonClear onClick={handleClearClicked} disabled={!jsonValue} />
          <ButtonCopy text={jsonValue} />
          <ButtonDownload onClick={handleDownloadJsonClicked} disabled={!jsonValue} />
          {/* More settings */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="flex items-center gap-1.5" variant="outline">
                More settings
                <IoFilter className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-4 divide-y" align="start">
              <div className="flex flex-col gap-4 text-sm">
                {/* Header rows */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    checked={configs.header}
                    id="header-rows"
                    onCheckedChange={handleHeaderRowsChange}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="header-rows"
                      className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Header rows
                    </label>
                    <div className="text-xs italic opacity-80">
                      Keys data by field name rather than an array.
                    </div>
                  </div>
                </div>
                {/* Skip empty lines */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    checked={configs.skipEmptyLines}
                    id="skip-empty-lines"
                    onCheckedChange={handleSkipEmptyLinesChange}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="skip-empty-lines"
                      className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Skip empty lines
                    </label>
                  </div>
                </div>
                {/* Dynamic typing */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    checked={configs.dynamicTyping}
                    id="dynamic-typing"
                    onCheckedChange={handleDynamicTypingChange}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="dynamic-typing"
                      className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Dynamic typing
                    </label>
                    <div className="text-xs italic opacity-80">
                      Turns numeric data into numbers and true/false into booleans.
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex-1 min-h-0">
          <CodeMirror
            value={jsonValue}
            height="100%"
            extensions={[json()]}
            onChange={handleOnChangeJson}
            className="db-scrollbar db-code-mirror"
            theme={theme === 'dark' ? 'dark' : 'light'}
          />
        </div>
      </div>

      {/* CSV */}
      <div className="flex flex-col flex-1 gap-4 max-h-[50%] 2xl:max-h-none">
        <div className="flex flex-row flex-wrap items-center gap-2">
          <div className="font-medium">CSV</div>
          <ButtonUpload onClick={handleCsvUploadFile} />
          <ButtonClipboard handleClipText={handleClipboardCsvClicked} />
          <ButtonSample onClick={handleSampleClicked} />
          <ButtonClear onClick={handleClearClicked} disabled={!csvValue} />
          <ButtonCopy text={csvValue} />
          <ButtonDownload onClick={handleDownloadCsvClicked} disabled={!csvValue} />
        </div>
        <div className="flex-1 min-h-0">
          <CodeMirror
            value={csvValue}
            height="100%"
            extensions={[json()]}
            onChange={handleOnChangeCsv}
            className="db-scrollbar db-code-mirror"
            theme={theme === 'dark' ? 'dark' : 'light'}
          />
        </div>
      </div>
    </div>
  )
}

function json2csv(json: any, configs?: any) {
  const csv = Papa.unparse(json, {
    header: configs?.header ?? true,
    skipEmptyLines: configs?.skipEmptyLines ?? true
  })
  return csv
}

function csv2json(csv: any, configs?: any) {
  const json = Papa.parse(csv, {
    header: configs?.header ?? true,
    skipEmptyLines: configs?.skipEmptyLines ?? true,
    dynamicTyping: configs?.dynamicTyping ?? true
  })
  return json.data
}
