'use client'

import { useState } from 'react'

import { DeleteIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import messages from '@/config/messages'
import { toast } from 'sonner'
import SettingsCard from './settings-card'
import { useClerk, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import DeleteAccountModal from '../modal/delete-account'
import { revalidatePath } from 'next/cache'

export default function DeleteCard() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signOut } = useClerk()
  const { user } = useUser()

  const onSubmit = async (email: string) => {
    try {
      setLoading(true)
      // const response = await fetch('/api/account/delete', {
      //   method: 'POST',
      //   body: JSON.stringify({ email }),
      // })
      // if (!response.ok) {
      //   throw new Error(messages.account.delete.error)
      // }
      signOut(() => router.push('/'))
      window.location.href = '/'
      revalidatePath('/')
    } catch (error) {
      toast.error(error?.toString() || messages.account.delete.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SettingsCard className='flex flex-col border-red-300 dark:border-red-500/30 !p-0'>
      <div className='flex flex-col pb-0 w-full p-3 px-4'>
        <h3 className='font-medium relative'>Delete My Account</h3>
        <div className='text-sm mt-1 text-muted-foreground'>
          Permanently delete your account and its data, this action cannot be undone.
        </div>
      </div>
      <div className='flex w-full bg-red-700/10 justify-end border-t mt-4 border-red-300 dark:border-red-500/30  rounded-bl-lg rounded-br-lg p-2 px-3.5'>
        <Button className='p-3 font-normal' variant='destructive' onClick={() => setOpen(!open)}>
          <DeleteIcon className='w-4 h-4 mr-2' />
          Delete
        </Button>
      </div>
      {open ? (
        <DeleteAccountModal
          loading={loading}
          open={true}
          setOpen={setOpen}
          emailId={user?.emailAddresses[0].emailAddress ?? undefined}
          onSubmit={onSubmit}
        />
      ) : null}
    </SettingsCard>
  )
}
