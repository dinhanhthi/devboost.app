import ReactMarkdown from 'react-markdown'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import AiOutlineLoading3Quarters from '../icons/AiOutlineLoading3Quarters'
import { CloseIcon } from '../icons/CloseIcon'
import { DocDuoToneIcon } from '../icons/DocDuaToneIcon'
import { Tool } from '../interface'
import { MarkdownComponents } from '../libs/helpers'

type SideOverDocProps = {
  tool: Tool
  open: boolean
  setOpen: (open: boolean) => void
  docContent?: string
}

export default function SideOverDoc(props: SideOverDocProps) {
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={props.setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-200 sm:duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-200 sm:duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative w-screen max-w-xl pointer-events-auto xl:max-w-2xl">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 flex pt-4 pr-2 -ml-8 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative text-gray-200 rounded-md hover:text-white focus:outline-none focus:ring-0 focus:ring-white"
                        onClick={() => props.setOpen(false)}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <CloseIcon className="w-6 h-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-col h-full overflow-y-scroll shadow-xl text-tlight bg-darker">
                    <div className="flex flex-col gap-2 px-4 py-5">
                      <Dialog.Title className="flex flex-row items-center gap-2 text-lg font-semibold leading-6 tracking-wider text-thighlight">
                        <DocDuoToneIcon className="w-6 h-6 text-white" /> {props.tool.name}
                      </Dialog.Title>
                      {!!props.tool.description && (
                        <p className="pl-8 pr-4 text-sm text-tnormal">{props.tool.description}</p>
                      )}
                    </div>
                    <div className="flex-1 min-h-0 p-3 pt-0 overflow-hidden">
                      <div className="h-full p-4 overflow-auto prose border rounded-lg prose-zinc prose-invert bg-dark border-border db-scrollbar">
                        {props.docContent && (
                          <ReactMarkdown components={MarkdownComponents}>
                            {props.docContent}
                          </ReactMarkdown>
                        )}
                        {!props.docContent && props.tool.docFile && (
                          <div className="flex items-center justify-center w-full h-full">
                            <div className="animate-spin">
                              <AiOutlineLoading3Quarters className="w-10 h-10 text-green-300" />
                            </div>
                          </div>
                        )}
                        {!props.tool.docFile && (
                          <div className="flex items-center justify-center w-full h-full">
                            <p className="text-base text-white">This tool has no document.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
