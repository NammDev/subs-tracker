import { SummaryNumber } from './summary-number'
import { getCurrencySymbol } from '@/lib/numbers'

import InfoTooltip from './info-tooltip'
import { Subscription, User } from '@prisma/client'

type SummaryProps = {
  subscriptions: Subscription[]
  user: User | null
}

export default function Summary({ subscriptions, user }: SummaryProps) {
  const totalCost = subscriptions.reduce((acc, curr) => acc + parseFloat(curr.cost), 0)

  return (
    <div className='flex flex-col'>
      <h2 className='font-semibold text-lg tracking-wide relative w-fit flex items-center gap-1'>
        Total cost for subscriptions <InfoTooltip />
      </h2>
      <div className='text-5xl flex mt-2'>
        <span className='mr-1 font-sans font-bold'>{getCurrencySymbol(user?.currencyCode)}</span>
        <SummaryNumber from={0} to={totalCost} />
      </div>
    </div>
  )
}
