import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/utils/formatCurrency'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { useTranslate } from '@/hooks/useTranslate'
import { generatePDF } from '@/utils/pdfGenerator'
import { useLanguage } from '@/context/LanguageContext'

const AccountOrderInfomation = ({ order }: any) => {
  const { t } = useTranslate('account.order.infomation')
  const { toast } = useToast()
  const { language } = useLanguage()
  const handleDownload = () => {
    if (order && order.data && order.data.items) {
      generatePDF(order, language)
    }
  }
  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between'>
          <h2 className='text-xl font-bold'>{t('orderDetails')}</h2>
          <Button className={order?.data?.payment?.paymentStatus === 'unpaid' ? 'hidden' : ''} onClick={handleDownload}>
            {t('Invoice')}
          </Button>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div>
          <div className='w-full'>
            <Separator />
            {order?.data.items && order?.data.items.length > 0 ? (
              order.data.items.map((item: any, index: number) => (
                <div key={index}>
                  <div className='grid grid-cols-1 sm:grid-cols-2 w-full py-2'>
                    <div className='flex gap-5'>
                      <img
                        src={item.productOptionId?.image ? item.productOptionId.image : ''}
                        alt={item.productId?.name}
                        className='w-24 h-24 object-cover sm:w-32 sm:h-32 rounded-md'
                      />
                      <div className='flex flex-col justify-between'>
                        <h3 className='text-lg font-semibold whitespace-nowrap'>{item.productId?.name}</h3>
                        <div className='text-[12px] text-[#6C7275]'>
                          {item.productOptionId?.variants &&
                            item.productOptionId.variants.map((variant: any, id: number) => (
                              <h4 className='whitespace-nowrap' key={id}>
                                {variant.variant}: {variant.value}
                              </h4>
                            ))}
                        </div>
                        <h4>
                          {t('quantity')}: {item.quantity}
                        </h4>
                      </div>
                    </div>
                    <h3 className='text-xl font-bold text-end'>{formatCurrency(item.quantity * item.unitPrice)}</h3>
                  </div>
                  <Separator />
                </div>
              ))
            ) : (
              <p>{t('emptyOrder')}</p>
            )}
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <h2 className='text-lg font-bold'>
            {t('totalAmount')}: {order?.data.totalPrice && formatCurrency(order?.data.totalPrice)}
          </h2>
          <div className='grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-center'>
            <h3 className='text-lg font-bold'>{t('orderIdLabel')}:</h3>
            <h3 className='text-lg uppercase' id='idOrder'>
              {order?.data.code}
            </h3>
            <Button
              variant='outline'
              size='sm'
              className='w-fit'
              onClick={() => {
                const orderId = order?.data.code || ''
                navigator.clipboard.writeText(orderId)
                toast({
                  title: t('copySuccess'),
                  variant: 'default'
                })
              }}
            >
              {t('copyButton')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AccountOrderInfomation
