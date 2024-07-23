import { InformationCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function MessageStrip({ description }) {
  return (
    <div className="bg-gray-100 sm:rounded-lg">
      <div className="px-2 py-2 sm:px-4 sm:py-3">
        <div className="flex max-w-xl items-center gap-1 text-sm text-gray-500">
          <InformationCircleIcon
            className="hidden h-4 w-4 cursor-pointer text-gray-500 sm:block"
            aria-hidden="true"
          />
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}
