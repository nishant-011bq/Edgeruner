import React from 'react'

export default function TableHeading({ heading }) {
  return (
    <div className="border-b border-gray-200 px-6 py-3">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        {heading}
      </h3>
    </div>
  )
}
