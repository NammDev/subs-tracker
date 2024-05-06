import { getSubscriptions } from '@/lib/actions/subscriptions'
import { getCachedUser } from '@/lib/actions/users'
import demoData from '@/data/demo'
import Card from '@/components/card'

export default async function Page() {
  const [user, subscriptions] = await Promise.all([await getCachedUser(), await getSubscriptions()])

  return (
    <main className='flex flex-col mt-10'>
      <Card user={user} subscriptions={user?.email ? subscriptions : demoData} />
    </main>
  )
}
