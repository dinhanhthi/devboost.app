'use client'

import { cn } from '@/lib/utils'

import { useEffect, useState } from 'react'
import { Configs, Tool } from '../../../../interface'
import { DEFAULT_C0NFIGS } from '../../../../lib/config'
import Base64Image from '../../../../tools/base64/Base64Image'
import Base64String from '../../../../tools/base64/Base64String'
import JsonSorter from '../../../../tools/json/JsonSorter'
import Jwt from '../../../../tools/jwt/Jwt'
import NanoIdGenerator from '../../../../tools/nano-id/NanoIdGenerator'
import ObjectIdComponent from '../../../../tools/object-id/ObjectIdComponent'
import OpenAiKeyValidator from '../../../../tools/openai/OpenAiKeyValidator'
import Ulid from '../../../../tools/ulid/Ulid'
import Uuid from '../../../../tools/uuid/Uuid'
import JsonYaml from '../../../../tools/json/JsonYaml'

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
      <div className="flex flex-col flex-1 min-h-0">{getToolComponent(tool.slug)}</div>
    </div>
  )
}

function getToolComponent(slug: string) {
  switch (slug) {
    case 'openai-key-validator':
      return <OpenAiKeyValidator />

    case 'uuid-generator-decoder':
      return <Uuid />

    case 'ulid-generator':
      return <Ulid />

    case 'nano-id-generator':
      return <NanoIdGenerator />

    case 'base64-string':
      return <Base64String />

    case 'base64-image':
      return <Base64Image />

    case 'jwt-encoder-decoder':
      return <Jwt />

    case 'objectid-generator':
      return <ObjectIdComponent />

    case 'json-sorter':
      return <JsonSorter />

    case 'json-yaml':
      return <JsonYaml />

    default:
      return null
  }
}
