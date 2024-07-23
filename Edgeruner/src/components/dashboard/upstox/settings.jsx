'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { SubmitButton } from '@/components/SubmitButton'
import { Switch } from '@headlessui/react'
import { classNames } from '@/utils/helper'
import { upstoxUpdateAction } from '@/actions/actions'
import toast from 'react-hot-toast'
import PasswordInput from '@/components/PasswordInput'
import TableHeading from '@/components/TableHeading'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import { useRouter } from 'next/navigation'

export default function Settings({ data }) {
  const router = useRouter()
  const [enabled, setEnabled] = useState(false)
  const [open, setOpen] = useState(false)

  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)

  const handleSumit = (formData) => {
    upstoxUpdateAction(formData, enabled).then((result) => {
      if (result.error) {
        toast.error(result.error.message)
      }
      if (result.data) {
        router.refresh()
        toast.success('Saved')
      }
    })
  }

  useEffect(() => {
    if (data.auto_login) {
      setEnabled(data.auto_login)
    }
  }, [data])

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
                  onClick={onOpenModal}
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
                    defaultValue={data.upstox_api_key}
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
                  onClick={onOpenModal}
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
                    defaultValue={data.upstox_api_secret}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid max-w-4xl grid-cols-1 gap-x-8 gap-y-4 px-4 sm:px-6 md:grid-cols-3 lg:px-4">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Auto login
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Update your password associated with your account.
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  name="auto_login"
                  className={classNames(
                    enabled ? 'bg-primary' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      enabled ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    )}
                  />
                </Switch>
                {enabled && (
                  <Fragment>
                    <div className="col-span-full">
                      <PasswordInput
                        id="login_pin"
                        name="login_pin"
                        autoComplete="off"
                        placeholder="enter login pin"
                        defaultValue={data.login_pin > 0 ? data.login_pin : ''}
                        required={true}
                      />
                    </div>

                    <div className="col-span-full">
                      <PasswordInput
                        id="auth_identity_token"
                        name="auth_identity_token"
                        autoComplete="off"
                        placeholder="auth identity token"
                        defaultValue={data.auth_identity_token}
                      />
                    </div>

                    <div className="col-span-full">
                      <PasswordInput
                        id="auth_identity_token_expiry"
                        name="auth_identity_token_expiry"
                        autoComplete="off"
                        placeholder="auth identity token expiry"
                        defaultValue={
                          data.auth_identity_token_expiry > 0
                            ? data.auth_identity_token_expiry
                            : ''
                        }
                      />
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 px-4 py-4 sm:px-8">
          <SubmitButton />
        </div>
      </form>
      <Modal open={open} onClose={onCloseModal} center>
        <h2>Simple centered modal</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
          hendrerit risus, sed porttitor quam.
        </p>
      </Modal>
    </Fragment>
  )
}
