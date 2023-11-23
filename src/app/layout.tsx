import cn from 'classnames'
import { Metadata } from 'next'

import Image from 'next/image'
import Link from 'next/link'
import packageInfo from '../../package.json'
import Logo from '../../public/logo.svg'
import Footer from '../components/Footer'
import HeaderTitle from '../components/HeaderTitle'
import SideNav from '../components/SideNav'
import ToggleTheme from '../components/ToggleTheme'
import UserCircleIcon from '../icons/UserCircleIcon'
import { SETTINGS } from '../libs/config'
import { inter, kanit } from './fonts'
import Providers from './providers'
import './styles.scss'

export const metadata: Metadata = {
  title: 'DevBoost',
  description: 'Boost your dev with useful tools.',
  robots: {
    index: process.env.ENV_MODE !== 'prod' ? false : true,
    follow: process.env.ENV_MODE !== 'prod' ? false : true,
    nocache: process.env.ENV_MODE !== 'prod' ? true : false,
    googleBot: {
      index: process.env.ENV_MODE !== 'prod' ? false : true,
      follow: process.env.ENV_MODE !== 'prod' ? false : true,
      noimageindex: process.env.ENV_MODE !== 'prod' ? true : false
    }
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(inter.className)} suppressHydrationWarning>
      <body suppressHydrationWarning={true}>
        <Providers>
          <div
            className={cn(
              'flex h-screen max-h-screen flex-col text-slate-800 dark:text-tnormal bg-[#F5F5F4] dark:bg-darker'
            )}
          >
            <div className="h-[80px] shrink-0 w-full flex flex-row justify-between px-4">
              <div className="flex items-center gap-2">
                <Link href={'/'} className="flex items-center gap-2">
                  <Image src={Logo} alt="DevBoost Logo" width={30} height={30} />
                  <h1 className={cn('text-2xl', kanit.className)}>{SETTINGS.siteName}</h1>
                  <div className="monospace px-2 py-0.5 text-xs text-slate-800 dark:text-tnormal border-slate-300 shadow-sm db-around-border rounded-md">
                    v{packageInfo.version}
                  </div>
                </Link>

                <div className="w-[25px]">
                  <ToggleTheme className="w-full" />
                </div>
              </div>

              <HeaderTitle className="flex-1 h-full" />

              <Link
                href={'/'}
                className={cn(
                  'flex flex-row items-center gap-1 text-sm text-slate-800 dark:text-tnormal dark:hover:text-white hover:text-sky-600'
                )}
              >
                Login / Register
                <UserCircleIcon className="w-6 h-6" />
              </Link>
            </div>
            <div className={cn('flex min-h-0 grow flex-row justify-between')}>
              <SideNav className="hidden h-full w-fit lg:block" />
              <main className={cn('h-full min-w-0 flex-1')}>
                <div className="w-full h-full px-4">{children}</div>
              </main>
            </div>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
