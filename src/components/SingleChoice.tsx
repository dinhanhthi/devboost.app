import { RadioGroup } from '@headlessui/react'
import cn from 'classnames'
import { Control, Controller } from 'react-hook-form'

import BsFillCheckCircleFill from '../icons/BsFillCheckCircleFill'

type SingleChoiceProps = {
  data: any[]
  labelText?: string
  subLabelText?: string
  formName: string
  control: Control<any, any>
  defaultValue?: any
}

export default function SingleChoice(props: SingleChoiceProps) {
  return (
    <Controller
      control={props.control}
      defaultValue={props.defaultValue}
      name={props.formName}
      render={({ field }) => (
        <RadioGroup {...field} className={cn('flex flex-wrap items-center gap-4')}>
          <div className="flex flex-col gap-0">
            {props.labelText && <RadioGroup.Label>{props.labelText}</RadioGroup.Label>}
            {props.subLabelText && <div>{props.subLabelText}</div>}
          </div>
          <div className="flex flex-row gap-4">
            {props.data.map(e => (
              <RadioGroup.Option key={e.value} value={e.value}>
                {({ checked }) => (
                  <div
                    className={cn(
                      'relative cursor-pointer rounded-3xl px-3 py-1 pr-11 shadow-md flex w-fit items-center justify-start gap-2',
                      {
                        [`bg-black text-white`]: checked,
                        [`shadow-slate-300/50`]: !checked
                      }
                    )}
                  >
                    <div className="flex flex-row items-center justify-center gap-1">
                      <div className="text-base">
                        {(e.name as string).charAt(0).toUpperCase() + (e.name as string).slice(1)}
                      </div>
                      {e.description && <div className="text-sm opacity-90">({e.description})</div>}
                    </div>
                    {checked && (
                      <div className="absolute right-3">
                        <BsFillCheckCircleFill className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      )}
    />
  )
}
