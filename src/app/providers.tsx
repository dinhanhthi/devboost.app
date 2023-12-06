'use client'

import { ThemeProvider } from 'next-themes'
import { NextAuthProvider } from './provider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <ThemeProvider attribute="class" disableTransitionOnChange defaultTheme="light">
        {children}
      </ThemeProvider>
    </NextAuthProvider>
  )
}
