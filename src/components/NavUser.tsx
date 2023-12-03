'use client'

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import AiOutlineLoading3Quarters from '../icons/AiOutlineLoading3Quarters'
import UserCircleIcon from '../icons/UserCircleIcon'
import { Button } from './ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/DropdownMenu'
import AiFillGithub from '../icons/AiFillGithub'

export function NavUser() {
  const { data: session, status } = useSession()
  const popupCenter = (url: string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX
    const dualScreenTop = window.screenTop ?? window.screenY
    const width = Math.min((window.innerWidth * 2) / 3, 600)
    const height = Math.min((window.innerHeight * 2) / 3, 600)
    const top = dualScreenTop + height / 2
    const left = dualScreenLeft + width / 2
    const newWindowFeatures = `width=${width},height=${height},top=${top},left=${left}`
    const newWindow = window.open(url, '_blank', newWindowFeatures)
    newWindow?.focus()
  }

  return (
    <div className='flex items-center justify-center ml-2'>
      {status === 'loading' && (
        <Button disabled={true} size="icon" variant="ghost" className="w-6 h-6 rounded-full">
          <div className="animate-spin">
            <AiOutlineLoading3Quarters className="w-6 h-6" />
          </div>
        </Button>
      )}
      {status === 'unauthenticated' && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="w-6 h-6">
              <UserCircleIcon className="w-full h-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => popupCenter('/github-login')}>
                <AiFillGithub className="h-4 w-6 mr-1.5" />
                Sign in with Github
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {status === 'authenticated' && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {session?.user?.image && (
              <Button size="icon" variant="ghost" className="relative w-6 h-6 rounded-full shrink-0">
                <Image
                  src={session.user.image}
                  alt={session.user?.name || 'User Avatar'}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              </Button>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{session?.user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
