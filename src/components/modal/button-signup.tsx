import { GoogleIcon } from '@/components/icons'
import Loader from '@/components/loader'
import { cn } from '@/lib/utils'

type ButtonProps = {
  loading: boolean
  onClick: () => void
}

export const ButtonSignup = ({ loading, onClick }: ButtonProps) => {
  return (
    <button
      className={cn(
        `items-center gap-2 mt-4 max-w-sm justify-center text-sm transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 hover:bg-primary/90 active:scale-[0.98] rounded-xl bg-primary px-6 py-4 text-secondary font-medium flex space-x-2 h-[42px] w-full`,
        {
          'bg-primary/80 cursor-default': loading,
        }
      )}
      onClick={onClick}
    >
      {loading ? <Loader className='text-white dark:text-black' /> : <GoogleIcon />}
      Continue with Google
    </button>
  )
}
