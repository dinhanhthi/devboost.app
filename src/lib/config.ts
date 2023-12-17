import AddIcon from '../icons/AddIcon'
import AiOutlineQuestionCircle from '../icons/AiOutlineQuestionCircle'
import ChangeIcon from '../icons/ChangeIcon'
import InformationCircle from '../icons/InformationCircle'
import IoExtensionPuzzleSharp from '../icons/IoExtensionPuzzleSharp'
import IoIosBug from '../icons/IoIosBug'
import { Configs, FooterLink } from '../interface'

export const SETTINGS = {
  siteName: 'DevBoost'
}

export const FOOTER_LINKS: FooterLink[] = [
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
    docFile: 'add-yours.md',
    icon: AddIcon({})
  },
  {
    name: 'Changelog',
    docFile: 'changelog.md',
    icon: ChangeIcon({})
  },
  {
    name: 'I found a bug',
    docFile: 'i-found-a-bug.md',
    icon: IoIosBug({})
  },
  {
    name: 'Request features',
    docFile: 'request-features.md',
    icon: IoExtensionPuzzleSharp({})
  }
]

export const CONFIG_KEYS: Record<keyof Configs, string> = {
  sideNavFilter: 'sideNavFilter',
  favoriteToolSlugs: 'favoriteToolSlugs',
  usageFrequency: 'usageFrequency'
}

export const DEFAULT_C0NFIGS: Configs = {
  sideNavFilter: {
    showOnlyFavorites: false,
    showDescription: false,
    sortBy: 'name',
    sortDirection: 'asc'
  },
  favoriteToolSlugs: [],
  usageFrequency: {}
}
