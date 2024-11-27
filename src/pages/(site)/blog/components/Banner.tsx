import { useTranslate } from '@/hooks/useTranslate'

const Banner = () => {
  const { t } = useTranslate('blog')
  return (
    <section className='container mx-auto bg-gray-100 py-12'>
      <div className='container mx-auto px-4 text-center'>
        <div className='text-gray-600 mb-4'>
          {t('home')} &gt; {t('blog')}
        </div>
        <h1 className='text-4xl font-bold'>{t('Our Blog')}</h1>
        <p className='text-gray-600 mt-2'>{t('Home ideas and design inspiration')}</p>
      </div>
    </section>
  )
}

export default Banner
