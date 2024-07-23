'use client'
import React, { useEffect, useState } from 'react'
import { inputFormClasses } from '@/utils/constants'
import { SubmitButton } from '@/components/SubmitButton'
import toast from 'react-hot-toast'
import { generalSettingsAction } from '@/actions/actions'
import TableHeading from '@/components/TableHeading'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { customSelectDropdownStyles } from '@/utils/helper'

const Select = dynamic(() => import('react-select'), { ssr: false })

export default function General({ data }) {
  const router = useRouter()
  const [selectedBuyStrategy, setSelectedBuyStrategy] = useState(null)

  const handleSumit = (formData) => {
    generalSettingsAction(formData, selectedBuyStrategy).then((result) => {
      if (result.error) {
        toast.error(result.error.message)
      }
      if (result.data) {
        router.refresh()
        toast.success('Saved')
      }
    })
  }

  const options = [
    { value: 'lower_recon', label: 'Lower Recommended Price' },
    { value: 'higher_recon', label: 'Higher Recommened Price' },
    { value: 'average_recon', label: 'Average Recommended Price' },
    {
      value: 'min_of_ltp_or_higher_recon',
      label: 'Min of LTP or Higher Recommended Price',
    },
  ]

  useEffect(() => {
    if (data?.buy_strategy) {
      const foundObject = options.find(
        (option) => option.value === data.buy_strategy,
      )
      setSelectedBuyStrategy(foundObject)
    }
  }, [data])

  return (
    <form
      className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
      action={handleSumit}
    >
      <TableHeading heading="General settings" />
      <div className="flex flex-col gap-y-10 pt-8 lg:px-4">
        <div className="grid max-w-4xl grid-cols-1 gap-x-8 gap-y-4 px-4 sm:px-6 md:grid-cols-3 lg:px-4">
          <div>
            <div className="flex items-center gap-1">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Trade Appetite
              </h2>
            </div>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Update your password associated with your account.
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full">
                <input
                  type="text"
                  name="trade_appetite"
                  id="trade_appetite"
                  autoComplete="given-name"
                  className={inputFormClasses}
                  defaultValue={data.trade_appetite.toLocaleString()}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid max-w-4xl grid-cols-1 gap-x-8 gap-y-4 px-4 sm:px-6 md:grid-cols-3 lg:px-4">
          <div>
            <div className="flex items-center gap-1">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Stock Price Appetite
              </h2>
            </div>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Update your password associated with your account.
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full">
                <input
                  type="text"
                  name="stock_price_appetite"
                  id="stock_price_appetite"
                  autoComplete="family-name"
                  className={inputFormClasses}
                  defaultValue={data.stock_price_appetite.toLocaleString()}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid max-w-4xl grid-cols-1 gap-x-8 gap-y-4 px-4 sm:px-6 md:grid-cols-3 lg:px-4">
          <div>
            <div className="flex items-center gap-1">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Buy Strategy
              </h2>
            </div>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Update your password associated with your account.
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full">
                <Select
                  id="buy_strategy"
                  name="buy_strategy"
                  options={options}
                  value={options.find(
                    (option) => option.value === selectedBuyStrategy?.value,
                  )}
                  onChange={(selectedOption) =>
                    setSelectedBuyStrategy(selectedOption)
                  }
                  isSearchable={false}
                  styles={customSelectDropdownStyles()}
                />
              </div>
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
