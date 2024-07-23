'use client'
import clsx from 'clsx'
import { useId } from 'react'

const formClasses =
  'block w-full appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm'

function Label({ id, children }) {
  return (
    <label
      htmlFor={id}
      className="mb-2 block text-sm font-semibold text-gray-900"
    >
      {children}
    </label>
  )
}

export function TextField({
  label,
  type = 'text',
  className,
  value,
  onChange,
  ...props
}) {
  let id = useId()

  const handleChange = (event) => {
    onChange(event.target.value)
  }

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        {...props}
        className={formClasses}
      />
    </div>
  )
}

export function SelectField({ label, className, ...props }) {
  let id = useId()

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select id={id} {...props} className={clsx(formClasses, 'pr-8')} />
    </div>
  )
}
