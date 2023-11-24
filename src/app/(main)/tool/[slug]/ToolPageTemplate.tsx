import cn from 'classnames'

import { Tool } from '../../../../interface'
import Base64String from '../../../../tools/base64/Base64String'
import NanoIdGenerator from '../../../../tools/nano-id/NanoIdGenerator'
import OpenAiKeyValidator from '../../../../tools/openai/OpenAiKeyValidator'
import Ulid from '../../../../tools/ulid/Ulid'
import Uuid from '../../../../tools/uuid/Uuid'

type ToolPageTemplateProps = {
  className?: string
  tool: Tool
}

export default function ToolPageTemplate(props: ToolPageTemplateProps) {
  const { className, tool } = props
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

    case 'base64-string-encode-decode':
      return <Base64String />

    default:
      return null
  }
}
