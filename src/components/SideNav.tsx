import cn from 'classnames'

import FiSearch from '../icons/FiSearch'
import { TOOLS, allToolItem } from '../tools/toolList'
import SideNavFiler from './SideNavFilter'
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
              'flex items-center gap-1 rounded-r-lg !rounded-l-none db-around-border px-2.5 py-1'
            )}
          >
            <div className={cn('grid place-items-center text-slate-500 dark:text-slate-400')}>
              <FiSearch className="text-lg" />
            </div>
            <input
              className="db-input peer h-full w-full text-ellipsis !border-none bg-transparent dark:bg-transparent text-sm dark:text-slate-400 text-slate-800"
              id="search"
              type="search"
              placeholder={'type to search tools...'}
              autoComplete="off"
            />
            <SideNavFiler />
          </div>
        </div>

        {/* Main */}
        <div
          className={cn(
            'flex w-full flex-1 flex-col overflow-hidden rounded-r-xl db-around-border'
          )}
        >
          {/* Tools */}
          <div className={cn('flex min-h-0 flex-1 flex-col')}>
            <div className="py-2 pr-2 border-b dark:border-border border-slate-200">
              <SideNavItem
                uri="/"
                titleClassName="text-base"
                tool={allToolItem}
                hideFavorite={true}
                rightElement={
                  <div
                    className={cn(
                      'rounded-lg border dark:border-border border-slate-200 bg-gray-100 dark:bg-slate-700 px-2 py-1 text-xs dark:text-tnormal'
                    )}
                  >
                    {TOOLS.length}
                  </div>
                }
              />
            </div>

            <div className="flex flex-col flex-1 min-h-0 py-2 overflow-auto db-scrollbar">
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
