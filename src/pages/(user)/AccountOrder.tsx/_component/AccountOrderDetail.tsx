import { useSingleOrderQuery } from '@/hooks/queries/useOrderQuery'
import { useParams } from 'react-router-dom'
import AccountOrderAddress from './AccountOrderAddress'
import AccountOrderInfomation from './AccountOrderInfomation'
import AccountOrderStatus from './AccountOrderStatus'
import AccountOrderPayment from './AccountOrderPayment'
import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'
import PaymentPopup from '@/components/site/PaymentPopup/PaymentPopup'
import { IOrder } from '@/interface/order'
import { useTranslate } from '@/hooks/useTranslate'
const AccountOrderDetail = () => {
  const { id } = useParams()
  const { toast } = useToast()
  const { data } = useSingleOrderQuery(id || '')
  const { t } = useTranslate('account.order.status')
  const [openQR, setOpenQR] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [orderState, setOrderState] = useState<IOrder>({} as IOrder)
  const [isFisrtLoad, setIsFistLoad] = useState<boolean>(true)
  useEffect(() => {
    if (
      data &&
      data.data.payment?.paymentStatus == 'unpaid' &&
      data.data.payment?.paymentMethod == 'credit_card' &&
      isFisrtLoad
    ) {
      setIsFistLoad(false)
      setOrderState(data.data)
      toast({
        variant: 'default',
        title: t('unpaid'),
        description: t('paymentDescription'),
        action: (
          <ToastAction onClick={() => setOpenQR(true)} altText='Thanh toan'>
            {t('payment')}
          </ToastAction>
        )
      })
    }
  }, [data])
  useEffect(() => {
    if (success) {
    }
  }, [success])
  return (
    <div className='space-y-4 p-4 sm:p-6'>
      <AccountOrderStatus order={data} setOpenQR={setOpenQR} />
      <AccountOrderAddress order={data} />
      <AccountOrderInfomation order={data} />
      <AccountOrderPayment order={data} />
      <PaymentPopup
        open={openQR}
        setOpen={setOpenQR}
        orderState={orderState}
        setSuccess={setSuccess}
        success={success}
      />
    </div>
  )
}

export default AccountOrderDetail
