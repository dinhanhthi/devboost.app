'use client'

import { DownloadIcon, UploadIcon } from '@radix-ui/react-icons'
import ConfigIcon from '../icons/ConfigIcon'
import { Configs } from '../interface'
import { CONFIG_KEYS, DEFAULT_C0NFIGS } from '../lib/config'
import SimpleTooltip from './SimpleTooltip'
import { Button } from './ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/DropdownMenu'

export default function NavConfig() {
  const handleDownloadConfigs = () => {
    const configs = {} as any
    for (const key of Object.keys(CONFIG_KEYS)) {
      const value: any = localStorage.getItem(key)
      if (value) {
        console.log(key, value)
        configs[key] = value
      } else {
        configs[key] = DEFAULT_C0NFIGS[key as keyof Configs]
      }
    }
    const configsJson = JSON.stringify(configs, null, 2)
    const blob = new Blob([configsJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'devboost-app-configs.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleUploadConfigs = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json'
    input.onchange = () => {
      const file = input.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.readAsText(file, 'UTF-8')
        reader.onload = readerEvent => {
          const configs = JSON.parse(readerEvent.target?.result as string)
          for (const key of Object.keys(CONFIG_KEYS)) {
            const value = configs[key]
            if (value) {
              localStorage.setItem(key, value)
            }
          }
          window.location.reload()
        }
      }
    }
    input.click()
  }

  return (
    <DropdownMenu>
      <SimpleTooltip text="Settings">
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <ConfigIcon className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
      </SimpleTooltip>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleDownloadConfigs()}>
          <DownloadIcon className="mr-1.5" /> Export configs
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleUploadConfigs()}>
          <UploadIcon className="mr-1.5" /> Import configs
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
