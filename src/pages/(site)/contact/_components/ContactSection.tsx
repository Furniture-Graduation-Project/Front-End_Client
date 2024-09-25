import { useTranslate } from '@/hooks/useTranslate'
import { Mail, Phone, Store } from 'lucide-react'

const ContactSection = () => {
  const { t } = useTranslate('contact.contactSection')
  return (
    <div className='mt-12'>
      <h1 className='font-medium text-[40px] text-center mb-10'>{t('title')}</h1>
      <div className='grid md:grid-cols-3 gap-x-6 gap-y-4'>
        <div className='py-4 px-12 bg-[#F3F5F7] flex flex-col items-center'>
          <Store className='h-8 w-8' />
          <h2 className='text-[#6C7275] uppercase font-bold mt-4 mb-2'>{t('elementTitle1')}</h2>
          <p className='text-neutral-900 text-xl font-medium text-center'>{t('elementContent1')}</p>
        </div>
        <div className='py-4 px-12 bg-[#F3F5F7] flex flex-col items-center'>
          <Phone className='h-8 w-8' />
          <h2 className='text-[#6C7275] uppercase font-bold mt-4 mb-2'>{t('elementTitle2')}</h2>
          <p className='text-neutral-900 text-xl font-medium text-center'>{t('elementContent2')}</p>
        </div>
        <div className='py-4 px-12 bg-[#F3F5F7] flex flex-col items-center'>
          <Mail className='h-8 w-8' />
          <h2 className='text-[#6C7275] uppercase font-bold mt-4 mb-2'>{t('elementTitle3')}</h2>
          <p className='text-neutral-900 text-xl font-medium text-center'>{t('elementContent3')}</p>
        </div>
      </div>
    </div>
  )
}

export default ContactSection
