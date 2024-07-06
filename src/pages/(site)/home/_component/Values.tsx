import { Banknote, LockKeyhole, Phone, Truck } from 'lucide-react'
import Container from '@/components/Container'
import { useTranslate } from '@/hooks/useTranslate'

const Values = () => {
  const { t } = useTranslate('home.values')

  return (
    <>
      <Container>
        <div className='grid lg:grid-cols-4 grid-cols-2 gap-2 sm:gap-7 *:w-auto *:rounded-lg my-[74px]'>
          <div className='bg-neutral-2 h-[200px] sm:h-[280px] flex justify-center flex-col'>
            <div className='ml-5 sm:ml-12'>
              <Truck className='h-10 w-10 sm:h-14 sm:w-14 mb-3' strokeWidth={1} />
              <h1 className='font-medium text-[16px] sm:headline-7 tracking-wider my-3'>
                {t('freeShipping', 'Free Shipping')}
              </h1>
              <p className='caption-1 text-neutral-4'>{t('freeShippingDescription', 'Order above $200')}</p>
            </div>
          </div>
          <div className='bg-neutral-2 h-[200px] sm:h-[280px] flex justify-center flex-col'>
            <div className='ml-5 sm:ml-12'>
              <Banknote className='h-10 w-10 sm:h-14 sm:w-14 mb-3' strokeWidth={1} />
              <h1 className='font-medium text-[16px] sm:headline-7 tracking-wider my-3'>
                {t('moneyBack', 'Money-back')}
              </h1>
              <p className='caption-1 text-neutral-4'>{t('moneyBackDescription', '30 days guarantee')}</p>
            </div>
          </div>
          <div className='bg-neutral-2 h-[200px] sm:h-[280px] flex justify-center flex-col'>
            <div className='ml-5 sm:ml-12'>
              <LockKeyhole className='h-10 w-10 sm:h-14 sm:w-14 mb-3' strokeWidth={1} />
              <h1 className='font-medium text-[16px] sm:headline-7 tracking-wider my-3'>
                {t('securePayments', 'Secure Payments')}
              </h1>
              <p className='caption-1 text-neutral-4'>{t('securePaymentsDescription', 'Secured by Stripe')}</p>
            </div>
          </div>
          <div className='bg-neutral-2 h-[200px] sm:h-[280px] flex justify-center flex-col'>
            <div className='ml-5 sm:ml-12'>
              <Phone className='h-10 w-10 sm:h-14 sm:w-14 mb-3' strokeWidth={1} />
              <h1 className='font-medium text-[16px] sm:headline-7 tracking-wider my-3'>
                {t('support', '24/7 Support')}
              </h1>
              <p className='caption-1 text-neutral-4'>{t('supportDescription', 'Phone and Email support')}</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Values
