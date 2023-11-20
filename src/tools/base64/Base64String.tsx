'use client'

import cn from 'classnames'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import Tabs from '../../components/Tabs'
import Base64StringDecoder from './Base64StringDecoder'
import Base64StringEncoder from './Base64StringEncoder'

export default function Base64String() {
  const tabs = [
    { key: 'encoder', label: 'Base64 String Encoder' },
    { key: 'decoder', label: 'Base64 String Decoder' }
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
      <Tabs width={450} tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div
        className={cn(
          'min-h-0 w-full flex-1 overflow-hidden rounded-xl border border-border bg-dark p-4'
        )}
      >
        {selectedTab === 'encoder' && <Base64StringEncoder />}
        {selectedTab === 'decoder' && <Base64StringDecoder />}
      </div>
    </div>
  )
}
