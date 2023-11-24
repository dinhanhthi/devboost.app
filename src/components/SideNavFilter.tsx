'use client'

import { offset, useFloating } from '@floating-ui/react-dom'
import { Transition } from '@headlessui/react'
import cn from 'classnames'
import { Fragment, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import IoFilter from '../icons/IoFilter'

export default function SideNavFilter() {
  const [hydrated, setHydrated] = useState(false)
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const { refs, floatingStyles } = useFloating({
    placement: 'bottom',
    middleware: [offset(10)]
  })

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    return null
  }

  function toggleShowFilterPanel() {
    setShowFilterPanel(!showFilterPanel)
  }

  return (
    <>
      <button
        ref={refs.setReference}
        onClick={toggleShowFilterPanel}
        className={cn(
          'relative w-8 h-8 text-slate-600 dark:text-tdark hover:dark:text-white hover:text-slate-900 db-button-hover p-1.5 group',
          { '!text-sky-600': showFilterPanel }
        )}
      >
        <IoFilter className="text-lg db-button-active" />
      </button>
      {typeof window === 'object' &&
        createPortal(
          <div
            className="absolute left-0 z-50"
            ref={refs.setFloating}
            style={{ ...floatingStyles }}
          >
            <Transition
              show={showFilterPanel}
              as={Fragment}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="w-40 h-32 bg-white rounded-lg db-around-border"></div>
            </Transition>
          </div>,
          document.body
        )}
    </>
  )
}
