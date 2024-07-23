import { WalletIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function EmptyState() {
  return (
    <div className="grid min-h-full place-items-center py-24 sm:py-16">
      <div className="flex flex-col items-center justify-center text-center">
        <WalletIcon className="h-20 w-20 text-gray-400" />
        <p className="mt-6 text-base leading-7 text-gray-600">
          You don't have any holdings yet
        </p>
      </div>
    </div>
  )
}
