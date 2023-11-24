import cn from 'classnames'
import Link from 'next/link'

import AiOutlineQuestionCircle from '../icons/AiOutlineQuestionCircle'
import ChangeIcon from '../icons/ChangeIcon'
import InformationCircle from '../icons/InformationCircle'
import IoExtensionPuzzleSharp from '../icons/IoExtensionPuzzleSharp'
import IoIosBug from '../icons/IoIosBug'
import PiMedalFill from '../icons/PiMedalFill'
import AddIcon from '../icons/AddIcon'

export default function Footer() {
  return (
    <div className="z-10 flex items-center w-full gap-4 p-4">
      <Link href="/page/about" className={'db-bottom-class'}>
        <InformationCircle className="text-xl" />
        About
      </Link>
      <Link href="/page/faq" className={'db-bottom-class'}>
        <AiOutlineQuestionCircle className="text-lg" />
        FAQ
      </Link>
      <Link href={'/page/how-to-contribute'} className={'db-bottom-class'}>
        <AddIcon className="w-5 h-5" /> Add yours
      </Link>
      <Link href="/page/changelog" className={'db-bottom-class'}>
        <ChangeIcon className="w-5 h-5" />
        Changelog
      </Link>
      <Link href="/page/bug-tracker" className={'db-bottom-class'}>
        <IoIosBug className="w-4 h-4" />I found a bug
      </Link>
      <Link href="/page/request-features" className={'db-bottom-class'}>
        <IoExtensionPuzzleSharp className="w-4 h-4" />
        Request features
      </Link>
      <Link
        href="/page/get-more"
        className={cn(
          'flex items-center gap-1 rounded-2xl text-amber-800 bg-amber-300 pl-1.5 pr-2 py-1 text-[0.8rem] font-semibold tracking-widest transition-all duration-200 hover:px-2 hover:text-amber-900'
        )}
      >
        <PiMedalFill className="w-4 h-4" />
        Get More
      </Link>
    </div>
  )
}
