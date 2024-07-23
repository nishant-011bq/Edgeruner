import General from '@/components/dashboard/settings/general'
import { endpoints } from '@/utils/endpoints'
import httpServer from '@/utils/httpServer'
import { headers } from 'next/headers'
import React from 'react'


async function getData() {
  const headersList = headers();
  let token = headersList.get('x-access-token') || '';

  try {
    const res = await httpServer(token).get(endpoints.account.trade)
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

  return <General data={data} />
}
