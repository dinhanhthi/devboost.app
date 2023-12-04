import { Inter as FontSans, Kanit } from 'next/font/google'

export const inter = FontSans({ subsets: ['latin'], variable: '--font-sans' })

export const kanit = Kanit({
  subsets: ['latin'],
  weight: ['400']
})
