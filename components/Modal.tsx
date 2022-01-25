import { Dialog, Transition } from "@headlessui/react";

import { ReactFragment, useState, Fragment } from "react";

export default function Modal({ children, buttons, title, open = false, close = () => {} }: { children: ReactFragment; buttons?: any; title?: string; open: boolean; close?: any }) {
  return (
    <>
      {open && (
        <Transition appear show={open} as={Fragment}>
          <Dialog as='div' className='fixed inset-0 z-10 overflow-y-auto' onClose={close}>
            <div className='min-h-screen px-4 text-center'>
              <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
                <Dialog.Overlay className='fixed inset-0' />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span className='inline-block h-screen align-middle' aria-hidden='true'>
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-700 shadow-xl rounded-2xl'>
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-white'>
                    {title}
                  </Dialog.Title>
                  <p className='text-white text-3xl'>{children}</p>
                  <div className='mt-4'>
                    {buttons?.map((button: any) => (
                      <button
                        type='button'
                        className=' mx-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                        onClick={button?.onClick}
                      >
                        {button?.name}
                      </button>
                    ))}
                  </div>
                  <div className='mt-4'></div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
}
