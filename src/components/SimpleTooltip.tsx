import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/Tooltip'

type SimpleTooltipProps = {
  text: string
  children: React.ReactNode
}

export default function SimpleTooltip(props: SimpleTooltipProps) {
  return (
    <TooltipProvider delayDuration={1}>
      <Tooltip>
        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
        <TooltipContent>
          <p>{props.text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
