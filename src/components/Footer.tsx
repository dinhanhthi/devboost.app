import SupportMeIcon from '../icons/SupportMeIcon'
import FooterLinksMobile from './FooterLinksMobile'
import FooterLinksModals from './FooterLinksModals'
import ToggleSidebar from './ToggleSidebar'
import { Button } from './ui/Button'

export default function Footer() {
  return (
    <div className="z-10 flex items-center w-full p-3 border-t">
      <ToggleSidebar />
      <FooterLinksModals className='hidden lg:block' />
      <FooterLinksMobile className='flex items-center justify-center flex-1 lg:hidden' />
      <Button className="px-2 ml-2 font-normal group" asChild>
        <a target="_blank" href="https://dinhanhthi.com/support-me/">
          <SupportMeIcon className="w-5 h-5" />
          <span className="hidden text-sm sm:block ml-1.5">Support me</span>
        </a>
      </Button>
    </div>
  )
}
