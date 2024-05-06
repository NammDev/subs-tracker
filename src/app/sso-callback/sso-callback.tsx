'use client'

import * as React from 'react'
import { useClerk } from '@clerk/nextjs'
import { type HandleOAuthCallbackParams } from '@clerk/types'
import { Loader } from 'lucide-react'

interface SSOCallbackProps {
  searchParams: HandleOAuthCallbackParams
}

export function SSOCallback({ searchParams }: SSOCallbackProps) {
  const { handleRedirectCallback } = useClerk()

  React.useEffect(() => {
    void handleRedirectCallback(searchParams)
  }, [searchParams, handleRedirectCallback])

  return (
    <div
      role='status'
      aria-label='Loading'
      aria-describedby='loading-description'
      className='flex items-center justify-center'
    >
      <Loader className='size-16 animate-spin' aria-hidden='true' />
    </div>
  )
}
