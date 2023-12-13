import HideSidebarIcon from '../icons/HideSidebarIcon'
import FooterLinksModals from './FooterLinksModals'
import SimpleTooltip from './SimpleTooltip'
import { Button } from './ui/Button'

export default function Footer() {
  return (
    <div className="z-10 flex items-center w-full p-3 border-t">
      <SimpleTooltip text="Toggle sidebar">
        <Button variant="ghost" size="icon">
          <HideSidebarIcon className="w-5 h-5" />
        </Button>
      </SimpleTooltip>
      <FooterLinksModals />
      {/* <Link
        href="/page/get-more"
        className={cn(
          'flex items-center gap-1 rounded-2xl text-amber-800 bg-amber-300 pl-1.5 pr-2 py-1 text-[0.8rem] font-semibold tracking-widest transition-all duration-200 hover:px-2 hover:text-amber-900'
        )}
      >
        <PiMedalFill className="w-4 h-4" />
        Get More
      </Link> */}
    </div>
  )
}
