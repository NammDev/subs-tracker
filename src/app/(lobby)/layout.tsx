import Header from '@/components/header'
import BottomBar from '@/components/bottom-bar'
import { getCachedUser } from '@/lib/actions/users'

interface LobyLayoutProps
  extends React.PropsWithChildren<{
    modal: React.ReactNode
  }> {}

export default async function LobyLayout({ children }: LobyLayoutProps) {
  const userData = await getCachedUser()

  return (
    <>
      <div className='px-4 py-2 flex flex-col w-full md:max-w-lg m-auto'>
        <Header user={userData} />
        {children}
      </div>
      <BottomBar user={userData} />
    </>
  )
}
