import cn from 'classnames'

import FiSearch from '../icons/FiSearch'
import IoFilter from '../icons/IoFilter'
import { TOOLS, allToolItem } from '../tools/toolList'
import SideNavItem from './SideNavItem'

type SideNavProps = {
  className?: string
}

export default function SideNav(props: SideNavProps) {
  const { className } = props

  return (
    <div className={cn(className)}>
      <div className={cn('flex h-full w-full flex-col')}>
        {/* Search */}
        <div className="pb-4">
          <div
            className={cn(
              'flex items-center gap-1 rounded-r-lg border border-border bg-darkest px-2.5 py-1'
            )}
          >
            <div className={cn('grid place-items-center text-slate-400')}>
              <FiSearch className="text-lg" />
            </div>
            <input
              className={cn(
                'db-input peer h-full w-full text-ellipsis !border-none bg-transparent text-sm'
              )}
              id="search"
              type="search"
              placeholder={'type to search tools...'}
              autoComplete="off"
            />
            <button className="w-6 text-tdark hover:text-white">
              <IoFilter className="w-full h-5 text-lg" />
            </button>
          </div>
        </div>

        {/* Main */}
        <div
          className={cn(
            'flex w-full flex-1 flex-col overflow-hidden rounded-r-xl border-[0.5px] border-l-0 border-border bg-dark'
          )}
        >
          {/* Tools */}
          <div className={cn('flex min-h-0 flex-1 flex-col')}>
            <div className="py-2 pr-2 border-b border-border">
              <SideNavItem
                uri="/"
                titleClassName="text-base"
                tool={allToolItem}
                rightElement={
                  <div
                    className={cn(
                      'rounded-lg border border-border bg-slate-700 px-2 py-1 text-xs text-tnormal'
                    )}
                  >
                    {TOOLS.length}
                  </div>
                }
              />
            </div>

            <div className="flex flex-col flex-1 min-h-0 py-2 pr-2 overflow-auto db-scrollbar">
              {TOOLS.map(tool => (
                <SideNavItem key={tool.slug} tool={tool} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
