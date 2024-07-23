'use client'
import React, { useState } from 'react'
import TableHeading from '@/components/TableHeading'
import { classNames } from '@/utils/helper'
import { Switch } from '@headlessui/react'
import { disableTelegramNotifications } from '@/actions/actions'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function Notifications({
  data,
  notifications,
  disabledNotifications,
}) {
  const router = useRouter()
  const [notificationStates, setNotificationStates] = useState(() => {
    const initialState = Object.fromEntries(
      notifications.map((item) => [item.key, true]),
    )

    // Set initial state based on the disabledNotifications array
    disabledNotifications.forEach((item) => {
      if (initialState.hasOwnProperty(item.key)) {
        initialState[item.key] = false
      }
    })

    return initialState
  })

  const handleSwitchChange = (key) => {
    setNotificationStates((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key],
    }))

    handleDisableNotifications(key)
  }

  const handleDisableNotifications = (key) => {
    const isEnabled = notificationStates[key]

    toast.promise(disableTelegramNotifications(key), {
      loading: 'Loading...',
      success: (result) => {
        router.refresh()
        const action = isEnabled ? 'disabled' : 'enabled'
        return `Notification ${action} successfully`
      },
      error: (error) => {
        return error.message || 'An error occurred'
      },
    })
  }

  return (
    <div className="relative shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
      {!data.is_active && (
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-white opacity-80 sm:rounded-xl" />
      )}
      <TableHeading heading="Notifications" />
      <div className="flex flex-col gap-y-10 pt-8 lg:px-4">
        {notifications.map((item) => (
          <div
            key={item.key}
            className="flex max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-4"
          >
            <div>
              <div className="flex items-center gap-1">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  {item.name}
                </h2>
              </div>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {item.description ||
                  'Update your password associated with your account.'}
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="col-span-full">
                <Switch
                  checked={notificationStates[item.key]}
                  onChange={() => handleSwitchChange(item.key)}
                  name={item.key}
                  className={classNames(
                    notificationStates[item.key] ? 'bg-primary' : 'bg-gray-200',
                    'inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      notificationStates[item.key]
                        ? 'translate-x-5'
                        : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    )}
                  />
                </Switch>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end gap-x-6 px-4 py-4 sm:px-8"></div>
    </div>
  )
}
