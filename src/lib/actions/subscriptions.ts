'use server'

import { db } from '../db'
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
