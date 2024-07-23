'use client'

import { useFormStatus } from 'react-dom'
import { Button } from './Button'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" color="cyan" className="mt-0" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </Button>
  )
}
