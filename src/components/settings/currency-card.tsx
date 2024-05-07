'use client'

import { CurrencyComboBox } from 'components/currency-combo'

import SettingsCard from './settings-card'
import { User } from '@prisma/client'
import { updateUserCurrency } from '@/lib/actions/users'

export default function CurrencyCard({ user }: { user: User | null }) {
  return (
    <SettingsCard className='flex flex-col !p-0'>
      <div className='flex flex-col pb-0 w-full p-3 px-4'>
        <h3 className='font-medium relative'>Default currency</h3>
        <div className='text-sm mt-1 text-muted-foreground'>
          Select your preferred currency to display.
        </div>
      </div>
      <div className='flex w-full justify-end border-t mt-4 border-border rounded-bl-lg rounded-br-lg p-2 px-3.5'>
        <CurrencyComboBox onSelect={updateUserCurrency} user={user} />
      </div>
    </SettingsCard>
  )
}
