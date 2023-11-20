import cn from 'classnames'
import { Metadata } from 'next'

import Footer from '../components/Footer'
import Header from '../components/Header'
import SideNav from '../components/SideNav'
import { inter } from './fonts'
import './styles.scss'

export const metadata: Metadata = {
  title: 'Tools for Devs',
  description: 'A collection of useful tools for developers',
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
    <html lang="en" className={cn(inter.className, 'text-tnormal')}>
      <body suppressHydrationWarning={true}>
        <div className={cn('flex h-screen max-h-screen flex-col bg-darker')}>
          <Header />
          <div className={cn('flex min-h-0 grow flex-row justify-between')}>
            <SideNav className="hidden h-full w-fit lg:block" />
            <main className={cn('h-full min-w-0 flex-1')}>
              <div className="w-full h-full px-4">{children}</div>
            </main>
          </div>

          <Footer />
        </div>
      </body>
    </html>
  )
}
