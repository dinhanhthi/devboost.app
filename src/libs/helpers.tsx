import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

export const MarkdownComponents: object = {
  code({ node, className, ...props }: any) {
    const hasLang = /language-(\w+)/.exec(className || '')
    return hasLang ? (
      <SyntaxHighlighter
        style={dracula}
        language={hasLang[1]}
        PreTag="div"
        className="codeStyle"
        showLineNumbers={true}
        showInlineLineNumbers={true}
        useInlineStyles={true}
      >
        {props.children}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props} />
    )
  }
}
