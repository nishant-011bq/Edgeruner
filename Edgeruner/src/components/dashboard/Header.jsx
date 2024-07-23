'use client'
import React, { useEffect, useState } from 'react'
import logo from '@/images/logo.png'
import Image from 'next/image'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { classNames, getInitials, userLogOut } from '@/utils/helper'
import socket from '@/utils/socket'
import { usePathname } from 'next/navigation'

export default function Header({ data }) {
  const [sensex, setSensex] = useState({})
  const [nifty, setNifty] = useState({})
  const pathname = usePathname()

  const userNavigation = [
    { name: 'Your Profile', href: '/dashboard/profile' },
    { name: 'Sign out', func: true },
  ]

  useEffect(() => {
    // "NSE_INDEX|India VIX"
    // "NSE_INDEX|Nifty Bank"
    // "NSE_INDEX|Nifty 50"
    socket.on('message', (socketData) => {
      if (socketData.instrument_key === 'BSE_INDEX|SENSEX') {
        setSensex(socketData)
      }
      if (socketData.instrument_key === 'NSE_INDEX|Nifty 50') {
        setNifty(socketData)
      }
    })
  }, [])

  return (
    <Disclosure as="nav" className="border-b border-gray-200 bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <Link
                className="flex items-center gap-1 text-gray-900"
                href="/dashboard/"
              >
                <Image
                  src={logo}
                  alt="logo"
                  className="h-6 w-auto"
                  unoptimized
                />
                <div>
                  <p className="text-base font-semibold">EdgeRuner</p>
                </div>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="text-bold text-sm">
                    <span className="text-gray-900">SENSEX</span>{' '}
                    {sensex?.ltpc?.ltp.toFixed(2)}
                  </div>
                  <div className="text-bold text-sm">
                    <span className="text-gray-900">NIFTY</span>{' '}
                    {nifty?.ltpc?.ltp.toFixed(2)}
                  </div>
                </div>
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-6">
                  <div>
                    <Menu.Button className="focus:primary relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-0 focus:ring-offset-0">
                      <span className="absolute -inset-1.5" />
                      {data.first_name || data.email ? (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 uppercase text-gray-900">
                          {getInitials(
                            data.first_name ? data.first_name : data.email,
                          )}
                        </div>
                      ) : (
                        <></>
                      )}
                      <ChevronDownIcon
                        className="ml-2 h-4 w-4 text-gray-400"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) =>
                            item.func ? (
                              <button
                                onClick={() => userLogOut()}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block w-full px-4 py-2 text-left text-sm text-gray-700',
                                )}
                              >
                                {item.name}
                              </button>
                            ) : (
                              <Link
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700',
                                )}
                              >
                                {item.name}
                              </Link>
                            )
                          }
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  {data.first_name || data.email ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary uppercase text-white">
                      {getInitials(
                        data.first_name ? data.first_name : data.email,
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {data.first_name ? data.first_name : ''}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {data.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                {userNavigation.map((item, i) => {
                  if (item.href) {
                    return (
                      <Disclosure.Button
                        href={item.href}
                        as="a"
                        key={i}
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                      >
                        {item.name}
                      </Disclosure.Button>
                    )
                  } else {
                    return (
                      <button
                        key={i}
                        onClick={() => userLogOut(pathname)}
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                      >
                        {item.name}
                      </button>
                    )
                  }
                })}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
