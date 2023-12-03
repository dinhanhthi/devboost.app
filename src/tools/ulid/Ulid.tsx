'use client'

import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs'

const UlidGenerator = dynamic(() => import('./UlidGenerator'), { ssr: false })
const UlidTimeDecoder = dynamic(() => import('./UlidTimeDecoder'), { ssr: false })
const UlidValidator = dynamic(() => import('./UlidValidator'), { ssr: false })

export default function Ulid() {
  const tabs = [
    { key: 'generator', label: 'Generator', component: <UlidGenerator /> },
    { key: 'time-decoder', label: 'Time Decoder', component: <UlidTimeDecoder /> },
    { key: 'validator', label: 'Validator', component: <UlidValidator /> }
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
      <Tabs defaultValue={initTab} className="flex flex-col gap-2">
        <TabsList className='w-fit'>
          {tabs.map(tab => (
            <TabsTrigger key={tab.key} value={tab.key}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map(tab => (
          <TabsContent key={tab.key} value={tab.key}>
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
