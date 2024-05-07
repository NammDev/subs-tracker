import NavSkeleton from '@/components/skeleton/nav-skeleton'
import CardSkeleton from '@/components/skeleton/skeleton'
import { SearchInput } from '@/components/ui/search-input'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loader() {
  return (
    <main className='flex flex-col mt-10'>
      <div className='flex flex-col'>
        <h2 className='font-semibold text-lg tracking-wide flex items-center gap-1'>
          Total cost for subscriptions
        </h2>
        <div className='text-5xl mt-2 font-extrabold tabular-nums'>
          <Skeleton className='w-56 h-[48px] bg-accent' />
        </div>
      </div>
      <div className='flex flex-col my-8 mb-12'>
        <SearchInput disabled />
        <NavSkeleton />
        <div className='flex gap-3 flex-col w-full my-6'>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </main>
  )
}
