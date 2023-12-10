import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import packageInfo from '../../package.json'
import Logo from '../../public/logo.svg'
import { kanit } from '../app/fonts'
import { SETTINGS } from '../lib/config'
import { cn } from '../lib/utils'
import HeaderTitle from './HeaderTitle'
import ToggleTheme from './ToggleTheme'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'

export default function Nav() {
  return (
    <div className="flex flex-row items-center justify-between w-full px-6 py-3 border-b shrink-0">
      <div className="flex items-center gap-2">
        <Link href={'/'} className="flex items-center gap-2">
          <Image src={Logo} alt="DevBoost Logo" width={30} height={30} />
          <h1 className={cn('text-2xl', kanit.className)}>{SETTINGS.siteName}</h1>
        </Link>
        <Badge className="font-normal" variant="secondary">
          v{packageInfo.version}
        </Badge>
        <div>/</div>
        <HeaderTitle className="flex-1 h-full" />
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" asChild>
          <a target="_blank" href="https://github.com/dinhanhthi/devboost.app">
            <GitHubLogoIcon className="w-5 h-5" />
          </a>
        </Button>
        ∏
        <ToggleTheme />
      </div>
    </div>
  )
}
