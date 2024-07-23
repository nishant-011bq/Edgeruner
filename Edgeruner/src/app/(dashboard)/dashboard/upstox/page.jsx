import React from 'react'
import { endpoints } from '@/utils/endpoints'
import httpServer from '@/utils/httpServer'
import Connect from '@/components/dashboard/upstox/connect'
import Settings from '@/components/dashboard/upstox/settings'
import { headers } from 'next/headers'
import { getUserData } from '@/actions/actions'

async function getData() {
  const headersList = headers()
  let token = headersList.get('x-access-token') || ''

  try {
    const res = await httpServer(token).get(endpoints.account.upstox)
    if (!res) {
      throw new Error('Failed to fetch data')
    }
    return res
  } catch (error) {
    return error
  }
}

export default async function Page() {
  const data = await getData()
  const user = await getUserData()

  return data?.error?.code === 'UPSTOX_ACCOUNT_NOT_FOUND' ||
    !data?.upstox_user_id ? (
    <Connect data={data} user={user} />
  ) : (
    <Settings data={data} />
  )
}
