import AccountCard from '@/components/settings/account-card'
import Appearance from '@/components/settings/appearance-card'
import CurrencyCard from '@/components/settings/currency-card'
import DeleteCard from '@/components/settings/delete-card'
import ExportCard from '@/components/settings/export-card'
import { getCachedAuthUser, getCachedUser } from '@/lib/actions/users'

export default async function Page() {
  const [authUser, userData] = await Promise.all([await getCachedAuthUser(), await getCachedUser()])

  return (
    <div className='flex flex-col my-10 gap-2'>
      <div className='border-border flex flex-col'>
        <h2 className='font-semibold mb-2'>General</h2>
        <div className='flex gap-4 flex-col'>
          <AccountCard user={userData} />
          <Appearance />
          <CurrencyCard user={userData} />
          <ExportCard />
        </div>
      </div>
      <div className='border-border mt-5 pb-24 flex flex-col'>
        <h2 className='font-semibold mb-2'>Danger Zone</h2>
        <div className='flex gap-4 flex-col'>
          <DeleteCard />
        </div>
      </div>
    </div>
  )
}
