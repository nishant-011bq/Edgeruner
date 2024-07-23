import React from 'react'
import DevicesTable from '@/components/dashboard/DevicesTable'
import { endpoints } from '@/utils/endpoints'
import httpServer from '@/utils/httpServer'
import { headers } from 'next/headers'

async function getData() {
  const headersList = headers()
  let token = headersList.get('x-access-token') || ''

  try {
    const res = await httpServer(token).get(
      endpoints.devices.getLoggedInDevices,
    )
    if (!res) {
      throw new Error('Failed to fetch data')
    }
    return res
  } catch (error) {
    return error
  }
}

export default async function page() {
  const data = await getData()

  return <DevicesTable data={data} />
}
