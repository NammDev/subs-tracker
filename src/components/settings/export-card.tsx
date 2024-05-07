'use client'

import { useState } from 'react'

// import { exportSubscriptions } from 'app/actions/subscriptions'
// import { exportAsCSV } from 'lib/export'
import { ExportIcon } from '@/components/icons'
import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

import SettingsCard from './settings-card'

export default function ExportCard() {
  const [loading, setLoading] = useState(false)

  const onClickHandler = async () => {
    try {
      setLoading(true)
      toast.info('Your subscriptions will be exported shortly.')
      // const data = await exportSubscriptions()
      // exportAsCSV(data, `subs-is-subscriptions`)
    } catch (error) {
      toast.error(error?.toString())
    } finally {
      setLoading(false)
    }
  }

  return (
    <SettingsCard className='flex flex-col !p-0'>
      <div className='flex flex-col pb-0 w-full p-3 px-4'>
        <h3 className='font-medium relative'>Export data</h3>
        <div className='text-sm mt-1 text-muted-foreground'>
          Instantly export your subscriptions and its data as CSV file.
        </div>
      </div>
      <div className='flex w-full justify-end border-t mt-4 border-border p-2 px-3.5'>
        <Button className='px-3 gap-2 font-normal' variant='outline' onClick={onClickHandler}>
          {loading ? <Loader className='w-4 h-4' /> : <ExportIcon className='w-4 h-4' />} Export
        </Button>
      </div>
    </SettingsCard>
  )
}
