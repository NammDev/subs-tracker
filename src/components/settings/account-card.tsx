import Image from 'next/image'
import SettingsCard from './settings-card'
import { User } from '@prisma/client'

// https://stackoverflow.com/a/33919020/266535
const blurDataURL = `data:image/gif;base64,R0lGODlhAQABAPAAABsbG////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

export default async function AccountCard({ user }: { user: User | null }) {
  const fullName = `${user?.firstName} ${user?.lastName}`
  return (
    <SettingsCard className='h-[86px] px-3'>
      <div className='flex gap-3 w-full items-center'>
        <Image
          className='h-12 w-12 rounded-full border border-input'
          src={user?.imageUrl ?? `/images/avatar.svg`}
          alt={fullName ?? 'Demo account'}
          width={100}
          height={100}
          placeholder='blur'
          blurDataURL={blurDataURL}
          style={{ maxWidth: '100%', objectFit: 'fill' }}
        />
        <div className='grid max-w-sm w-full'>
          <div className='font-medium truncate pr-4' title={fullName ?? 'Demo account'}>
            {fullName ?? 'Demo account'}
          </div>
          <div
            className='text-sm truncate pr-4 text-muted-foreground'
            title={user?.email ?? 'support@subs.is'}
          >
            {user?.email ?? 'support@subs.is'}
          </div>
        </div>
      </div>
    </SettingsCard>
  )
}
