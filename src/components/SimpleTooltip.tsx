import { cn } from '../lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/Tooltip'

type SimpleTooltipProps = {
  text: string
  children: React.ReactNode
  hidden?: boolean
}

export default function SimpleTooltip(props: SimpleTooltipProps) {
  return (
    <TooltipProvider delayDuration={1}>
      <Tooltip>
        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
        <TooltipContent className={cn({ hidden: props.hidden })}>
          <p>{props.text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
