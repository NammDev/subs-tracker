'use server'

import { currentUser } from '@clerk/nextjs/server'
import { db } from '../db'
import { SubscriptionsCreateSchemaType } from '../schemas/subscription'
import { getCachedAuthUser } from './users'
import { redirect } from 'next/navigation'
import { unstable_cache as cache, unstable_noStore as noStore, revalidateTag } from 'next/cache'

export const getSubscriptions = async () => {
  const user = await getCachedAuthUser()
  if (!user) {
    return []
  }

  return await cache(
    async () => {
      return db.subscription.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          renewalDate: 'asc',
        },
      })
    },
    ['subscriptions'],
    {
      tags: ['subscriptions'],
    }
  )()
}

export const createSubscription = async (subscription: SubscriptionsCreateSchemaType) => {
  const newSubscription = await db.subscription.create({
    data: {
      ...subscription,
    },
  })
  revalidateTag(`subscriptions`)
  return newSubscription
}

export const deleteSubscription = async (id: string) => {
  const user = await currentUser()
  if (!user) {
    redirect('/signin')
  }

  const subscription = await db.subscription.findUnique({
    where: {
      userId: user.id,
      id,
    },
  })

  if (!subscription) {
    throw new Error('bad request')
  }

  await db.subscription.delete({
    where: {
      id,
      userId: user.id,
    },
  })
  revalidateTag(`subscriptions`)
}
