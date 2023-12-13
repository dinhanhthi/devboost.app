import FooterLinksModals from './FooterLinksModals'
import ToggleSidebar from './ToggleSidebar'

export default function Footer() {
  return (
    <div className="z-10 flex items-center w-full p-3 border-t">
      <ToggleSidebar />
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
