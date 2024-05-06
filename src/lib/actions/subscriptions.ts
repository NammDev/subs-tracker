'use server'

import { db } from '../db'
import { SubscriptionsCreateSchemaType } from '../schemas/subscription'
import { getCachedAuthUser } from './users'

export const getSubscriptions = async () => {
  const user = await getCachedAuthUser()
  if (!user) {
    return []
  }

  return db.subscription.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      renewalDate: 'asc',
    },
  })
}

export const createSubscription = async (subscription: SubscriptionsCreateSchemaType) => {
  return await db.subscription.create({
    data: {
      ...subscription,
    },
  })
}
