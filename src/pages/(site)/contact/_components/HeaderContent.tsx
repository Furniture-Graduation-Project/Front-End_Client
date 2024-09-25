import { useTranslate } from '@/hooks/useTranslate'

const HeaderContent = () => {
  const { t } = useTranslate('contact.headerContent')

  return (
    <>
      <div className='w-full lg:w-[820px]'>
        <h1 className='mt-10 font-medium text-[28px] lg:text-[54px]'>{t('headerText')}</h1>
        <p className='mt-6'>{t('contentText')}</p>
      </div>
    </>
  )
}

export default HeaderContent
