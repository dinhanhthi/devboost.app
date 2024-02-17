'use client'

import { cn } from '@/lib/utils'

import { useEffect, useState } from 'react'
import { Configs, Tool } from '../../../../interface'
import { DEFAULT_C0NFIGS } from '../../../../lib/config'
import Base64Image from '../../../../tools/base64/Base64Image'
import Base64String from '../../../../tools/base64/Base64String'
import JsonCsv from '../../../../tools/json/JsonCsv'
import JsonSorter from '../../../../tools/json/JsonSorter'
import JsonYaml from '../../../../tools/json/JsonYaml'
import Jwt from '../../../../tools/jwt/Jwt'
import LoremIpsumGenerator from '../../../../tools/lorem-ipsum/LoremIpsumGenerator'
import NanoIdGenerator from '../../../../tools/nano-id/NanoIdGenerator'
import ObjectIdComponent from '../../../../tools/object-id/ObjectIdComponent'
import OpenAiKeyValidator from '../../../../tools/openai/OpenAiKeyValidator'
import Ulid from '../../../../tools/ulid/Ulid'
import Uuid from '../../../../tools/uuid/Uuid'

type ToolPageTemplateProps = {
  className?: string
  tool: Tool
}

export default function ToolPageTemplate(props: ToolPageTemplateProps) {
  const { className, tool } = props

  // Remark: the hook useLocalStorage doesn't work for this case
  const [_usageFrequency, setUsageFrequency] = useState<Configs['usageFrequency']>(
    DEFAULT_C0NFIGS.usageFrequency
  )
  const increase = () => {
    setUsageFrequency(prev => {
      const newCount = (+prev[tool.slug] || 0) + 1
      const newItem = {
        ...prev,
        [tool.slug]: newCount
      }
      window.localStorage.setItem('usageFrequency', JSON.stringify(newItem))
      return newItem
    })
  }
  useEffect(() => {
    const newUsageFrequency = window.localStorage.getItem('usageFrequency')
    if (newUsageFrequency) setUsageFrequency(JSON.parse(newUsageFrequency))
  }, [])
  useEffect(() => {
    increase()
  }, [])

  return (
    <div className={cn(className, 'flex h-full w-full flex-col')}>
      <div className="flex flex-col flex-1 min-h-0 p-4">{getToolComponent(tool.slug)}</div>
      {tool.credit && (
        <div className="w-full px-4 py-2 text-xs italic border-t db-prose">
          External tools/libraries used to build this tool:{' '}
          {tool.credit.map((credit, index) => (
            <span key={credit.name}>
              <a href={credit.url} target="_blank" rel="noopener noreferrer">
                {credit.name}
              </a>
              {credit.version && <span> (v{credit.version})</span>}
              {index !== tool.credit!.length - 1 && ', '}
            </span>
          ))}
          .
        </div>
      )}
    </div>
  )
}

function getToolComponent(slug: string) {
  switch (slug) {
    case 'base64-image':
      return <Base64Image />

    case 'base64-string':
      return <Base64String />

    case 'json-csv':
      return <JsonCsv />

    case 'json-sorter':
      return <JsonSorter />

    case 'json-yaml':
      return <JsonYaml />

    case 'jwt-encoder-decoder':
      return <Jwt />

    case 'lorem-ipsum-generator':
      return <LoremIpsumGenerator />

    case 'nano-id-generator':
      return <NanoIdGenerator />

    case 'openai-key-validator':
      return <OpenAiKeyValidator />

    case 'objectid-generator':
      return <ObjectIdComponent />

    case 'ulid-generator':
      return <Ulid />

    case 'uuid-generator-decoder':
      return <Uuid />

    default:
      return null
  }
}
