'use client'

import { useRouter } from 'next/navigation'
import { SignOutButton } from '@clerk/nextjs'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export function LogOutButtons() {
  const router = useRouter()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return (
    <div className='flex w-full flex-col-reverse items-center gap-2 sm:flex-row'>
      <Button variant='secondary' size='sm' className='w-full' onClick={() => router.back()}>
        Go back
        <span className='sr-only'>Previous page</span>
      </Button>
      {mounted ? (
        <SignOutButton redirectUrl={`${window.location.origin}/?redirect=false`}>
          <Button size='sm' className='w-full'>
            Log out
            <span className='sr-only'>Log out</span>
          </Button>
        </SignOutButton>
      ) : (
        <Skeleton
          className={cn(buttonVariants({ size: 'sm' }), 'w-full bg-muted text-muted-foreground')}
        >
          Log out
        </Skeleton>
      )}
    </div>
  )
}
