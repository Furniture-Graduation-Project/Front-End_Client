import { useTranslate } from '@/hooks/useTranslate'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Sale = () => {
  const { t } = useTranslate('home.sale')

  return (
    <>
      <div className='grid md:grid-cols-1 lg:grid-cols-2 gap-0 w-full mt-[74px]'>
        <video width='1920' height='600' autoPlay loop muted>
          <source src='https://cb2.scene7.com/is/content/CB2/video/092624_Dartboard_GIF.mp4' type='video/mp4' />
        </video>
        <div className='bg-[#f2ede5] flex flex-col items-center justify-center text-center gap-y-6 md:py-16 lg:py-0 p-[32px]'>
          <h1 className='headline-5 sm:headline-3 leading-tight tracking-wider font-serif *:font-serif uppercase '>
            {t('title')}
            <p className='mt-2'>{t('title2')}</p>
          </h1>
          <p className='body-1  tracking-wider sm:w-[472px] text-lg font-mono text-center'>{t('description')}</p>
          <div className='underline flex items-center transition duration-500 ease-in-out transform hover:translate-x-2 hover:opacity-70 '>
            <Link className='button-s' to='/products'>
              {t('shopNow')}
            </Link>
            <ArrowRight className='ml-1 h-4 w-4' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Sale
