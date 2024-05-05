import { getSubscriptions } from '@/lib/actions/subscriptions'
import { getCachedUser } from '@/lib/actions/users'
// import Card from 'components/card'
// import demoData from 'data/demo'

export default async function Page() {
  const [user, subscriptions] = await Promise.all([await getCachedUser(), await getSubscriptions()])
  console.log(user)
  console.log(subscriptions)

  return (
    <main className='flex flex-col mt-10'>
      {/* <Card user={user} subscriptions={user?.email ? subscriptions : demoData} /> */}
    </main>
  )
}
