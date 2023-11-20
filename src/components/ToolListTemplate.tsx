import cn from 'classnames'
import { TOOLS } from '../tools/toolList'
import ToolCard from './ToolCard'

export default function ToolListTemplate() {
  return (
    <div
      className={cn(
        't4d-scrollbar h-full px-2 py-1 gap-4 overflow-auto auto-rows-min grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
      )}
    >
      {TOOLS.map(tool => (
        <ToolCard tool={tool} key={tool.slug} />
      ))}
    </div>
  )
}
