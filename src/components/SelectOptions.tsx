'use client'

import { offset, useFloating } from '@floating-ui/react-dom'
import { Listbox, Transition } from '@headlessui/react'
import cn from 'classnames'
import React, { Fragment, useState } from 'react'
import { createPortal } from 'react-dom'
import { Control, Controller } from 'react-hook-form'

import BsFillCheckCircleFill from '../icons/BsFillCheckCircleFill'
import HiOutlineSelector from '../icons/HiOutlineSelector'

type SelectOptionsProps = {
  data: any[]
  formName: string
  control: Control<any, any>
  labelText?: string
  initSelectedValue?: any // can be a single value (select) or an array (multi-select)
  rules?: any // Check: https://react-hook-form.com/docs/usecontroller/controller
  dropdownStyle?: React.CSSProperties
}
/**
 * It can be either a single select or a multi-select. It depends on the value of `initSelectedValue`.
 */
export default function SelectOptions(props: SelectOptionsProps) {
  const isMultiSelect = Array.isArray(props.initSelectedValue)
  const initSelected = !props.initSelectedValue
    ? props.data[0]
    : isMultiSelect
      ? props.data.filter(item => props.initSelectedValue.includes(item.value))
      : props.data.find(item => item.value === props.initSelectedValue)
  const [selected, setSelected] = useState(initSelected)

  function handleSelectedChange(e: any) {
    setSelected(
      !isMultiSelect
        ? props.data.find(item => item.value === e)
        : props.data.filter(item => e.includes(item.value))
    )
  }

  const { refs, floatingStyles } = useFloating({
    placement: 'bottom',
    middleware: [offset(10)]
  })

  return (
    <Controller
      control={props.control}
      defaultValue={props.initSelectedValue ? props.initSelectedValue : isMultiSelect ? [] : ''}
      name={props.formName}
      rules={props.rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <Listbox
            {...field}
            onChange={e => {
              field.onChange(e)
              handleSelectedChange(e)
            }}
            multiple={isMultiSelect}
          >
            <div className="relative flex items-center w-fit">
              {props.labelText && (
                <Listbox.Label className={cn('min-w-[250px] text-base')}>
                  {props.labelText}
                </Listbox.Label>
              )}
              <div
                className={cn('flex flex-col gap-1', {
                  'rounded-b-xl rounded-t-3xl bg-red-400': error && error.type && error.message
                })}
              >
                <Listbox.Button
                  data-testid={`select-button-${props.formName}`}
                  ref={refs.setReference}
                  className={cn(
                    'relative cursor-pointer rounded-3xl px-3 pr-11 border-gray-800 bg-gray-700 py-1 pl-3 text-left shadow-md h-8 w-fit'
                  )}
                >
                  <span className="block whitespace-nowrap py-0.5 text-[0.9rem] text-tlight">
                    {!isMultiSelect
                      ? selected.name
                      : selected.length > 0
                        ? selected.map((item: any) => item.name).join(' & ')
                        : 'Nothing selected'}
                  </span>
                  <span
                    className={cn(
                      'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'
                    )}
                  >
                    <HiOutlineSelector
                      className={cn(
                        'h-5 w-5 rounded-full border border-border bg-slate-300 text-darker'
                      )}
                    />
                  </span>
                </Listbox.Button>
                {error && error.type && error.message && (
                  <div className="px-2 py-0 pb-1 text-center text-[0.85rem] text-white">
                    {error.message}
                  </div>
                )}
              </div>
              {typeof window === 'object' &&
                createPortal(
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    ref={refs.setFloating}
                  >
                    <Listbox.Options
                      className={cn(
                        't4d-scrollbar absolute right-0 top-[40px] z-10 border-border border shadow-lg overflow-auto rounded-lg bg-darker text-sm divide-y divide-x-0 divide-border ring-1 ring-black ring-opacity-5 focus:outline-none'
                      )}
                      style={{
                        ...props.dropdownStyle,
                        width: props.dropdownStyle?.width ?? 220,
                        maxHeight: props.dropdownStyle?.maxHeight ?? 240,
                        ...floatingStyles
                      }}
                    >
                      {props.data.map(item => (
                        <Listbox.Option
                          data-testid={`select-option-${item.value}`}
                          key={item.value}
                          className={({ active }) =>
                            cn('relative cursor-default select-none px-4 py-2', {
                              'bg-light text-white': active,
                              'text-slate-400': !active
                            })
                          }
                          value={item.value}
                        >
                          {({ selected }) => {
                            return (
                              <>
                                <span
                                  className={cn('block truncate', {
                                    'font-normal': !selected,
                                    'text-thighlight': selected
                                  })}
                                >
                                  {item.name}
                                </span>
                                {selected ? (
                                  <span
                                    className={cn(
                                      'absolute inset-y-0 right-2 flex items-center pl-3 text-thighlight'
                                    )}
                                  >
                                    <BsFillCheckCircleFill className="w-4 h-4" />
                                  </span>
                                ) : null}
                              </>
                            )
                          }}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>,
                  document.body
                )}
            </div>
          </Listbox>
        )
      }}
    />
  )
}
