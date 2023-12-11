import AddIcon from '../icons/AddIcon'
import AiOutlineQuestionCircle from '../icons/AiOutlineQuestionCircle'
import ChangeIcon from '../icons/ChangeIcon'
import InformationCircle from '../icons/InformationCircle'
import IoExtensionPuzzleSharp from '../icons/IoExtensionPuzzleSharp'
import IoIosBug from '../icons/IoIosBug'

export type FooterLink = {
  name: string
  description?: string
  docFile: string
  icon: JSX.Element
}

export const footerLinks: FooterLink[] = [
  {
    name: 'About',
    docFile: 'about.md',
    icon: InformationCircle({})
  },
  {
    name: 'FAQ',
    docFile: 'faq.md',
    icon: AiOutlineQuestionCircle({})
  },
  {
    name: 'Add yours',
    docFile: 'how-to-contribute.md',
    icon: AddIcon({})
  },
  {
    name: 'Changelog',
    docFile: 'changelog.md',
    icon: ChangeIcon({})
  },
  {
    name: 'I found a bug',
    docFile: 'bug-tracker.md',
    icon: IoIosBug({})
  },
  {
    name: 'Request features',
    docFile: 'request-features.md',
    icon: IoExtensionPuzzleSharp({})
  }
]
