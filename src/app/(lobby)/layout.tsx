import Header from '@/components/header'
import BottomBar from '@/components/bottom-bar'
import { createUser, getCachedAuthUser } from '@/lib/actions/users'

interface LobyLayoutProps
  extends React.PropsWithChildren<{
    modal: React.ReactNode
  }> {}

export default async function LobyLayout({ children }: LobyLayoutProps) {
  const userAuth = await getCachedAuthUser()
  if (!userAuth) return null
  const user = await createUser(userAuth.id)

  return (
    <>
      <div className='px-4 py-2 flex flex-col w-full md:max-w-lg m-auto'>
        <Header user={user} />
        {children}
      </div>
      <BottomBar user={user} />
    </>
  )
}
