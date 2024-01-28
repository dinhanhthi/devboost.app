import GithubLineIcon from '../icons/GithubLineIcon'
import SupportMeIcon from '../icons/SupportMeIcon'
import FooterLinksMobile from './FooterLinksMobile'
import FooterLinksModals from './FooterLinksModals'
import NavConfig from './NavConfig'
import ToggleSidebar from './ToggleSidebar'
import ToggleSidebarMobile from './ToggleSidebarMobile'
import ToggleTheme from './ToggleTheme'
import { Button } from './ui/Button'

export default function Footer() {
  return (
    <div className="z-10 flex items-center justify-between w-full p-3 border-t">
      <ToggleSidebarMobile className='lg:hidden' />
      <ToggleSidebar className="hidden lg:block" />
      <FooterLinksModals className="hidden lg:block" />
      <FooterLinksMobile className="flex items-center justify-center lg:hidden" />
      <NavConfig className="lg:hidden" />
      <ToggleTheme className="lg:hidden" />
      <Button variant="ghost" size="icon" asChild className="lg:hidden">
        <a target="_blank" href="https://github.com/dinhanhthi/devboost.app">
          <GithubLineIcon className="w-5 h-5" />
        </a>
      </Button>
      <Button className="px-2 ml-2 font-normal group" asChild>
        <a target="_blank" href="https://dinhanhthi.com/support-me/">
          <SupportMeIcon className="w-5 h-5" />
          <span className="hidden text-sm sm:block ml-1.5">Support me</span>
        </a>
      </Button>
    </div>
  )
}
