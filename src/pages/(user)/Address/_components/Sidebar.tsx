import AvatarAccount from '@/components/auth/AvatarAccount'
import { Button } from '@/components/ui/button'
import { Camera } from 'lucide-react'

const Sidebar = () => {
  return (
    <aside className='py-10 px-4 bg-[#f3f5f7] rounded-lg w-[262px] h-[498px]'>
      <div className='relative'>
        <AvatarAccount src='/images/avatar.png' className='h-20 w-20 mx-auto' />
        <div className='bg-black border-[2px] border-white rounded-full w-[30px] h-[30px] flex justify-center items-center absolute top-14 right-20 hover:opacity-80 transition transform duration-200'>
          <Button size={'icon'} variant={'none'}>
            <Camera className='text-white h-4 w-4' />
          </Button>
        </div>
        <p className='text-xl font-semibold text-center mt-2'>Sofia Havertz</p>
      </div>
      <div className='mt-10'>
        <ul className='*:text-base *:font-semibold *:py-2 *:my-[6px]'>
          <li className='border-b-[1.5px] border-black'>Account</li>
          <li className='text-neutral-400'>Address</li>
          <li className='text-neutral-400'>Orders</li>
          <li className='text-neutral-400'>Wishlist</li>
          <li className='text-neutral-400'>Log Out</li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
