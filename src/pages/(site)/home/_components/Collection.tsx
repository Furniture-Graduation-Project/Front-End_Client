import { useTranslate } from '@/hooks/useTranslate'

const Collection = () => {
  const { t } = useTranslate('home.collection')
  return (
    <div className='my-[74px] relative'>
      <video autoPlay loop muted className='w-full h-auto sm:hidden block'>
        <source src='https://cb2.scene7.com/is/content/CB2/video/071124_FallLaunch_mHP.mp4' type='video/mp4' />
      </video>
      <video autoPlay loop muted className='w-full h-auto sm:block hidden'>
        <source src='https://cb2.scene7.com/is/content/CB2/video/071124_FallLaunch_dHP.mp4' type='video/mp4' />
      </video>
      <div className='absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center'>
        <p className='text-white tracking-widest font-extralight text-md sm:text-2xl uppercase'>{t('title')}</p>
        <p className='text-white font-serif text-2xl sm:text-5xl my-2 sm:mt-4 tracking-widest sm:mb-8 font-semibold uppercase'>
          {t('subtitle')}
        </p>
        <button className='uppercase text-white border border-white px-2 sm:px-10 py-2 mt-4 backdrop-blur-md bg-opacity-30 tracking-wider text-sm'>
          {t('button')}
        </button>
      </div>
    </div>
  )
}

export default Collection
