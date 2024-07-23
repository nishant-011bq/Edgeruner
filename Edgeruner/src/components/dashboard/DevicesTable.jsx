'use client'
import moment from 'moment'
import { DATE_FORMAT_WITH_TIME } from '@/utils/constants'
import { useEffect, useState } from 'react'
import UAParser from 'ua-parser-js'
import toast from 'react-hot-toast'
import { removeLoggedInDevice } from '@/actions/actions'
import Cookies from 'js-cookie'

export default function DevicesTable({ data }) {
  const refreshToken = Cookies.get('refreshToken')
  const [pending, setPending] = useState(false)
  const [parsedData, setParsedData] = useState([])

  useEffect(() => {
    const parseUserAgents = () => {
      const parser = new UAParser()
      const newData = data.map((item) => {
        parser.setUA(item.user_agent)
        const userAgentInfo = parser.getResult()
        return { ...item, userAgentInfo }
      })
      setParsedData(newData)
    }

    parseUserAgents()
  }, [data])

  const deleteLoggedDevice = (uuid) => {
    setPending((prevItemPending) => ({
      ...prevItemPending,
      [uuid]: true, // Set pending state to true for the specific item
    }))

    removeLoggedInDevice(uuid).then((result) => {
      if (result.error) {
        setPending((prevItemPending) => ({
          ...prevItemPending,
          [uuid]: false,
        }))
        toast.error(result.error.message)
      }
      if (result.data) {
        // Remove the item from parsedData
        const updatedParsedData = parsedData.filter(
          (item) => item.uuid !== uuid,
        )

        setParsedData(updatedParsedData)

        setPending((prevItemPending) => ({
          ...prevItemPending,
          [uuid]: false, // Reset pending state for the specific item
        }))
        toast.success('Device removed successfully')
      }
    })
  }

  return (
    <div className="shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
      <div className="p-6 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Active devices
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the devices that you are logged in.
          </p>
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
                    Browser
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    OS
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Last used
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    City
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Country
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {parsedData.map((item) => (
                  <tr key={item.uuid}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6 lg:pl-8">
                      {item.userAgentInfo.browser.name} (
                      {item.userAgentInfo.browser.version})
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.userAgentInfo.os.name} (
                      {item.userAgentInfo.os.version})
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.last_used
                        ? moment(item.last_used).format(DATE_FORMAT_WITH_TIME)
                        : '-'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.city ? item.city : '-'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.country ? item.country : '-'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {refreshToken.endsWith(item.token_ends_with) ? (
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Current device
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-500 hover:bg-red-100 disabled:cursor-default disabled:opacity-60"
                          onClick={() => deleteLoggedDevice(item.uuid)}
                          disabled={pending[item.uuid]}
                        >
                          {pending[item.uuid] ? 'Deleting...' : 'Delete'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
