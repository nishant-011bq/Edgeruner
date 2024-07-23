'use client'

import React, { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { inputFormClasses } from '@/utils/constants'

const PasswordInput = ({
  id,
  name,
  autoComplete,
  placeholder,
  defaultValue,
  required,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="relative">
      {defaultValue !== '' &&
        (showPassword ? (
          <EyeIcon
            className="absolute right-3 my-2.5 h-4 w-4"
            onClick={toggleShowPassword}
          />
        ) : (
          <EyeSlashIcon
            className="absolute right-3 my-2.5 h-4 w-4"
            onClick={toggleShowPassword}
          />
        ))}

      <input
        type={showPassword ? 'text' : 'password'}
        name={name}
        id={id}
        autoComplete={autoComplete || 'off'}
        placeholder={placeholder}
        className={inputFormClasses}
        defaultValue={defaultValue}
        required={required}
      />
    </div>
  )
}

export default PasswordInput
