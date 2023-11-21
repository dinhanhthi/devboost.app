'use client'

import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// import { promises as fs } from 'fs'
// import path from 'path'

import { useState } from 'react'
import packageInfo from '../../package.json'
import Logo from '../../public/logo.svg'
import { kanit } from '../app/fonts'
import { DocumentHelpIcon } from '../icons/DocumentHelpIcon'
import UserCircleIcon from '../icons/UserCircleIcon'
import { Tool } from '../interface'
import { ListPageDocs, SETTINGS } from '../libs/config'
import { TOOLS, allToolItem } from '../tools/toolList'
import SideOverDoc from './SideOverDoc'

type HeaderProps = {
  className?: string
}

export default function Header(props: HeaderProps) {
  const [openSideDoc, setOpenSideDoc] = useState(false)
  const [uuidDoc, setUuidDoc] = useState<string | undefined>(undefined)
  const { className } = props
  const pathname = usePathname()
  const toolSlug = pathname.split('/tool/')[1]?.replace(/\/+$/, '')
  const unknownTool: Tool = { name: '404', slug: '/' }
  const tool =
    pathname === '/'
      ? allToolItem
      : TOOLS.find(tool => tool.slug === toolSlug) ||
        ListPageDocs.find(page => page.slug === pathname.replace(/^\/+|\/+$/g, '')) ||
        unknownTool

  const handleOpenSideOverClicked = async () => {
    setOpenSideDoc(true)
    if (!tool.docFile) return
    await fetch(`/docs/tools/${tool.docFile}`)
      .then(res => res.text())
      .then(text => {
        setUuidDoc(text)
      })
  }

  return (
    <>
      <SideOverDoc tool={tool} setOpen={setOpenSideDoc} open={openSideDoc} docContent={uuidDoc} />
      <div className={cn('flex flex-row justify-between px-4 py-6')}>
        {/* Logo */}
        <Link href={'/'} className="flex items-center gap-2">
          <Image src={Logo} alt="DevBoost Logo" width={30} height={30} />
          <h1 className={cn('text-2xl text-white', kanit.className)}>{SETTINGS.siteName}</h1>
          <div
            className={cn(
              'monospace rounded-md border border-border bg-dark px-2 py-0.5 text-xs text-tnormal'
            )}
          >
            v{packageInfo.version}
          </div>
        </Link>

        <div className={cn('flex flex-row gap-2 items-center justify-center')}>
          {/* Title */}
          <div className="">
            <h1
              className={cn(
                'mx-auto flex h-8 w-fit flex-row items-center justify-center gap-2 overflow-hidden rounded-lg border border-border bg-dark text-lg',
                className
              )}
            >
              {!!tool.iconEl && (
                <div
                  className={cn('flex h-full items-center justify-center bg-darker p-2 text-white')}
                >
                  {tool.iconEl}
                </div>
              )}
              <div
                className={cn(
                  'flex items-center gap-2 px-3 tracking-widest text-thighlight',
                  kanit.className
                )}
              >
                {tool.name}
              </div>
            </h1>
          </div>
          {(tool.docFile || tool.description) && (
            <button className="group" onClick={handleOpenSideOverClicked}>
              <DocumentHelpIcon className="w-6 h-6 text-tdark group-hover:text-white" />
            </button>
          )}
        </div>

        {/* Login/Register */}
        <Link
          href={'/'}
          className={cn('flex flex-row items-center gap-1 text-sm text-tnormal hover:text-white')}
        >
          Login / Register
          <UserCircleIcon className="w-6 h-6" />
        </Link>
      </div>
    </>
  )
}
