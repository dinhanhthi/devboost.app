import AiOutlineQuestionCircle from '../icons/AiOutlineQuestionCircle'
import ChangeIcon from '../icons/ChangeIcon'
import { CooperateIcon } from '../icons/CooperateIcon'
import IoExtensionPuzzleSharp from '../icons/IoExtensionPuzzleSharp'
import IoInformationCircleOutline from '../icons/IoInformationCircleOutline'
import IoIosBug from '../icons/IoIosBug'
import { Tool } from '../interface'

export const SETTINGS = {
  siteName: 'DevBoost'
}
export const PAGES: Tool[] = [
  { slug: 'about', name: 'About', iconEl: IoInformationCircleOutline({}) },
  { slug: 'how-to-contribute', name: 'How to contribute?', iconEl: CooperateIcon({}) },
  { slug: 'faq', name: 'FAQ', iconEl: AiOutlineQuestionCircle({}) },
  { slug: 'changelog', name: 'Changelog', iconEl: ChangeIcon({}) },
  { slug: 'bug-tracker', name: 'I found a bug', iconEl: IoIosBug({}) },
  { slug: 'request-features', name: 'Request features', iconEl: IoExtensionPuzzleSharp({}) }
]
