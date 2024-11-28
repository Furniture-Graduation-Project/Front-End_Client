import { Mail } from 'lucide-react'
import { useTranslate } from '@/hooks/useTranslate'

const JoinNewsletter = () => {
  const { t } = useTranslate('blogBanner')

  return (
    <div className='relative w-full flex items-center justify-center h-96'>
      <img
        src='https://storage.googleapis.com/a1aa/image/HWvYfaQzZfu1jk15sxUmmBKUX0z9Mkk6a0AH4wPerDVuRyInA.jpg'
        alt='Background image of a white dresser with wooden handles and a gray chair with a white blanket'
        className='absolute inset-0 w-full h-full object-cover'
      />
      <div className='absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center'>
        <div className='p-8'>
          <h1 className='text-2xl font-bold mb-2 text-center'>{t('title')}</h1>
          <p className='text-gray-600 mb-4 text-center'>{t('description')}</p>
          <div className='flex items-center border-b border-gray-300 py-2'>
            <Mail className='text-gray-500 mr-2' />
            <input
              className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
              type='text'
              placeholder={t('placeholder')}
              aria-label={t('placeholder')}
            />
            <button className='py-1 px-2 rounded whitespace-nowrap' type='button'>
              {t('button')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JoinNewsletter
