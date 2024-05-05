'use server'

import { db } from '../db'
import { getCachedUser } from './users'

export const getSubscriptions = async () => {
  const user = await getCachedUser()
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
