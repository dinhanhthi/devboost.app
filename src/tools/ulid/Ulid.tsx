'use client'

import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import MainContainer from '../../components/MainContainer'
import Tabs from '../../components/Tabs'

const UlidGenerator = dynamic(() => import('./UlidGenerator'), { ssr: false })
const UlidTimeDecoder = dynamic(() => import('./UlidTimeDecoder'), { ssr: false })
const UlidValidator = dynamic(() => import('./UlidValidator'), { ssr: false })

export default function Ulid() {
  const tabs = [
    { key: 'generator', label: 'Generator' },
    { key: 'time-decoder', label: 'Time Decoder' },
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
      <Tabs tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} width={420} />
      <MainContainer>
        {selectedTab === 'generator' && <UlidGenerator />}
        {selectedTab === 'time-decoder' && <UlidTimeDecoder />}
        {selectedTab === 'validator' && <UlidValidator />}
      </MainContainer>
    </div>
  )
}
