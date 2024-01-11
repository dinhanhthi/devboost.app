import AiFillHtml5 from '../icons/AiFillHtml5'
import ApiIcon from '../icons/ApiIcon'
import CompareDocIcon from '../icons/CompareDocIcon'
import ConvertIcon from '../icons/ConvertIcon'
import DiCss3Full from '../icons/DiCss3Full'
import HiQrCode from '../icons/HiQrCode'
import IoLogoJavascript from '../icons/IoLogoJavascript'
import IoTime from '../icons/IoTime'
import JWTIcon from '../icons/JWT'
import LoremIpsumIcon from '../icons/LoremIpsumIcon'
import LuBinary from '../icons/LuBinary'
import MongoDBIcon from '../icons/MongoDBICon'
import NanoIdIcon from '../icons/NanoIdIcon'
import NotionIcon from '../icons/NotionIcon'
import OpenAiIcon from '../icons/OpenAiIcon'
import OpenGraphIcon from '../icons/OpenGraphIcon'
import PackageUpdateICon from '../icons/PackageUpdateIcon'
import RiApps2Line from '../icons/RiApps2Line'
import RiMenuSearchLine from '../icons/RiMenuSearchLine'
import ScssIcon from '../icons/ScssIcon'
import SiCurl from '../icons/SiCurl'
import SixtyFour from '../icons/SixtyFour'
import TbFileTypeXml from '../icons/TbFileTypeXml'
import TbJson from '../icons/TbJson'
import TokenIcon from '../icons/TokenIcon'
import TreeDiagramIcon from '../icons/TreeDiagramIcon'
import ULIDIcon from '../icons/ULIDIcon'
import Uuid from '../icons/Uuid'
import VscRegex from '../icons/VscRegex'
import { Tool } from '../interface'

const commonIconClass = 'text-2xl'

const originalTools: Tool[] = [
  {
    slug: 'check-your-api',
    name: 'Check Your API',
    description:
      "Quickly check your API's response. No need to write code. Save your API for later use.",
    iconEl: ApiIcon({ className: commonIconClass })
  },
  {
    slug: 'check-npm-version',
    name: 'Check Latest NPM Package Version',
    description: 'Quickly check the latest version of any npm / yarn package.',
    iconEl: PackageUpdateICon({ className: 'text-2xl' })
  },
  {
    slug: 'mermaid-playground',
    name: 'Mermaid Playground',
    iconEl: TreeDiagramIcon({ className: 'text-xl' })
  },
  {
    slug: 'compare-json',
    name: 'Compare JSON',
    iconEl: CompareDocIcon({ className: 'text-2xl' })
  },
  {
    slug: 'compare-string',
    name: 'Compare String',
    iconEl: CompareDocIcon({ className: 'text-2xl' })
  },
  {
    slug: 'base64-string',
    name: 'Base64 String Encoder/Decoder',
    description: 'Convert string to base64 and base64 to string.',
    iconEl: SixtyFour({ className: 'text-xs' }),
    implemented: true
  },
  {
    slug: 'base64-image',
    name: 'Base64 Image Encoder/Decoder',
    description: 'Convert image to base64 and base64 to image.',
    iconEl: SixtyFour({ className: 'text-xs' }),
    implemented: true
  },
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    iconEl: TbJson({ className: commonIconClass })
  },
  {
    slug: 'unix-timestamp-converter',
    name: 'Unix Timestamp Converter',
    iconEl: IoTime({ className: commonIconClass })
  },
  {
    slug: 'json-sorter',
    name: 'JSON Sorter',
    description: 'Sort JSON by key or value.',
    iconEl: TbJson({ className: commonIconClass }),
    implemented: true
  },
  {
    slug: 'open-graph-preview',
    name: 'Open Graph Preview',
    iconEl: OpenGraphIcon({ className: 'text-xs' })
  },
  {
    slug: 'jwt-encoder-decoder',
    name: 'JWT Encoder/Decoder',
    description: 'Encode and decode JSON Web Token.',
    iconEl: JWTIcon({ className: 'text-xl' }),
    credit: [
      {
        name: 'jose',
        url: 'https://github.com/panva/jose',
        version: '5.1.3'
      }
    ],
    implemented: true
  },
  {
    slug: 'regex-tester',
    name: 'Regex Tester',
    iconEl: VscRegex({ className: commonIconClass })
  },
  {
    slug: 'url-encoder-decoder',
    name: 'URL Encoder/Decoder',
    iconEl: SiCurl({ className: 'text-xl' })
  },
  {
    slug: 'url-parser',
    name: 'URL Parser',
    iconEl: SiCurl({ className: 'text-xl' })
  },
  {
    slug: 'url-shortener',
    name: 'URL Shortener',
    iconEl: SiCurl({ className: 'text-xl' })
  },
  {
    slug: 'html-entities-encoder-decoder',
    name: 'HTML Entities Encoder/Decoder',
    iconEl: AiFillHtml5({ className: commonIconClass })
  },
  {
    slug: 'uuid-generator-decoder',
    name: 'UUID Generator/Decoder',
    description:
      'Generate Universally unique identifier with different versions 1, 3, 4, 5. Also validate, decode or format UUID.',
    iconEl: Uuid({ className: commonIconClass }),
    credit: [
      {
        name: 'uuid',
        url: 'https://github.com/uuidjs/uuid',
        version: '9.0.1'
      },
      {
        name: 'uuidtools',
        url: 'https://www.uuidtools.com/decode'
      }
    ],
    implemented: true
  },
  {
    slug: 'html-preview',
    name: 'HTML Preview',
    iconEl: AiFillHtml5({ className: commonIconClass })
  },
  {
    slug: 'json-yaml',
    name: 'JSON from/to YAML',
    description: 'Convert JSON to YAML and vice versa.',
    iconEl: ConvertIcon({ className: 'text-xl' }),
    credit: [
      {
        name: 'yaml',
        url: 'https://github.com/eemeli/yaml',
        version: '2.3.4'
      }
    ],
    implemented: true
  },
  {
    slug: 'number-base-converter',
    name: 'Number Base Converter',
    iconEl: LuBinary({ className: commonIconClass })
  },
  {
    slug: 'html-beautifier-minifier',
    name: 'HTML Beautifier/Minifier',
    iconEl: AiFillHtml5({ className: commonIconClass })
  },
  {
    slug: 'css-beautifier-minifier',
    name: 'CSS Beautifier/Minifier',
    iconEl: DiCss3Full({ className: commonIconClass })
  },
  {
    slug: 'javascript-beautifier-minifier',
    name: 'JavaScript Beautifier/Minifier',
    iconEl: IoLogoJavascript({ className: 'text-xl' })
  },
  {
    slug: 'xml-beautifier-minifier',
    name: 'XML Beautifier/Minifier',
    iconEl: TbFileTypeXml({ className: commonIconClass })
  },
  {
    slug: 'scss-beautifier-minifier',
    name: 'SCSS Beautifier/Minifier',
    iconEl: ScssIcon({ className: commonIconClass })
  },
  {
    slug: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    iconEl: LoremIpsumIcon({ className: 'text-sm' })
  },
  {
    slug: 'qr-code-generator-reader',
    name: 'QR Code Generator/Reader',
    iconEl: HiQrCode({ className: commonIconClass })
  },
  {
    slug: 'string-inspector',
    name: 'String Inspector',
    iconEl: RiMenuSearchLine({ className: commonIconClass })
  },
  {
    slug: 'json-csv',
    name: 'JSON from/to CSV',
    description: 'Convert JSON to CSV and vice versa.',
    iconEl: ConvertIcon({ className: 'text-xl' }),
    implemented: true,
    wip: true,
    credit: [
      {
        name: 'Papa Parse',
        url: 'https://github.com/mholt/PapaParse',
        version: '5.4.1'
      }
    ]
  },
  {
    slug: 'nano-id-generator',
    name: 'Nano ID Generator',
    description:
      'Generate Nano ID. Generate Nano ID with custom alphabet and a given size of the ID.',
    iconEl: NanoIdIcon({ className: 'text-xl' }),
    credit: [
      {
        name: 'nanoid',
        url: 'https://github.com/ai/nanoid',
        version: '5.0.3'
      }
    ],
    implemented: true
  },
  {
    slug: 'ulid-generator',
    name: 'ULID Generator',
    description:
      'Generate Universally Unique Lexicographically Sortable Identifier. Extract timestamp from ULID and validate an ULID.',
    iconEl: ULIDIcon({ className: 'text-[0.65rem]' }),
    credit: [
      {
        name: 'ulidx',
        url: 'https://github.com/perry-mitchell/ulidx',
        version: '2.2.1'
      }
    ],
    implemented: true
  },
  {
    slug: 'objectid-generator',
    name: 'ObjectID Generator/Converter',
    description:
      'Generate MongoDB ObjectID. You can convert ObjectID to timestamp (timestamp converter).',
    iconEl: MongoDBIcon({ className: commonIconClass }),
    credit: [
      {
        name: 'bson',
        url: 'https://github.com/mongodb/js-bson',
        version: '6.2.0'
      }
    ],
    implemented: true
  },
  {
    slug: 'tokenizer',
    name: 'Tokenizer (OpenAI)',
    iconEl: TokenIcon({ className: commonIconClass })
  },
  {
    slug: 'openai-key-validator',
    name: 'OpenAI Key Validator',
    description: 'Quickly validate your OpenAI key to see if you can use it for OpenAI APIs.',
    iconEl: OpenAiIcon({ className: commonIconClass }),
    credit: [
      {
        name: 'OpenAI API',
        url: 'https://platform.openai.com/docs/api-reference/models/list'
      }
    ],
    implemented: true
  },
  {
    slug: 'notion-api-playground',
    name: 'Notion API Playground',
    iconEl: NotionIcon({ className: commonIconClass })
  }
]

export const TOOLS = originalTools
  .sort((a, b) => {
    const nameA = a.name.toUpperCase()
    const nameB = b.name.toUpperCase()
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  })

export const allToolItem: Tool = {
  name: 'All tools',
  slug: '/',
  iconEl: RiApps2Line({ className: 'text-xl' })
}
