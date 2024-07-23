'use server'

import { NextResponse } from 'next/server'
import { API_ROOT } from './utils/constants'
import { endpoints } from './utils/endpoints'
import { convertEpochToDate } from './utils/helper'

const protectedRoutes = [
  '/dashboard',
  '/dashboard/profile',
  '/dashboard/general',
  '/dashboard/upstox',
  '/dashboard/telegram',
  '/dashboard/devices',
]

async function refreshTokenApi(refreshToken) {
  try {
    const apiResponse = await fetch(API_ROOT + endpoints.auth.refresh, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh_token: refreshToken.value,
      }),
    })

    if (!apiResponse) {
      console.error('API request failed:', apiResponse.statusText)
      return null
    }

    const apiData = await apiResponse.json()
    return apiData
  } catch (error) {
    console.error('Error in refreshTokenApi:', error)
    return null
  }
}

function logoutAndRedirectToLogin(request) {
  const currentPath = request.nextUrl.pathname // Get the current path
  const response = NextResponse.redirect(new URL('/login', request.url))
  response.cookies.set('redirect_to', currentPath) // Save the current path to a cookie
  response.cookies.set('token', '', { expires: new Date(0) })
  response.cookies.set('refreshToken', '', { expires: new Date(0) })
  return response
}

export async function middleware(request) {
  let accessToken = request.cookies.get('token')
  let refreshToken = request.cookies.get('refreshToken')

  const path = request.nextUrl.pathname

  // if there is no refresh token and the path is a protected route, redirect to login
  if (!refreshToken && protectedRoutes.indexOf(path) !== -1)
    return logoutAndRedirectToLogin(request)

  // if there is no access token but there is a refresh token, get a new access token
  let newAccessTokenExpiry = null
  let apiData = null
  if (!accessToken && refreshToken) {
    apiData = await refreshTokenApi(refreshToken)
    if (apiData && !apiData.error) {
      accessToken = apiData.access_token
      newAccessTokenExpiry = convertEpochToDate(apiData.access_token_expiry)
    } else {
      // redirecting to login page if refresh token is expired
      return logoutAndRedirectToLogin(request)
    }
  } else if (accessToken) {
    accessToken = accessToken.value
  }

  // if the path is /dashboard, redirect to /dashboard/profile
  if ((path === '/dashboard/' || path === '/login') && refreshToken) {
    let response = NextResponse.redirect(new URL('/dashboard/', request.url))
    if (newAccessTokenExpiry) {
      response.cookies.set('token', accessToken, {
        expires: convertEpochToDate(apiData.access_token_expiry),
      })
    }
    return response
  }

  // if there is an access token, set it in the request headers
  const requestHeaders = new Headers(request.headers)
  if (accessToken) {
    requestHeaders.set('x-access-token', `${accessToken}`)
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // if there is a new access token expiry, set it in the response cookies
  if (newAccessTokenExpiry) {
    response.cookies.set('token', accessToken, {
      expires: newAccessTokenExpiry,
    })
  }

  return response
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/dashboard',
    '/dashboard/general',
    '/dashboard/profile',
    '/dashboard/upstox',
    '/dashboard/telegram',
    '/dashboard/devices',
  ],
}
