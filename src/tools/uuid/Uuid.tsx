'use client'

import cn from 'classnames'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import Tabs from '../../components/Tabs'
import UuidDecoder from './UuidDecoder'
import UuidFormater from './UuidFormater'
import UuidGenerator from './UuidGenerator'
import UuidValidator from './UuidValidator'

export default function Uuid() {
  const tabs = [
    { key: 'generator', label: 'Generator' },
    { key: 'decoder', label: 'Decoder' },
    { key: 'formater', label: 'Formater' },
    { key: 'validator', label: 'Validator' }
  ]
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  let initTab
  if (!tab || !tabs.find(option => option.key === tab)) {
    initTab = tabs[0].key
  } else {
    initTab = tabs.find(option => option.key === tab)?.key
  }
  const [selectedTab, setSelectedTab] = useState(initTab)

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <Tabs width={460} tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div
        className={cn(
          'min-h-0 w-full flex-1 overflow-hidden rounded-xl border border-border bg-dark p-4'
        )}
      >
        {selectedTab === 'generator' && <UuidGenerator />}
        {selectedTab === 'decoder' && <UuidDecoder />}
        {selectedTab === 'formater' && <UuidFormater />}
        {selectedTab === 'validator' && <UuidValidator />}
      </div>
    </div>
  )
}
