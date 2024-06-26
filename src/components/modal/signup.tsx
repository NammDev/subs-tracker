'use client'

import { useState } from 'react'
import Link from 'next/link'
import { type OAuthStrategy } from '@clerk/types'
import { Icon } from '@/components/icons'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { urls } from '@/config/urls'
import { User } from '@prisma/client'
import { useSignIn } from '@clerk/nextjs'
import { ButtonSignup } from './button-signup'

type SignupModalProps = {
  open: boolean
  onHide: (open: boolean) => void
  user: User | null
}

export default function SignupModal({ open, onHide, user }: SignupModalProps) {
  const [loading, setLoading] = useState(false)
  const { isLoaded, signIn } = useSignIn()

  if (user?.email) return null

  async function oauthSignIn(provider: OAuthStrategy) {
    if (!isLoaded) return null
    try {
      setLoading(true)
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/',
      })
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onHide}>
      <DialogContent className='max-w-sm w-[calc(100%-20px)] bg-background rounded-xl'>
        <DialogHeader>
          <DialogTitle className='tracking-normal items-center flex-col justify-center flex'>
            <div className='rounded-full bg-pink-100 dark:bg-pink-700/30 mb-2 w-14 h-14 flex items-center justify-center'>
              <Icon className='text-pink-600 w-11 h-11 p-1' />
            </div>
            <div className='font-black flex items-center gap-2 text-pink-600 text-2xl tracking-tight'>
              <span className='mt-0.5'>Subs Tracker</span>
            </div>
            <DialogDescription className='mt-0.5 text-sm text-muted-foreground'>
              Welcome, Sign in below.
            </DialogDescription>
          </DialogTitle>
        </DialogHeader>
        <ButtonSignup loading={loading} onClick={() => void oauthSignIn('oauth_google')} />
        <p className='text-muted-foreground font-medium mt-1 text-xs max-w-sm w-full leading-5 text-center'>
          By clicking continue, you acknowledge that you have read and agree to{' '}
          <Link
            onClick={() => onHide(false)}
            className='underline hover:text-primary active:text-primary transition-colors'
            href={`${urls.home}/terms`}
          >
            Terms of Service
          </Link>{' '}
          &{' '}
          <Link
            onClick={() => onHide(false)}
            className='underline hover:text-primary active:text-primary transition-colors'
            href={`${urls.home}/privacy`}
          >
            Privacy Policy
          </Link>
          .
        </p>
      </DialogContent>
    </Dialog>
  )
}
