import AddIcon from '../icons/AddIcon'
import AiOutlineQuestionCircle from '../icons/AiOutlineQuestionCircle'
import ChangeIcon from '../icons/ChangeIcon'
import InformationCircle from '../icons/InformationCircle'
import IoExtensionPuzzleSharp from '../icons/IoExtensionPuzzleSharp'
import IoIosBug from '../icons/IoIosBug'
import PiMedalFill from '../icons/PiMedalFill'
import { Tool } from '../interface'

export const SETTINGS = {
  siteName: 'DevBoost'
}
export const PAGES: Tool[] = [
  { slug: 'about', name: 'About', iconEl: InformationCircle({}) },
  { slug: 'how-to-contribute', name: "Let's build together", iconEl: AddIcon({}) },
  { slug: 'faq', name: 'FAQ', iconEl: AiOutlineQuestionCircle({}) },
  { slug: 'changelog', name: 'Changelog', iconEl: ChangeIcon({}) },
  { slug: 'bug-tracker', name: 'I found a bug', iconEl: IoIosBug({}) },
  { slug: 'request-features', name: 'Request features', iconEl: IoExtensionPuzzleSharp({}) },
  { slug: 'get-more', name: 'Get More', iconEl: PiMedalFill({}) }
]
