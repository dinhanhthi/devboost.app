'use client'

import cn from 'classnames'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import MoonStarIcon from '../icons/MoonStarIcon'
import SunIcon from '../icons/SunIcon'

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
    <button
      className={cn(
        props.className,
        'flex items-center justify-center text-xl group text-slate-600 dark:text-tlight p-2 db-button-hover'
      )}
      onClick={handleThemeToggle}
    >
      {theme === 'light' && (
        <MoonStarIcon className="group-hover:dark:text-amber-300 group-hover:text-black db-button-active shrink-0" />
      )}
      {theme !== 'light' && (
        <SunIcon className="transition-transform group-hover:dark:text-amber-300 group-active:scale-90" />
      )}
    </button>
  )
}
