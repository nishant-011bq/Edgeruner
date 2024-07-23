import {
  calculateCurrentInvestmentValue,
  calculateProfitLossPercentage,
  calculateTotalInvestedValue,
} from '@/utils/helper'
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  CircleStackIcon,
} from '@heroicons/react/24/outline'
import React from 'react'

export default function Stats({ data }) {
  const items = [
    {
      name: 'Total investment',
      stat: data.length ? calculateTotalInvestedValue(data) : 0,
      icon: <BanknotesIcon className="h-4 w-4 cursor-pointer text-gray-500" />,
    },
    {
      name: 'Current value',
      stat: data.length ? calculateCurrentInvestmentValue(data) : 0,
      icon: (
        <CircleStackIcon className="h-4 w-4 cursor-pointer text-gray-500" />
      ),
    },
    {
      name: 'Total P&L',
      stat: data.length
        ? calculateProfitLossPercentage(
            calculateTotalInvestedValue(data),
            calculateCurrentInvestmentValue(data),
          ) + '%'
        : 0,
      color: data.length
        ? calculateProfitLossPercentage(
            calculateTotalInvestedValue(data),
            calculateCurrentInvestmentValue(data),
          ) < 0
          ? 'text-red-500'
          : 'text-green-500'
        : 'text-gray-900',
      icon: data.length ? (
        calculateProfitLossPercentage(
          calculateTotalInvestedValue(data),
          calculateCurrentInvestmentValue(data),
        ) < 0 ? (
          <ArrowTrendingDownIcon className="h-5 w-5 cursor-pointer text-red-500" />
        ) : (
          <ArrowTrendingUpIcon className="h-5 w-5 cursor-pointer text-green-500" />
        )
      ) : (
        <></>
      ),
    },
  ]

  return (
    <div>
      <dl className="grid grid-cols-1 divide-y divide-gray-200 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:grid-cols-3 md:divide-x md:divide-y-0">
        {items.map((item) => {
          return (
            <div key={item.name} className="px-4 py-5 sm:p-6">
              <dt className="flex items-center gap-1 text-base font-normal text-gray-500">
                {item.icon}
                {item.name}
              </dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div
                  className={`flex items-baseline text-2xl font-semibold ${item.color ? item.color : 'text-gray-900'}`}
                >
                  {item.stat}
                </div>
              </dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
