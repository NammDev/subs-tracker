import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'
import { Loader } from 'lucide-react'

export default function SSOCallbackPage() {
  return (
    <div className='grid items-center gap-8 pb-8 pt-6 lg:py-6 max-w-lg place-items-center'>
      <Loader className='size-16 animate-spin' aria-hidden='true' />

      <AuthenticateWithRedirectCallback />
    </div>
  )
}
