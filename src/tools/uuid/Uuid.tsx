'use client'

import { useSearchParams } from 'next/navigation'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs'
import UuidDecoder from './UuidDecoder'
import UuidFormater from './UuidFormater'
import UuidGenerator from './UuidGenerator'
import UuidValidator from './UuidValidator'

export default function Uuid() {
  const tabs = [
    { key: 'generator', label: 'Generator', component: <UuidGenerator /> },
    { key: 'decoder', label: 'Decoder', component: <UuidDecoder /> },
    { key: 'formater', label: 'Formater', component: <UuidFormater /> },
    { key: 'validator', label: 'Validator', component: <UuidValidator /> }
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
