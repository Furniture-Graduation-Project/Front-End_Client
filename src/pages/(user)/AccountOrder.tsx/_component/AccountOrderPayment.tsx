import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslate } from '@/hooks/useTranslate'
import { formatDate } from '@/utils/formatDate'
import { ShieldCheck, ShieldX } from 'lucide-react'
import { getOrderStatus } from '@/utils/getOrderStatus'

const AccountOrderPayment = ({ order }: any) => {
  const { language } = useLanguage()
  const { t } = useTranslate('account.order.payment')

  return (
    <Card>
      <CardHeader>
        <h2 className='text-xl font-bold'>{t('paymentMethod')}</h2>
      </CardHeader>
      <CardContent className='space-y-4'>
        <h3>{order?.data.payment?.paymentMethod == 'cash_on_delivery' ? t('cashOnDelivery') : t('prePayment')}</h3>
        <p className={order?.data.payment?.paymentStatus === 'unpaid' ? 'text-red' : 'text-green'}>
          {order?.data.payment?.paymentStatus === 'unpaid' ? (
            <span className='flex gap-2'>
              <ShieldX /> {t('unpaid')}
            </span>
          ) : (
            <span className='flex gap-2'>
              <ShieldCheck /> {t('paid')}
            </span>
          )}
        </p>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>{t('statusHistory')}</h3>
          <div className='space-y-2'>
            {order?.data.statusHistory?.map((history: any, index: number) => (
              <div key={index} className='flex justify-between'>
                <span>{getOrderStatus(history.status, language)}</span>
                <span className='text-sm text-gray-600'>{formatDate(history.date, language)}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AccountOrderPayment
