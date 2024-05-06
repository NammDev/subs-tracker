'use server'

import { cache } from 'react'
import { unstable_noStore as noStore } from 'next/cache'
import { currentUser } from '@clerk/nextjs/server'
import { db } from '../db'
import { getUserEmail } from '../utils'

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

export async function getUser(userId: string) {
  return db.user.findUnique({
    where: {
      userId: userId,
    },
  })
}

export async function createUser() {
  const userAuth = await getCachedAuthUser()
  return db.user.create({
    data: {
      userId: userAuth?.id as string,
      currencyCode: 'USD',
      email: getUserEmail(userAuth),
      imageUrl: userAuth?.imageUrl,
      firstName: userAuth?.firstName,
      lastName: userAuth?.lastName,
    },
  })
}
