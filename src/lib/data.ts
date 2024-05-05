import { navFilter, paymentCycleConfig } from '@/config/data'
import { Subscription } from '@prisma/client'
import {
  addMonths,
  addQuarters,
  addWeeks,
  addYears,
  format,
  isAfter,
  isBefore,
  isSameDay,
  set,
  subDays,
  subMonths,
  subQuarters,
  subYears,
} from 'date-fns'

export const filterDataBySearch = (data: Subscription[], searchText: string) => {
  if (!searchText.length) return data
  return data.filter((sub) => sub.name.toLowerCase().includes(searchText.toLowerCase()))
}

export const filterDataByNav = (data: Subscription[], filterBy: keyof typeof navFilter) => {
  if (filterBy === navFilter.upcoming.key) {
    const today = subDays(new Date(), 1)
    const twoWeeks = addWeeks(today, 2)
    return data.filter((sub) => {
      const renewalDate = new Date(sub.renewalDate ?? '')
      return isAfter(renewalDate, today) && isBefore(renewalDate, twoWeeks)
    })
  }

  return data
    .filter((sub) => filterBy === navFilter.all.key || sub.paymentCycle === filterBy)
    .sort((a, b) => {
      const renewalDateA = a?.renewalDate?.toString() ?? ''
      const renewalDateB = b?.renewalDate?.toString() ?? ''
      return renewalDateA.localeCompare(renewalDateB)
    })
}

export const calculateRenewalDate = (start_date: string, paymentCycle: string): string => {
  const startDate = new Date(start_date)
  const today = new Date()
  let renewalDate
  switch (paymentCycle) {
    case paymentCycleConfig.monthly.key:
      renewalDate = set(startDate, { month: today.getMonth(), year: today.getFullYear() })
      if (isBefore(renewalDate, today) && !isSameDay(renewalDate, today)) {
        renewalDate = addMonths(renewalDate, 1)
      }
      break
    case paymentCycleConfig.yearly.key:
      renewalDate = set(startDate, { year: today.getFullYear() })
      if (isBefore(renewalDate, today) && !isSameDay(renewalDate, today)) {
        renewalDate = addYears(renewalDate, 1)
      }
      break
    case paymentCycleConfig.quarterly.key:
      renewalDate = set(startDate, { year: today.getFullYear() })
      if (isBefore(renewalDate, today) && !isSameDay(renewalDate, today)) {
        renewalDate = addQuarters(renewalDate, 1)
      }
      break
    default:
      throw new Error('Unsupported payment cycle')
  }

  return format(renewalDate, 'yyyy-MM-dd')
}

export const calculatePrevRenewalDate = (
  billing_date: string,
  renewalDate: string,
  paymentCycle: string
): string => {
  const startDate = new Date(billing_date)
  // const renewalDate = new Date(renewalDate)
  let prevRenewalDate

  if (isSameDay(startDate, renewalDate)) {
    return format(renewalDate, 'yyyy-MM-dd')
  }

  switch (paymentCycle) {
    case paymentCycleConfig.monthly.key:
      prevRenewalDate = subMonths(renewalDate, 1)
      break
    case paymentCycleConfig.yearly.key:
      prevRenewalDate = subYears(renewalDate, 1)
      break
    case paymentCycleConfig.quarterly.key:
      prevRenewalDate = subQuarters(renewalDate, 1)
    default:
      throw new Error('Unsupported payment cycle')
  }

  return format(prevRenewalDate, 'yyyy-MM-dd')
}

export const activeFilter = (subscription: Subscription) => subscription.active
export const inActiveFilter = (subscription: Subscription) => !subscription.active
