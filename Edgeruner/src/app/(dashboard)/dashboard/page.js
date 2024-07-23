import Stats from '@/components/dashboard/holdings/Stats'
import HoldingsTable from '@/components/dashboard/holdings/Table'
import { endpoints } from '@/utils/endpoints'
import httpServer from '@/utils/httpServer'
import { headers } from 'next/headers'
import React, { Fragment } from 'react'

async function getData() {
  const headersList = headers()
  let token = headersList.get('x-access-token') || ''

  try {
    const res = await httpServer(token).get(endpoints.holdings.getHoldings)
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

  return (
    <div className="flex flex-col gap-4">
      <Stats data={data} />
      <HoldingsTable data={data} />
    </div>
  )
}
