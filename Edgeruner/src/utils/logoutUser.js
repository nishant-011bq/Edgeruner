'use client'
import Cookies from 'js-cookie'

export const logoutUser = async () => {
  Cookies.remove('token')
  Cookies.remove('refreshToken')
  window.location.href = '/login'
}

export const logoutUserWithoutAPI = async () => {
  Cookies.remove('token')
  Cookies.remove('refreshToken')
  window.location.href = '/login'
}
