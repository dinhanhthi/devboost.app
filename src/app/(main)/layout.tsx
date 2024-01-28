import { cn } from '@/lib/utils'
import { Metadata } from 'next'

import Footer from '../../components/Footer'
import Nav from '../../components/Nav'
import SideNav from '../../components/SideNav'
import '../../styles/globals.scss'
import { inter } from '../fonts'
import Providers from '../providers'

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
      <body suppressHydrationWarning className="bg-background">
        <Providers>
          <div className={cn('flex h-screen max-h-screen flex-col')}>
            <Nav />
            <div className={cn('flex min-h-0 grow flex-row justify-between')}>
              <SideNav className="hidden h-full w-[320px] lg:block border-r" />
              <main className={cn('h-full min-w-0 flex-1')}>
                <div className="w-full h-full">{children}</div>
              </main>
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
