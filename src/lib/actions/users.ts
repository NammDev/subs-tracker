'use server'

import { cache } from 'react'
import { unstable_noStore as noStore, revalidateTag } from 'next/cache'
import { currentUser } from '@clerk/nextjs/server'
import { db } from '../db'
import { getUserEmail } from '../utils'
import { User } from '@prisma/client'

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

export const updateUserCurrency = async (currencyCode: User['currencyCode']) => {
  try {
    const userData = await getCachedUser()
    const newUser = await db.user.update({
      where: {
        userId: userData?.userId as string,
      },
      data: {
        currencyCode,
      },
    })

    return newUser
  } catch (error) {
    throw new Error((error as Error).toString())
  }
}
