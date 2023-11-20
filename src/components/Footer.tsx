import cn from 'classnames'
import Link from 'next/link'

import AiOutlineQuestionCircle from '../icons/AiOutlineQuestionCircle'
import ChangeIcon from '../icons/ChangeIcon'
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
      <Link href="/" className={cn(bottomClassName)}>
        <IoInformationCircleOutline className="text-xl" />
        About
      </Link>
      {/* <a
        className={cn(bottomClassName)}
        href="https://github.com/dinhanhthi/devboost"
        target="_blank"
      >
        <AiFillGithub className="text-lg" />
        Source
      </a> */}
      {/* <a href="https://dinhanhthi.com" target="_blank" className={cn(bottomClassName)}>
        <MdPerson className="w-5 h-5" />
        Author
      </a> */}
      <Link href="/" className={cn(bottomClassName)}>
        <AiOutlineQuestionCircle className="text-lg" />
        FAQ
      </Link>
      {/* <Link href="/" className={cn(bottomClassName)}>
        <DocumentIcon className="w-5 h-5" />
        Documentation
      </Link> */}
      <Link href="/" className={cn(bottomClassName)}>
        <ChangeIcon className="w-5 h-5" />
        Changelog
      </Link>
      <Link href="/" className={cn(bottomClassName)}>
        <IoIosBug className="w-4 h-4" />I found a bug
      </Link>
      <Link href="/" className={cn(bottomClassName)}>
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
