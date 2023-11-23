import { TOOLS } from '../tools/toolList'
import ToolCard from './ToolCard'

export default function ToolListTemplate() {
  return (
    <div className="grid h-full grid-flow-row-dense grid-cols-1 gap-4 px-2 py-1 overflow-auto db-scrollbar auto-rows-min sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {TOOLS.map(tool => (
        <ToolCard tool={tool} key={tool.slug} />
      ))}
    </div>
  )
}
