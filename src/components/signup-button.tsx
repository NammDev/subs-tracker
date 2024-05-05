'use client'

import { useEffect, useState } from 'react'

// import SignupModal from './modal/signup'
import { Button } from './ui/button'
import { User } from '@prisma/client'

export default function SignupButton({ user }: { user: User | null }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [user?.email])

  if (user?.email) return null

  return (
    <>
      {!loading ? (
        <Button
          className='font-medium'
          onClick={() => setOpen(!open)}
          variant={'default'}
          size={'sm'}
        >
          Sign in
        </Button>
      ) : null}
      {/* {open && !user?.email ? <SignupModal user={user} open={open} onHide={setOpen} /> : null} */}
    </>
  )
}
