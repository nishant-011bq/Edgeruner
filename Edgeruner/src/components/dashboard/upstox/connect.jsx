'use client'
import React, { Fragment } from 'react'
import { useFormStatus } from 'react-dom'
import { SubmitButton } from '@/components/SubmitButton'
import { upstoxConnectAction } from '@/actions/actions'
import { useRouter } from 'next/navigation'
import TableHeading from '@/components/TableHeading'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import PasswordInput from '@/components/PasswordInput'
import { Button } from '@/components/Button'

export default function Connect({ data, user }) {
  const router = useRouter()
  const { pending } = useFormStatus()

  const handleSumit = (formData) => {
    upstoxConnectAction(formData).then((result) => {
      if (result.error) {
        toast.error(result.error.message)
      }
      if (result.data) {
        router.push(
          `https://api.edgeruner.com/upstox/login-with-uuid?uuid=${user.uuid}`,
        )
      }
    })
  }

  return (
    <Fragment>
      <form
        className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
        action={handleSumit}
      >
        <TableHeading heading="Upstox Settings" />
        <div className="flex flex-col gap-y-10 pt-8 lg:px-4">
          <div className="grid max-w-4xl grid-cols-1 gap-x-8 gap-y-4 px-4 sm:px-6 md:grid-cols-3 lg:px-4">
            <div>
              <div className="flex items-center gap-1">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  API key
                </h2>
                <InformationCircleIcon
                  className="h-4 w-4 cursor-pointer text-gray-400"
                  // onClick={onOpenModal}
                />
              </div>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Update your password associated with your account.
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                  <PasswordInput
                    id="upstox_api_key"
                    name="upstox_api_key"
                    autoComplete="off"
                    defaultValue={
                      data && data.upstox_api_key ? data.upstox_api_key : ''
                    }
                    placeholder="add your api key"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid max-w-4xl grid-cols-1 gap-x-8 gap-y-4 px-4 sm:px-6 md:grid-cols-3 lg:px-4">
            <div>
              <div className="flex items-center gap-1">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  API secret
                </h2>
                <InformationCircleIcon
                  className="h-4 w-4 cursor-pointer text-gray-400"
                  // onClick={onOpenModal}
                />
              </div>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Update your password associated with your account.
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                  <PasswordInput
                    id="upstox_api_secret"
                    name="upstox_api_secret"
                    autoComplete="off"
                    defaultValue={
                      data && data.upstox_api_secret
                        ? data.upstox_api_secret
                        : ''
                    }
                    placeholder="add your api secret"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 px-4 py-4 sm:px-8">
          {data && !data.upstox_user_id ? (
            <Button
              type="submit"
              color="cyan"
              className="mt-0"
              disabled={pending}
            >
              {pending ? 'Reconnecting...' : 'Reconnect'}
            </Button>
          ) : (
            <Button
              type="submit"
              color="cyan"
              className="mt-0"
              disabled={pending}
            >
              {pending ? 'Submitting...' : 'Submit'}
            </Button>
          )}
        </div>
      </form>
    </Fragment>
  )
}
