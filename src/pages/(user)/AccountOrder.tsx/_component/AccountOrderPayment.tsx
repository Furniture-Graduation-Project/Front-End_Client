import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslate } from '@/hooks/useTranslate'
import { formatDate } from '@/utils/formatDate'

const AccountOrderPayment = ({ order }: any) => {
  const { language } = useLanguage()
  const { t } = useTranslate('account.order.payment')

  return (
    <Card>
      <CardHeader>
        <h2 className='text-xl font-bold'>{t('paymentMethod')}</h2>
      </CardHeader>
      <CardContent className='space-y-4'>
        <h3 className='text-lg'>
          {order?.data.payment?.paymentMethod === 'cash_on_delivery' ? t('cashOnDelivery') : t('prePayment')}
        </h3>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='space-y-1'>
            <h3 className='text-lg'>{t('orderTime')}</h3>
            <p className='text-sm text-gray-600'>{formatDate(order?.data.createdAt, language)}</p>
          </div>
          <div className='space-y-1'>
            <h3 className='text-lg'>{t('paymentTime')}</h3>
            <p className='text-sm text-gray-600'>
              {order?.data.payment.paymentDate && order?.data.payment.paymentStatus == 'paid'
                ? formatDate(order?.data.payment.paymentDate, language)
                : '##-##-####'}
            </p>
          </div>
          <div className='space-y-1'>
            <h3 className='text-lg'>{t('deliveryTime')}</h3>
            <p className='text-sm text-gray-600'>
              {order?.data.shipments?.item && order?.data.shipments?.item.length > 0
                ? formatDate(order?.data.shipments?.item[0].shipmentDate, language)
                : '##-##-####'}
            </p>
          </div>
          <div className='space-y-1'>
            <h3 className='text-lg'>{t('completionTime')}</h3>
            <p className='text-sm text-gray-600'>
              {' '}
              {order?.data.updatedAt && order?.data.payment.paymentStatus == 'delivered'
                ? formatDate(order?.data.updatedAt, language)
                : '##-##-####'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AccountOrderPayment
