'use server'

import { endpoints } from '@/utils/endpoints'
import httpServer from '@/utils/httpServer'
import { headers } from 'next/headers'

export async function accountUpdateAction(formData) {
  const headersList = headers()
  let token = headersList.get('x-access-token') || ''

  try {
    const rawFormData = {
      email: formData.get('email'),
      ...(formData.get('first_name') && {
        first_name: formData.get('first_name'),
      }),
      ...(formData.get('last_name') && {
        last_name: formData.get('last_name'),
      }),
      ...(formData.get('phone') && {
        phone: formData.get('phone'),
      }),
    }

    const data = await httpServer(token).patch(endpoints.user.me, rawFormData)
    return { data: data }
  } catch (error) {
    return { error: error }
  }
}

export async function upstoxUpdateAction(formData, enabled) {
  const headersList = headers()
  let token = headersList.get('x-access-token') || ''

  try {
    const rawFormData = {
      auto_login: enabled,
      ...(formData.get('upstox_api_key') && {
        upstox_api_key: formData.get('upstox_api_key'),
      }),
      ...(formData.get('upstox_api_secret') && {
        upstox_api_secret: formData.get('upstox_api_secret'),
      }),
      ...(formData.get('access_token') && {
        access_token: formData.get('access_token'),
      }),
      ...(formData.get('auth_identity_token') && {
        auth_identity_token: formData.get('auth_identity_token'),
      }),
      ...(formData.get('auth_identity_token_expiry') && {
        auth_identity_token_expiry: formData.get('auth_identity_token_expiry'),
      }),

      ...(formData.get('login_pin') && {
        login_pin: formData.get('login_pin'),
      }),
    }

    const data = await httpServer(token).patch(
      endpoints.account.upstox,
      rawFormData,
    )
    return { data: data }
  } catch (error) {
    return { error: error.error }
  }
}

export async function upstoxConnectAction(formData) {
  const headersList = headers()
  let token = headersList.get('x-access-token') || ''

  try {
    const rawFormData = {
      upstox_api_key: formData.get('upstox_api_key'),
      upstox_api_secret: formData.get('upstox_api_secret'),
    }

    const data = await httpServer(token).patch(
      endpoints.account.upstox,
      rawFormData,
    )
    return { data: data }
  } catch (error) {
    return { error: error.error }
  }
}

export async function generalSettingsAction(formData, selectedBuyStrategy) {
  const headersList = headers()
  let token = headersList.get('x-access-token') || ''

  try {
    const rawFormData = {
      ...(formData.get('trade_appetite') && {
        trade_appetite: formData.get('trade_appetite').replace(/,/g, ''),
      }),
      ...(formData.get('stock_price_appetite') && {
        stock_price_appetite: formData
          .get('stock_price_appetite')
          .replace(/,/g, ''),
      }),
    }

    if (selectedBuyStrategy && selectedBuyStrategy !== undefined) {
      rawFormData.buy_strategy = selectedBuyStrategy.value
    }

    const data = await httpServer(token).patch(
      endpoints.account.trade,
      rawFormData,
    )
    return { data: data }
  } catch (error) {
    return { error: error.error }
  }
}

export async function revokeTelegramAction() {
  const headersList = headers()
  let token = headersList.get('x-access-token') || ''

  try {
    const data = await httpServer(token).delete(endpoints.account.telegram)
    return { data: data }
  } catch (error) {
    return { error: error.error }
  }
}

export async function rotateTelegramPasscode() {
  const headersList = headers()
  let token = headersList.get('x-access-token') || ''

  try {
    const data = await httpServer(token).patch(endpoints.account.telegram)
    return { data: data }
  } catch (error) {
    return { error: error.error }
  }
}

export async function removeLoggedInDevice(uuid) {
  const headersList = headers()
  let token = headersList.get('x-access-token') || ''

  try {
    const data = await httpServer(token).delete(
      endpoints.devices.deleteLoggedInDevice.replace(':uuid', uuid),
    )
    return { data: data }
  } catch (error) {
    return { error: error.error }
  }
}

export async function disableTelegramNotifications(value) {
  const headersList = headers()
  let token = headersList.get('x-access-token') || ''

  try {
    const data = await httpServer(token).patch(
      endpoints.notifications.disabledNotifications,
      { key: value },
    )
    return { data: data }
  } catch (error) {
    return { error: error.error }
  }
}

export async function getUserData() {
  const headersList = headers()
  let token = headersList.get('x-access-token') || ''

  const res = await httpServer(token).get(endpoints.user.me)
  if (!res) {
    throw new Error('Failed to fetch data')
  }

  return res
}
