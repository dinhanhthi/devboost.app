import cn from 'classnames'
import Link from 'next/link'

import AiOutlineQuestionCircle from '../icons/AiOutlineQuestionCircle'
import ChangeIcon from '../icons/ChangeIcon'
import { CooperateIcon } from '../icons/CooperateIcon'
import IoExtensionPuzzleSharp from '../icons/IoExtensionPuzzleSharp'
import IoInformationCircleOutline from '../icons/IoInformationCircleOutline'
import IoIosBug from '../icons/IoIosBug'
import PiMedalFill from '../icons/PiMedalFill'

export default function Footer() {
  const bottomClassName = cn(
    `flex items-center gap-1 text-tnormal text-sm hover:text-white whitespace-nowrap`
  )
  return (
    <div className="z-10 flex items-center w-full gap-4 p-4">
      <Link href="/page/about" className={cn(bottomClassName)}>
        <IoInformationCircleOutline className="text-xl" />
        About
      </Link>
      <Link href="/page/faq" className={cn(bottomClassName)}>
        <AiOutlineQuestionCircle className="text-lg" />
        FAQ
      </Link>
      <Link href={'/page/how-to-contribute'} className={cn(bottomClassName)}>
        <CooperateIcon className="w-5 h-5" /> Let's build together
      </Link>
      <Link href="/page/changelog" className={cn(bottomClassName)}>
        <ChangeIcon className="w-5 h-5" />
        Changelog
      </Link>
      <Link href="/page/bug-tracker" className={cn(bottomClassName)}>
        <IoIosBug className="w-4 h-4" />I found a bug
      </Link>
      <Link href="/page/request-features" className={cn(bottomClassName)}>
        <IoExtensionPuzzleSharp className="w-4 h-4" />
        Request features
      </Link>
      <button
        className={cn(
          'flex items-center gap-1 rounded-2xl text-amber-800 bg-amber-300 pl-1.5 pr-2 py-1 text-[0.8rem] font-semibold tracking-widest transition-all duration-200 hover:px-2 hover:text-amber-900'
        )}
      >
        <PiMedalFill className="w-4 h-4" />
        Get More
      </button>
    </div>
  )
}
