import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Icon } from './icons'
import Profile from './profile'
import SignupButton from './signup-button'
import { User } from '@prisma/client'
import FeedbackModal from './modal/feedback'

export default async function Header({ user }: { user: User | null }) {
  return (
    <header className={cn(`flex h-9 mt-1 relative justify-between items-center`)}>
      <Link
        className='active:opacity-85 -mt-0.5 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md'
        href='/'
      >
        <h1 className='font-black flex items-center gap-2 text-pink-600 text-2xl'>
          <Icon /> <span>Subs Tracker</span>
        </h1>
      </Link>
      <div className='flex items-center gap-4'>
        <FeedbackModal user={user} />
        <Profile user={user} />
        <SignupButton user={user} />
      </div>
    </header>
  )
}
