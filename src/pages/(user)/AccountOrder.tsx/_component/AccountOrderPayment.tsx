import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useLanguage } from '@/context/LanguageContext'
import useOrderMutation from '@/hooks/mutations/useOrderMutation'
import { useTranslate } from '@/hooks/useTranslate'
import { formatDate } from '@/utils/formatDate'
import { ShieldCheck, ShieldX } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'

const paymentSchema = z.object({
  paymentMethod: z.enum(['cash_on_delivery', 'credit_card'], {
    required_error: 'Please select a payment method'
  })
})

type PaymentForm = z.infer<typeof paymentSchema>

const AccountOrderPayment = ({ order }: any) => {
  const { language } = useLanguage()
  const { mutate, isSuccess } = useOrderMutation({ action: 'UPDATE' })
  const { t } = useTranslate('account.order.payment')
  const { toast } = useToast()
  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch
  } = useForm<PaymentForm>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: 'cash_on_delivery'
    }
  })

  const paymentMethod = watch('paymentMethod')

  const hanldeChangeMethod = (data: PaymentForm) => {
    const updatedOrder = {
      _id: order.data._id,
      payment: {
        ...order.data.payment,
        paymentMethod: data.paymentMethod
      }
    }
    mutate(updatedOrder)
  }

  useEffect(() => {
    if (order) {
      reset({
        paymentMethod: order?.data.payment?.paymentMethod
      })
    }
  }, [order])

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: t('successTitle'),
        description: t('successDescription'),
        variant: 'success'
      })
    }
  }, [isSuccess, t])

  return (
    <Card>
      <CardHeader>
        <h2 className='text-xl font-bold'>{t('paymentMethod')}</h2>
      </CardHeader>
      <CardContent className='space-y-4'>
        <form
          onSubmit={handleSubmit(hanldeChangeMethod)}
          className={order?.data?.status !== 'cancelled' ? 'hidden' : ''}
        >
          <div className='flex gap-4'>
            <Select
              onValueChange={(value) => setValue('paymentMethod', value as 'cash_on_delivery' | 'credit_card')}
              value={paymentMethod}
            >
              <SelectTrigger className='w-[300px]'>
                <SelectValue placeholder={t('selectMethod')} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='cash_on_delivery'>{t('cashOnDelivery')}</SelectItem>
                  <SelectItem value='credit_card'>{t('prePayment')}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button type='submit'>{t('changeMethod')}</Button>
          </div>
          {errors.paymentMethod && <p className='text-red-500'>{errors.paymentMethod.message}</p>}
        </form>
        <h3 className={order?.data?.status !== 'cancelled' ? '' : 'hidden'}>
          {order?.data.payment?.paymentMethod == 'cash_on_delivery' ? t('cashOnDelivery') : t('prePayment')}
        </h3>
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
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='space-y-1'>
            <h3 className='text-lg'>{t('orderTime')}</h3>
            <p className='text-sm text-gray-600'>{formatDate(order?.data.createdAt, language)}</p>
          </div>
          <div className='space-y-1'>
            <h3 className='text-lg'>{t('paymentTime')}</h3>
            <p className='text-sm text-gray-600'>
              {order?.data.payment.paymentDate && order?.data.payment.paymentStatus === 'paid'
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
              {order?.data.updatedAt && order?.data.payment.paymentStatus === 'delivered'
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
