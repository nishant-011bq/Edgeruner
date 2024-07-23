'use client'

import Link from 'next/link'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { endpoints } from '@/utils/endpoints'
import { useRouter } from 'next/navigation'
import httpClient from '@/utils/httpClient'

export default function Register() {
  const router = useRouter()

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
      await toast.promise(
        httpClient().post(endpoints.auth.signup, formConfig),
        {
          loading: 'Registering...',
          success: () => {
            setLoading(false)
            router.push('/login')
            return 'Successfully registered'
          },
          error: (error) => {
            setLoading(false)
            return error.error.message
          },
        },
      )
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Sign up for an account"
      subtitle={
        <>
          Already registered?{' '}
          <Link href="/login" className="text-primary">
            Sign in
          </Link>{' '}
          to your account.
        </>
      }
    >
      <form>
        <div className="grid grid-cols-2 gap-6">
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
          Register
        </Button>
      </form>
    </AuthLayout>
  )
}
