import cn from 'classnames'
import { usePathname, useRouter } from 'next/navigation'

type Tab = {
  key: string
  label: string
}

type TabsProps = {
  selectedTab?: string
  setSelectedTab: React.Dispatch<React.SetStateAction<string | undefined>>
  tabs: Tab[]
  className?: string
  width?: number
}

export default function Tabs(props: TabsProps) {
  const { tabs, className, selectedTab, setSelectedTab } = props

  const router = useRouter()
  const pathname = usePathname()

  return (
    <div
      className={cn(
        className,
        'relative flex overflow-hidden !rounded-3xl border db-around-border',
        {
          'w-fit': !props.width
        }
      )}
      style={{ width: props.width }}
    >
      {tabs.map(tab => (
        <button
          key={tab.key}
          type="button"
          className={cn(
            'z-20 flex flex-1 items-center justify-center gap-2 whitespace-nowrap px-6 py-3 text-sm dark:text-tdark hover:dark:text-white hover:text-black',
            {
              'dark:!text-white': selectedTab === tab.key
            }
          )}
          onClick={() => {
            setSelectedTab(tab.key)
            router.push(`${pathname}?tab=${tab.key}`, {
              scroll: false
            })
          }}
        >
          {tab.label}
        </button>
      ))}
      <div className="absolute flex items-center w-full h-full">
        <div
          className={cn('z-10 h-full p-1.5 transition-all duration-300')}
          style={generateStyle(tabs, selectedTab)}
        >
          <div className={cn('h-full w-full rounded-3xl dark:bg-light bg-gray-200')}></div>
        </div>
      </div>
    </div>
  )
}

function generateStyle(tabs: Tab[], selectedTab?: string) {
  const numTabs = tabs.length
  const selectedIndex = tabs.findIndex(tab => tab.key === selectedTab)
  const sliderWidth = 100 / numTabs
  return {
    width: `${sliderWidth}%`,
    transform: `translateX(${selectedIndex * 100}%)`
  }
}
