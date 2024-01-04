'use client'

import { json } from '@codemirror/lang-json'
import CodeMirror from '@uiw/react-codemirror'
import { parse, stringify } from 'yaml'

import { useTheme } from 'next-themes'
import { useCallback, useState } from 'react'
import ButtonClear from '../../components/ui/ButtonClear'
import ButtonClipboard from '../../components/ui/ButtonClipboard'
import ButtonCopy from '../../components/ui/ButtonCopy'
import ButtonDownload from '../../components/ui/ButtonDownload'
import ButtonSample from '../../components/ui/ButtonSample'
import ButtonUpload from '../../components/ui/ButtonUpload'

const sampleJson = {
  version: '1.0.0',
  dependencies: {
    yaml: '^1.10.0'
  },
  package: {
    exclude: ['.idea/**', '.gitignore']
  }
}

export default function JsonYaml() {
  const { theme } = useTheme()
  const [jsonValue, setJsonValue] = useState(JSON.stringify(sampleJson, null, 2))
  const [yamlValue, setYamlValue] = useState(stringify(sampleJson))

  const handleOnChangeInput = useCallback((val: string, _viewUpdate: any) => {
    setJsonValue(val)
    if (!val) {
      setYamlValue('')
      return
    }
    try {
      setYamlValue(stringify(JSON.parse(val)))
    } catch (error) {
      setYamlValue('Invalid JSON format!')
    }
  }, [])

  const handleOnChangeOutput = useCallback((val: string, _viewUpdate: any) => {
    setYamlValue(val)
    if (!val) {
      setJsonValue('')
      return
    }
    try {
      const jsonString = JSON.stringify(parse(val), null, 2)
      JSON.parse(jsonString)
      setJsonValue(jsonString)
    } catch (error) {
      setJsonValue('Invalid YAML format!')
    }
  }, [])

  const handleClearClicked = () => {
    setJsonValue('')
    setYamlValue('')
  }

  const handleClipboardJsonClicked = (text: string) => {
    setJsonValue(text)
    try {
      setYamlValue(stringify(JSON.parse(text)))
    } catch (error) {
      setYamlValue('Invalid JSON format!')
    }
  }

  const handleClipboardYamlClicked = (text: string) => {
    setYamlValue(text)
    setJsonValue(JSON.stringify(parse(text), null, 2))
  }

  const handleSampleClicked = () => {
    setJsonValue(JSON.stringify(sampleJson, null, 2))
    setYamlValue(stringify(sampleJson))
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
        setYamlValue('')
        return
      }
      const reader = new FileReader()
      setYamlValue('')
      reader.onload = () => {
        const text = reader.result
        setJsonValue(text as string)
        setYamlValue(stringify(JSON.parse(text as string)))
      }
      reader.onerror = e => {
        setJsonValue(`Error: ${e}`)
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const handleYamlUploadFile = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.yaml, .yml'
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
        setYamlValue(text as string)
        setJsonValue(JSON.stringify(parse(text as string), null, 2))
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

  const handleDownloadYamlClicked = () => {
    const blob = new Blob([yamlValue], { type: 'text/yaml;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = 'file_generated_by_DevBoost.app.yaml'
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

      {/* YAML */}
      <div className="flex flex-col flex-1 gap-4 max-h-[50%] 2xl:max-h-none">
        <div className="flex flex-row flex-wrap items-center gap-2">
          <div className="font-medium">YAML</div>
          <ButtonUpload onClick={handleYamlUploadFile} />
          <ButtonClipboard handleClipText={handleClipboardYamlClicked} />
          <ButtonSample onClick={handleSampleClicked} />
          <ButtonClear onClick={handleClearClicked} disabled={!yamlValue} />
          <ButtonCopy text={yamlValue} />
          <ButtonDownload onClick={handleDownloadYamlClicked} disabled={!yamlValue} />
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
