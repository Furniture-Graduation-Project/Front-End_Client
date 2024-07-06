import { useTranslate } from '@/hooks/useTranslate'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Sale = () => {
  const { t } = useTranslate('home.sale')

  return (
    <>
      <div className='grid md:grid-cols-1 lg:grid-cols-2 gap-0 w-full'>
        <div className=''>
          <img src='src/assets/images/4.png' alt='' />
        </div>
        <div className='bg-neutral-2 flex items-center md:py-16 lg:py-0 p-[32px]'>
          <div className='ml-0 sm:ml-14'>
            <h1 className='caption-1-bold text-blue mb-3'>{t('title')}</h1>
            <h1 className='headline-5 sm:headline-4 leading-tight mb-3 tracking-wider'>
              {t('headline1')} <br className='sm:block hidden' /> {t('headline2')}
            </h1>
            <p className='body-1 mb-6 tracking-wider'>{t('description')}</p>
            <div className='underline flex items-center transition duration-500 ease-in-out transform hover:translate-x-2 hover:opacity-70 '>
              <Link className='button-s' to=''>
                {t('shopNow')}
              </Link>
              <ArrowRight className='ml-1 h-4 w-4' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sale
