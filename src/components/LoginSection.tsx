'use client'

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AiFillGithub from '../icons/AiFillGithub'
import AiOutlineLoading3Quarters from '../icons/AiOutlineLoading3Quarters'
import UserCircleIcon from '../icons/UserCircleIcon'
import Button from './Button'
import Modal from './Modal'

export default function LoginSection() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession()

  const popupCenter = (url: string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;
    const width = Math.min(window.innerWidth * 2 / 3, 600);
    const height = Math.min(window.innerHeight * 2 / 3, 600);
    const top = dualScreenTop + height / 2;
    const left = dualScreenLeft + width / 2;
    const newWindowFeatures = `width=${width},height=${height},top=${top},left=${left}`;
    const newWindow = window.open(
      url,
      '_blank',
      newWindowFeatures
    )
    newWindow?.focus()
  }

  useEffect(() => {
    if (session) setIsOpen(false)
  }, [session, status])

  return (
    <>
      {status == 'unauthenticated' && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-row items-center gap-1 px-3 py-2 text-sm text-slate-800 dark:text-tnormal dark:hover:text-white hover:text-slate-900 h-fit db-button-hover group"
        >
          Login / Register
          <UserCircleIcon className="w-6 h-6 db-button-active" />
        </button>
      )}
      {status === 'authenticated' && (
        <button
          onClick={() => signOut()}
          className="flex flex-row items-center h-10 gap-3 px-3 py-2 text-sm text-slate-700 dark:text-tnormal dark:hover:text-white hover:text-slate-900 db-button-hover group"
        >
          Logout
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt={session.user?.name || 'User Avatar'}
              width={24}
              height={24}
              className="rounded-full"
            />
          )}
        </button>
      )}
      {status === 'loading' && (
        <div className="flex flex-row items-center w-10 h-10 p-2 text-slate-800 dark:text-tnormal">
          <div className="animate-spin">
            <AiOutlineLoading3Quarters className="w-6 h-6" />
          </div>
        </div>
      )}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} panelClassName="w-fit h-fit">
          <div className="flex flex-col items-stretch justify-center w-full h-full gap-12 p-8">
            <div className="flex flex-col items-center justify-center gap-2">
              <h2 className="text-3xl font-semibold">🥳 Welcome back!</h2>
              <p className="text-base italic">More tools when you login.</p>
            </div>
            <Button
              onClick={() => popupCenter('/github-login')}
              className="h-12 px-6 mx-auto text-lg font-semibold text-white hover:text-white group w-fit bg-darker hover:bg-light rounded-3xl"
            >
              <AiFillGithub className="text-3xl db-button-active" />
              Sign in with Github
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}
