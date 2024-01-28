'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import MoonStarIcon from '../icons/MoonStarIcon'
import SunIcon from '../icons/SunIcon'
import SimpleTooltip from './SimpleTooltip'
import { Button } from './ui/Button'

type ToggleThemeProps = {
  className?: string
}

export default function ToggleTheme(props: ToggleThemeProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
    document.documentElement.classList.toggle('dark')
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className={props.className}>
      <SimpleTooltip text={theme === 'light' ? 'Enable Dark Theme' : 'Enable Light Theme'}>
        <Button variant="ghost" size="icon" onClick={handleThemeToggle}>
          {theme === 'light' && <MoonStarIcon className="w-5 h-5" />}
          {theme !== 'light' && <SunIcon className="w-5 h-5" />}
        </Button>
      </SimpleTooltip>
    </div>
  )
}
