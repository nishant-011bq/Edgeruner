'use client'
import React from 'react'
import { inputFormClasses } from '@/utils/constants'
import { SubmitButton } from '@/components/SubmitButton'
import toast from 'react-hot-toast'
import { accountUpdateAction } from '@/actions/actions'
import TableHeading from '../TableHeading'

export default function Profile({ data }) {
  const handleSumit = (formData) => {
    accountUpdateAction(formData).then((result) => {
      if (result.error) {
        toast.error(result.error.message)
      }
      if (result.data) {
        toast.success('Saved')
      }
    })
  }

  return (
    <form
      className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
      action={handleSumit}
    >
      <TableHeading heading="Profile" />
      <div className="px-4 py-6 sm:p-8">
        <div className="grid max-w-4xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="first_name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first_name"
                id="first_name"
                autoComplete="given-name"
                className={inputFormClasses}
                defaultValue={data.first_name}
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="last_name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="last_name"
                id="last_name"
                autoComplete="family-name"
                className={inputFormClasses}
                defaultValue={data.last_name}
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={inputFormClasses}
                defaultValue={data.email}
                disabled
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Phone Number
            </label>
            <div className="mt-2">
              <input
                id="phone"
                name="phone"
                type="number"
                autoComplete="phone"
                className={inputFormClasses}
                defaultValue={data.phone}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-x-6 px-4 py-4 sm:px-8">
        <SubmitButton />
      </div>
    </form>
  )
}
