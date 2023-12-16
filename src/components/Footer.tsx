import SupportMeIcon from '../icons/SupportMeIcon'
import FooterLinksModals from './FooterLinksModals'
import ToggleSidebar from './ToggleSidebar'
import { Button } from './ui/Button'

export default function Footer() {
  return (
    <div className="z-10 flex items-center w-full p-3 border-t">
      <ToggleSidebar />
      <FooterLinksModals />
      <Button className="px-2 ml-2 font-normal group" asChild>
        <a target="_blank" href="https://dinhanhthi.com/support-me/">
          <SupportMeIcon className="h-5 w-5 mr-1.5" />
          <span className="text-sm">Support me</span>
        </a>
      </Button>
    </div>
  )
}
