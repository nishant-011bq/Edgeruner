'use client'
import Link from 'next/link'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { useRouter } from 'next/navigation'
import { endpoints } from '@/utils/endpoints'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import { convertEpochToDate } from '@/utils/helper'
import httpClient from '@/utils/httpClient'

export default function Login() {
  const router = useRouter()
  const redirectLink = Cookies.get('redirect_to')

  const [formConfig, setFormConfig] = useState({
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)

  const handleInputChange = (fieldName, value) => {
    setFormConfig((prevFormConfig) => ({
      ...prevFormConfig,
      [fieldName]: value,
    }))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    if (formConfig.email === '' || formConfig.password === '') {
      toast.error('Email address or password cannot be empty')
      return
    }

    setLoading(true)
    try {
      await toast.promise(httpClient().post(endpoints.auth.login, formConfig), {
        loading: 'Loggin...',
        success: (data) => {
          setLoading(false)
          const expirationTime = convertEpochToDate(data.access_token_expiry)
          Cookies.set('token', data.access_token, {
            expires: expirationTime,
          })

          const expirationDate = new Date()
          expirationDate.setTime(
            expirationDate.getTime() + 2 * 24 * 60 * 60 * 1000,
          )

          Cookies.set('refreshToken', data.refresh_token, {
            expires: expirationDate,
          })

          if (redirectLink) {
            router.push(redirectLink)
          } else {
            router.push('/dashboard')
          }

          return 'Successfully logged in'
        },
        error: (error) => {
          console.log(error)
          setLoading(false)
          return error.error.message
        },
      })
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Sign in to account"
      subtitle={
        <>
          Don’t have an account?{' '}
          <Link href="/register" className="text-primary">
            Sign up
          </Link>{' '}
          for a free trial.
        </>
      }
    >
      <form>
        <div className="space-y-6">
          <TextField
            className="col-span-full"
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formConfig.email}
            onChange={(value) => handleInputChange('email', value)}
          />
          <TextField
            className="col-span-full"
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={formConfig.password}
            onChange={(value) => handleInputChange('password', value)}
          />
        </div>
        <Button
          type="submit"
          color="cyan"
          className="mt-8 w-full"
          onClick={handleLogin}
          loading={loading}
        >
          Sign in to account
        </Button>
      </form>
    </AuthLayout>
  )
}
