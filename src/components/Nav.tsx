import Image from 'next/image'
import Link from 'next/link'
// import packageInfo from '../../package.json'
import Logo from '../../public/logo.svg'
import { kanit } from '../app/fonts'
import GithubLineIcon from '../icons/GithubLineIcon'
import { SETTINGS } from '../lib/config'
import { cn } from '../lib/utils'
import HeaderTitle from './HeaderTitle'
import NavConfig from './NavConfig'
import SimpleTooltip from './SimpleTooltip'
import ToggleTheme from './ToggleTheme'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'

export default function Nav() {
  return (
    <div className="flex flex-row items-center justify-between w-full px-6 py-3 border-b shrink-0">
      <div className="flex items-center gap-2">
        <Link href={'/'} className="flex items-center gap-2 shrink-0">
          <Image src={Logo} alt="DevBoost Logo" width={30} height={30} />
          <h1 className={cn('text-2xl hidden sm:block', kanit.className)}>{SETTINGS.siteName}</h1>
        </Link>
        <Badge className="text-xs font-normal md:text-sm" variant="secondary">
          {/* v{packageInfo.version} */}
          WIP
        </Badge>
        <div>/</div>
        <HeaderTitle className="flex-1 h-full" />
      </div>

      <div className="items-center hidden gap-1 lg:flex">
        <NavConfig />
        <SimpleTooltip text="Check the source codes">
          <Button variant="ghost" size="icon" asChild>
            <a target="_blank" href="https://github.com/dinhanhthi/devboost.app">
              <GithubLineIcon className="w-5 h-5" />
            </a>
          </Button>
        </SimpleTooltip>
        <ToggleTheme />
      </div>
    </div>
  )
}
