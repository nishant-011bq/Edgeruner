import React from 'react'
import { endpoints } from '@/utils/endpoints'
import httpServer from '@/utils/httpServer'
import { headers } from 'next/headers'
import Connect from '@/components/dashboard/telegram/connect'

async function getData() {
  const headersList = headers()
  let token = headersList.get('x-access-token') || ''

  try {
    const res = await httpServer(token).get(endpoints.account.telegram)
    if (!res) {
      throw new Error('Failed to fetch data')
    }
    return res
  } catch (error) {
    return error
  }
}

async function getAllNotificationsData() {
  const headersList = headers()
  let token = headersList.get('x-access-token') || ''

  try {
    const res = await httpServer(token).get(
      endpoints.notifications.getAllNotifications,
    )
    if (!res) {
      throw new Error('Failed to fetch data')
    }
    return res
  } catch (error) {
    return error
  }
}

async function getDisabledNotifications() {
  const headersList = headers()
  let token = headersList.get('x-access-token') || ''

  try {
    const res = await httpServer(token).get(
      endpoints.notifications.disabledNotifications,
    )
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
  const notifications = await getAllNotificationsData()
  const disabledNotifications = await getDisabledNotifications()

  return (
    <Connect
      data={data}
      notifications={notifications}
      disabledNotifications={disabledNotifications}
    />
  )
}
