import { ArrowRight, TicketPercent } from 'lucide-react'
import { Link } from 'react-router-dom'

const NotificationBar = () => {
  return (
    <div className='h-[40px] bg-neutral-2 flex justify-center items-center w-full m-0 font-semibold sm:px-0 px-[32px]'>
      <div className='flex justify-center items-center mr-4'>
        <TicketPercent className='mr-2 h-auto' />
        <span className='text-[12px] sm:caption-1-semi'>30% off storewide — Limited time! </span>
      </div>
      <div className='hidden md:flex justify-center items-center button-xs underline'>
        <Link className='mr-1' to=''>
          Shop Now
        </Link>
        <ArrowRight className='h-[18px]' />
      </div>
    </div>

  )
}

export default NotificationBar
