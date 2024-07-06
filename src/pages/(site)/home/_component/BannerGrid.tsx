import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Container from '@/components/Container'
import { BannerGrid0, BannerGrid1, BannerGrid2 } from '@/assets'
import { useTranslate } from '@/hooks/useTranslate'

const BannerGrid = () => {
  const { t } = useTranslate('home.bannerGrid')

  return (
    <Container>
      <div className='grid grid-cols-1 lg:grid-cols-2 lg:grid-flow-col gap-7 *:bg-neutral-2 '>
        <div className='row-span-3 h-auto sm:h-[784px] relative rounded-xl'>
          <div className='absolute top-[48px] left-[48px] space-y-2'>
            <h1 className='headline-5'>{t('livingRoom', 'Living Room')}</h1>
            <Link
              className='underline flex items-center buton-s transition duration-500 ease-in-out transform hover:translate-x-2 hover:opacity-70 hover:scale-105'
              to={''}
            >
              {t('shopNow', 'Shop now')} <ArrowRight className='h-4' />
            </Link>
          </div>
          <img
            className='sm:w-[548px] sm:h-[664px] p-8 sm:p-0 w-auto h-auto mx-auto mt-[6rem] hover:scale-105 transition duration-500 ease-in-out transform cursor-pointer'
            src={BannerGrid0}
            alt=''
          />
        </div>
        <div className='h-auto sm:h-[378px] relative rounded-xl'>
          <div className='absolute sm:bottom-[48px] max-[640px]:top-[48px] left-[48px]  space-y-2'>
            <h1 className='headline-5'>{t('bedroom', 'Bedroom')}</h1>
            <Link
              className='underline flex items-center buton-s transition duration-500 ease-in-out transform hover:translate-x-2 hover:opacity-70 hover:scale-105'
              to={''}
            >
              {t('shopNow', 'Shop now')} <ArrowRight className='h-4' />
            </Link>
          </div>
          <img
            src={BannerGrid1}
            className='h-[332px] w-[260px] mr-6 p-8 sm:p-0 float-end sm:mr-16 mt-28 sm:mt-6 hover:scale-105 transition duration-500 ease-in-out transform cursor-pointer'
            alt=''
          />
        </div>
        <div className='h-auto sm:h-[378px] relative rounded-xl'>
          <div className='absolute sm:bottom-[48px] max-[640px]:top-[48px] left-[48px]  space-y-2'>
            <h1 className='headline-5'>{t('kitchen', 'Kitchen')}</h1>
            <Link
              className='underline flex items-center buton-s transition duration-500 ease-in-out transform hover:translate-x-2 hover:opacity-70 hover:scale-105'
              to={''}
            >
              {t('shopNow', 'Shop now')} <ArrowRight className='h-4' />
            </Link>
          </div>

          <img
            src={BannerGrid2}
            className='h-[260px] w-[280px] mr-4 p-8 sm:p-0 float-end sm:mr-16 mt-32 sm:mt-16 hover:scale-105 transition duration-500 ease-in-out transform cursor-pointer'
            alt=''
          />
        </div>
      </div>
    </Container>
  )
}

export default BannerGrid
