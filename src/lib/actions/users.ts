import 'server-only'

import { cache } from 'react'
import { unstable_noStore as noStore } from 'next/cache'
import { currentUser } from '@clerk/nextjs/server'
import { db } from '../db'

export const getCachedUser = cache(async () => {
  noStore()
  try {
    const user = await currentUser()
    if (!user) {
      return null
    }
    return db.user.findUnique({
      where: { userId: user.id },
    })
  } catch {
    return null
  }
})

export const getCachedAuthUser = cache(async () => {
  noStore()
  try {
    return await currentUser()
  } catch (err) {
    console.error(err)
    return null
  }
})
