import { cn } from '@/lib/utils'
import Link from 'next/link'

import AddIcon from '../icons/AddIcon'
import AiOutlineQuestionCircle from '../icons/AiOutlineQuestionCircle'
import ChangeIcon from '../icons/ChangeIcon'
import InformationCircle from '../icons/InformationCircle'
import IoExtensionPuzzleSharp from '../icons/IoExtensionPuzzleSharp'
import IoIosBug from '../icons/IoIosBug'
import PiMedalFill from '../icons/PiMedalFill'

export default function Footer() {
  return (
    <div className="z-10 flex items-center w-full gap-4 p-3 border-t">
      <Link
        href="/page/about"
        className={
          'hover:underline flex gap-1 items-center text-sm underline-offset-4 text-muted-foreground hover:text-foreground'
        }
      >
        <InformationCircle className="w-4 h-4" />
        About
      </Link>
      <Link
        href="/page/faq"
        className={
          'hover:underline flex gap-1 items-center text-sm underline-offset-4 text-muted-foreground hover:text-foreground'
        }
      >
        <AiOutlineQuestionCircle className="w-4 h-4" />
        FAQ
      </Link>
      <Link
        href={'/page/how-to-contribute'}
        className={
          'hover:underline flex gap-1 items-center text-sm underline-offset-4 text-muted-foreground hover:text-foreground'
        }
      >
        <AddIcon className="w-4 h-4" /> Add yours
      </Link>
      <Link
        href="/page/changelog"
        className={
          'hover:underline flex gap-1 items-center text-sm underline-offset-4 text-muted-foreground hover:text-foreground'
        }
      >
        <ChangeIcon className="w-4 h-4" />
        Changelog
      </Link>
      <Link
        href="/page/bug-tracker"
        className={
          'hover:underline flex gap-1 items-center text-sm underline-offset-4 text-muted-foreground hover:text-foreground'
        }
      >
        <IoIosBug className="w-4 h-4" />I found a bug
      </Link>
      <Link
        href="/page/request-features"
        className={
          'hover:underline flex gap-1 items-center text-sm underline-offset-4 text-muted-foreground hover:text-foreground'
        }
      >
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
