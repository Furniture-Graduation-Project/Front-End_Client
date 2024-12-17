import { useTranslate } from '@/hooks/useTranslate'
import { ArrowRight, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface NotificationBarProps {
  setShow: (show: boolean) => void
}

const NotificationBar: React.FC<NotificationBarProps> = ({ setShow }) => {
  const [isVisible, setIsVisible] = useState(true)

  const { t } = useTranslate('header.notificationBar')

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => setShow(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isVisible, setShow])

  return (
    <div
      className={`h-[40px] bg-neutral-2 flex justify-center items-center w-full m-0 font-semibold sm:px-0 px-[32px] relative z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className='flex justify-center items-center mr-4'>
        <span role='img' aria-label='christmas tree' className='text-xl mr-2'>
          🎄
        </span>
        <span className='text-[12px] sm:caption-1-semi'>{t('notification')}</span>
        <span className='hidden sm:flex text-[12px] sm:caption-1-semi ml-1'>{t('notification2')}</span>
      </div>
      <div className='hidden md:flex justify-center items-center button-xs underline text-blue'>
        <Link className='mr-1' to='/products'>
          {t('shopNow')}
        </Link>
        <ArrowRight className='h-[18px]' />
      </div>
      <X onClick={() => setIsVisible(false)} className='h-[18px] absolute right-4 cursor-pointer' />
    </div>
  )
}

export default NotificationBar
