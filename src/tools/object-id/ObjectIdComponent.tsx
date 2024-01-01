'use client'

import { useSearchParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs'
import dynamic from 'next/dynamic'

const ObjectIdGenerator = dynamic(() => import('./ObjectIdGenerator'), { ssr: false })
const ObjectIdTimestampConverter = dynamic(() => import('./ObjectIdTimestampConverter'), { ssr: false })

export default function ObjectIdComponent() {
  const tabs = [
    { key: 'generator', label: 'Generator', component: <ObjectIdGenerator /> },
    {
      key: 'timestamp-converter',
      label: 'Timestamp Converter',
      component: <ObjectIdTimestampConverter />
    }
  ]

  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  let initTab
  if (!tab || !tabs.find(option => option.key === tab)) {
    initTab = tabs[0].key
  } else {
    initTab = tabs.find(option => option.key === tab)?.key
  }

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <Tabs defaultValue={initTab} className="flex flex-col h-full gap-2">
        <TabsList className="w-fit">
          {tabs.map(tab => (
            <TabsTrigger key={tab.key} value={tab.key}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map(tab => (
          <TabsContent className="flex-1 min-h-0" key={tab.key} value={tab.key}>
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
