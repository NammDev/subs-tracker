'use client'

import Image from 'next/image'
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { socialUrls } from '@/config/urls'

import { GithubIcon, HelpIcon, LogoutIcon } from './icons'
import { User } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function Profile({ user }: { user: User | null }) {
  if (!user?.email) return null

  const initials = `${user?.firstName?.charAt(0) ?? ''} ${user?.lastName?.charAt(0) ?? ''}`

  const logout = async () => {
    // const supabase = createClient()
    // await supabase.auth.signOut()
    // window.location.href = '/'
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className='rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'>
          {user?.imageUrl ? (
            <Image
              priority
              className='h-9 w-9 rounded-full border border-input'
              src={user?.imageUrl ?? `/images/avatar.svg`}
              alt={user?.firstName ?? 'Demo account'}
              width={36}
              height={36}
              style={{ maxWidth: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Avatar className='size-8'>
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem>
            <Link className='flex items-center' target='_blank' href={socialUrls.github}>
              <GithubIcon className='h-4 w-4 mr-2' />
              Source
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className='flex items-center' target='_blank' href={socialUrls.help}>
              <HelpIcon className='h-4 w-4 mr-2' />
              Help
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>
            <LogoutIcon className='h-4 w-4 mr-2' />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
