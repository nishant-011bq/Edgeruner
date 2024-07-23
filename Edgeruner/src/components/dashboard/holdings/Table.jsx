'use client'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import React, { Fragment, useEffect, useState } from 'react'
import socket from '@/utils/socket'

export default function HoldingsTable({ data }) {
  // const [sortOrder, setSortOrder] = useState('asc') // 'asc' or 'desc'
  const [sortedData, setSortedData] = useState([])

  useEffect(() => {
    socket.on('message', (socketData) => {
      const updatedData = data.map((item) => {
        if (item.instrument_token === socketData.instrument_key) {
          return {
            ...item,
            ltp: socketData.ltpc.ltp,
          }
        }
        return item
      })
      setSortedData(updatedData)
    })
  }, [])

  return (
    <div className="shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
      <div className="px-6 py-4 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Holdings {data && data.length > 0 ? `(${data.length})` : ''}
          </h1>
        </div>
      </div>
      <div className="flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full pb-2 align-middle">
            <table className="min-w-full divide-y divide-gray-200 border-t border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    Symbol
                    {/* <button
                      className="group flex items-center gap-1"
                      onClick={() => sortBySymbol('symbol')}
                    >
                      Symbol
                      <span className="invisible flex-none rounded text-gray-500 group-hover:visible group-focus:visible">
                        {sortOrder !== 'desc' ? (
                          <ChevronDownIcon
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                        ) : (
                          <ChevronUpIcon
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </button> */}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Avg. price
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    LTP
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    P&L
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Net chg.
                  </th>
                </tr>
              </thead>
              {sortedData && sortedData.length > 0 ? (
                <Fragment>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {sortedData.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6 lg:pl-8">
                            {item.symbol ? item.symbol : '-'}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {item.quantity ? item.quantity : '-'}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {item.average_price
                              ? item.average_price.toFixed(2)
                              : '-'}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {item.ltp ? item.ltp.toFixed(2) : '-'}
                          </td>
                          <td
                            className={`whitespace-nowrap px-3 py-4 text-sm ${(item.ltp - item.average_price).toFixed(2) < 0 ? 'text-red-500' : 'text-green-500'}`}
                          >
                            {(item.ltp - item.average_price).toFixed(2)}
                          </td>
                          <td
                            className={`whitespace-nowrap px-3 py-4 text-sm ${
                              (
                                ((item.ltp - item.average_price) /
                                  item.average_price) *
                                100
                              ).toFixed(2) < 0
                                ? 'text-red-500'
                                : 'text-green-500'
                            }`}
                          >
                            {(
                              ((item.ltp - item.average_price) /
                                item.average_price) *
                              100
                            ).toFixed(2)}
                            %
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Fragment>
              ) : (
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td
                      colSpan="6"
                      className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500"
                    >
                      You don't have any holdings yet
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
