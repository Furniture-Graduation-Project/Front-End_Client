import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import AvatarAccount from '@/components/auth/AvatarAccount'
import { Button } from '@/components/ui/button'
import { Camera } from 'lucide-react'
import { useTranslate } from '@/hooks/useTranslate'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const SidebarAccount = () => {
  const { t } = useTranslate('account.sidebar')
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside className='py-10 px-4 bg-[#f3f5f7] rounded-lg w-full h-fit md:h-[498px]'>
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
        <ul className='*:text-base *:font-semibold *:py-2 *:my-[6px] hidden md:flex flex-col'>
          <li className='*:flex'>
            <NavLink
              to='/account'
              end
              className={({ isActive }) =>
                isActive
                  ? 'text-black font-bold border-b-[1.5px] border-black'
                  : 'text-neutral-400 hover:text-black transition'
              }
            >
              {t('account')}
            </NavLink>
          </li>
          <li className='*:flex'>
            <NavLink
              to='/account/address'
              className={({ isActive }) =>
                isActive
                  ? 'text-black font-bold border-b-[1.5px] border-black'
                  : 'text-neutral-400 hover:text-black transition'
              }
            >
              {t('address')}
            </NavLink>
          </li>
          <li className='*:flex'>
            <NavLink
              to='/account/order'
              className={({ isActive }) =>
                isActive
                  ? 'text-black font-bold border-b-[1.5px] border-black'
                  : 'text-neutral-400 hover:text-black transition'
              }
            >
              {t('orders')}
            </NavLink>
          </li>
          <li className='*:flex'>
            <NavLink
              to='/account/wishlist'
              className={({ isActive }) =>
                isActive
                  ? 'text-black font-bold border-b-[1.5px] border-black'
                  : 'text-neutral-400 hover:text-black transition'
              }
            >
              {t('wishlist')}
            </NavLink>
          </li>
          <li className='*:flex'>
            <NavLink
              to='/logout'
              className={({ isActive }) =>
                isActive
                  ? 'text-black font-bold border-b-[1.5px] border-black'
                  : 'text-neutral-400 hover:text-black transition'
              }
            >
              {t('logout')}
            </NavLink>
          </li>
        </ul>
        <Select
          defaultValue={
            location.pathname.split('/').length >= 3
              ? location.pathname.split('/').slice(0, 3).join('/')
              : location.pathname
          }
          onValueChange={(value) => navigate(value)}
        >
          <SelectTrigger className='w-full flex md:hidden'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='/account'>{t('account')}</SelectItem>
              <SelectItem value='/account/address'>{t('address')}</SelectItem>
              <SelectItem value='/account/order'>{t('orders')}</SelectItem>
              <SelectItem value='/account/wishlist'>{t('wishlist')}</SelectItem>
              <SelectItem value='/logout'>{t('logout')}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </aside>
  )
}

export default SidebarAccount
