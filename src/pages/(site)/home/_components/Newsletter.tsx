import { NewsletterBanner } from '@/assets'
import { useTranslate } from '@/hooks/useTranslate'
import { Mail } from 'lucide-react'

const Newsletter = () => {
  const { t } = useTranslate('home.newsletter')

  return (
    <div className='relative mt-[74px] h-[300px] lg:h-auto'>
      {/* <img className='w-full h-full md:object-cover' src={NewsletterBanner} alt='banner' /> */}
      <div>
        <img src={NewsletterBanner} alt='newsletter' className='object-cover w-full h-[300px]' />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center tracking-wider'>
          <h1 className='headline-5 sm:headline-4 mb-3'>{t('join')}</h1>
          <p className='text-[14px] sm:text-[18px] text-[#141718]'>{t('signupText')}</p>
          <div className='flex md:justify-around lg:justify-between items-center border-b-neutral-4 border-t-0 border border-r-0 border-l-0 mt-5 pb-3'>
            <Mail className='h-6 w-6' strokeWidth={1} />
            <form className='flex' action=''>
              <input
                type='text'
                placeholder={t('emailPlaceholder')}
                className='bg-neutral-2 lg:w-[396px] md:w-[320px] px-3 py-1 focus:outline-none'
              />
              <button className='text-neutral-4 font-medium transition duration-500 ease-in-out transform hover:scale-110 whitespace-nowrap'>
                {t('signupButton')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Newsletter
