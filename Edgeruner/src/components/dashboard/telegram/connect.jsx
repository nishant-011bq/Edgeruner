'use client'
import React, { Fragment, useState } from 'react'
import {
  ArrowPathIcon,
  AtSymbolIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { revokeTelegramAction, rotateTelegramPasscode } from '@/actions/actions'
import toast from 'react-hot-toast'
import DialogBox from '@/components/DialogBox'
import Notifications from './notifications'
import MessageStrip from '@/components/MessageStrip'

export default function Connect({
  data,
  notifications,
  disabledNotifications,
}) {
  const [pending, setPending] = useState(false)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [passcode, setPasscode] = useState(data.passcode)

  const handleSubmit = () => {
    setPending(true)
    revokeTelegramAction().then((result) => {
      if (result.error) {
        setPending(false)
        toast.error(result.error.message)
      }
      if (result.data) {
        setPending(false)
        toast.success('Account revoked')
        setOpen(false)
        if (typeof window !== 'undefined') {
          window.location.reload()
        }
      }
    })
  }

  const rotatePasscode = () => {
    setLoading(true)
    toast.promise(rotateTelegramPasscode(), {
      loading: 'Saving...',
      success: (result) => {
        setLoading(false)
        setPasscode(result.data.passcode)
        return 'Passcode changed successfully'
      },
      error: (error) => {
        setLoading(false)
        return error.message || 'An error occurred'
      },
    })
  }

  return (
    <Fragment>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          {data.is_active ? (
            <></>
          ) : (
            <MessageStrip description="Refresh the page once you successfully connected to telegram." />
          )}
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg">
            <dl className="flex flex-wrap">
              <div className="flex-auto pl-6 pt-6">
                <dt className="text-sm font-semibold leading-6 text-gray-900">
                  Passcode
                </dt>
                <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">
                  <div className="flex items-center gap-2">
                    {passcode}
                    <button onClick={() => rotatePasscode()} disabled={loading}>
                      <ArrowPathIcon
                        className="h-4 w-4 text-gray-500"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </dd>
              </div>
              <div className="flex-none self-end px-6 pt-4">
                {data.is_active ? (
                  <button
                    className="inline-flex cursor-pointer items-center justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    onClick={() => setOpen(true)}
                  >
                    Revoke account
                  </button>
                ) : (
                  <a
                    className="inline-flex cursor-pointer items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    href="https://t.me/edgeruner_bot"
                    target="_blank"
                  >
                    Connect account
                  </a>
                )}
              </div>
              <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                <dt className="flex-none">
                  <span className="sr-only">Client</span>
                  <UserCircleIcon
                    className={`h-6 w-5 text-gray-400 ${
                      !data.first_name && 'opacity-20'
                    }`}
                    aria-hidden="true"
                  />
                </dt>
                <dd
                  className={`text-sm font-medium leading-6 text-gray-900 ${
                    !data.first_name && 'opacity-20'
                  }`}
                >
                  {data.first_name ? data.first_name : 'your telegram name'}{' '}
                  {data.last_name ? data.last_name : ''}
                </dd>
              </div>
              <div className="mt-4 flex w-full flex-none gap-x-4 px-6 pb-6">
                <dt className="flex-none">
                  <span className="sr-only">Client</span>
                  <AtSymbolIcon
                    className={`h-6 w-5 text-gray-400 ${
                      !data.first_name && 'opacity-20'
                    }`}
                    aria-hidden="true"
                  />
                </dt>
                <dd
                  className={`text-sm font-medium leading-6 text-gray-900 ${
                    !data.username && 'opacity-20'
                  }`}
                >
                  {data.username ? data.username : 'your telegram username'}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {data.is_active ? (
          <></>
        ) : (
          <MessageStrip description="Connect to telegram account to enable/disable notifications" />
        )}

        <Notifications
          data={data}
          notifications={notifications}
          disabledNotifications={disabledNotifications}
        />
      </div>
      <DialogBox
        open={open}
        setOpen={setOpen}
        title="Revoke account"
        description="Uh-oh! It seems you're about to revoke access. Are you sure you want to go through with it? We'd hate to see you leave!"
        buttonText="Revoke"
        onClick={handleSubmit}
        loading={pending}
      />
    </Fragment>
  )
}
