import { InfoCircledIcon } from '@radix-ui/react-icons'
import SimpleTooltip from './SimpleTooltip'

type MoreInformationProps = {
  text: string
}

export default function MoreInformation(props: MoreInformationProps) {
  return (
    <SimpleTooltip text={props.text}>
      <InfoCircledIcon className="w-4 h-4 ml-1.5" />
    </SimpleTooltip>
  )
}
