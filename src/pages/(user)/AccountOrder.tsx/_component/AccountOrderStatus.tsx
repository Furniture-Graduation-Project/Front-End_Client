import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useLanguage } from '@/context/LanguageContext'
import useOrderMutation from '@/hooks/mutations/useOrderMutation'
import { useTranslate } from '@/hooks/useTranslate'
import { getOrderStatus } from '@/utils/getOrderStatus'
import {
  FileText,
  MoveRight,
  PackageCheck,
  Truck,
  XCircle,
  PackageSearch,
  FilePen,
  Boxes,
  RotateCcw,
  RefreshCcw
} from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { useEffect, useRef, useState } from 'react'
import { IListStatusOrder } from '@/interface/order'
import useSessionStorage from '@/hooks/useSessionStorage'
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
const AccountOrderStatus = ({ order, setOpenQR }: any) => {
  const [state, setState] = useSessionStorage('stateOrder', null)
  const { toast } = useToast()
  const navigate = useNavigate()
  const { mutate } = useOrderMutation({ action: 'UPDATE' })
  const { t } = useTranslate('account.order.status')
  const { language } = useLanguage()
  const [steps, setSteps] = useState<IListStatusOrder[]>([])
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const getStepStyle = (stepId: string, currentStatus: string) => {
    if (currentStatus === 'cancelled' || currentStatus === 'returned' || currentStatus === 'refunded') {
      if (currentStatus == stepId) {
        return 'border-red bg-red text-white'
      }
      return 'border-yellow bg-gray-50'
    }
    const currentIndex = steps.findIndex((step) => step.id === currentStatus)
    const stepIndex = steps.findIndex((step) => step.id === stepId)
    if (stepIndex === currentIndex) return 'border-green'
    if (stepIndex < currentIndex) return 'bg-green text-white'
  }

  const hanleChangeStatus = (status: 'cancelled' | 'received') => {
    const newStatus = {
      _id: order.data._id,
      status,
      statusHistory: [
        ...order.data.statusHistory,
        {
          status
        }
      ]
    }
    mutate(newStatus)
  }
  const hanleRepurchase = () => {
    const stateOrder = order.data.items
      .filter((item: any) => item.productId.status == 'available')
      .map((item: any) => ({
        ...item,
        unitPrice: item.productOptionId.price
      }))
    if (!stateOrder || stateOrder.length <= 0) {
      toast({
        title: t('pleaseAddProduct'),
        description: t('orderMustHaveProduct'),
        variant: 'default'
      })
      return
    }
    setState(JSON.stringify(stateOrder))
    navigate('/checkout')
  }
  useEffect(() => {
    if (order?.data?.payment?.paymentMethod == 'cash_on_delivery') {
      setSteps([
        { id: 'pending', icon: FileText },
        { id: 'confirmed', icon: FilePen },
        { id: 'processing', icon: PackageSearch },
        { id: 'shipped', icon: Boxes },
        { id: 'delivered', icon: Truck },
        { id: 'received', icon: PackageCheck },
        { id: 'cancelled', icon: XCircle }
      ])
    }
    if (order?.data?.payment?.paymentMethod == 'credit_card') {
      setSteps([
        { id: 'unpaid', icon: FileText },
        { id: 'pending', icon: FileText },
        { id: 'confirmed', icon: FilePen },
        { id: 'processing', icon: PackageSearch },
        { id: 'shipped', icon: Boxes },
        { id: 'delivered', icon: Truck },
        { id: 'received', icon: PackageCheck },
        { id: 'cancelled', icon: XCircle }
      ])
    }
  }, [order])
  useEffect(() => {
    const currentStatus = order?.data?.status
    const targetStepIndex = steps.findIndex((step) => step.id === currentStatus)
    if (targetStepIndex !== -1 && stepRefs.current[targetStepIndex]) {
      setTimeout(() => {
        stepRefs.current[targetStepIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' })
      }, 100)
    }
  }, [steps])
  return (
    <Card>
      <CardHeader>
        <h2 className='text-xl font-bold'>{t('order_status')}</h2>
      </CardHeader>
      <CardContent>
        <motion.div
          className='flex items-center gap-2 justify-between overflow-x-scroll max-w-full border-b pb-2'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon
            const style = getStepStyle(step.id, order?.data.status)
            return (
              <div key={step.id} className='flex items-center gap-1'>
                <div
                  ref={(el) => (stepRefs.current[index] = el)}
                  className={`flex items-center gap-4 border-2 rounded-md p-2 max-w-[250px] ${style}`}
                >
                  <Icon />
                  <h2 className='text-md font-bold whitespace-nowrap'>{getOrderStatus(step.id, language)}</h2>
                </div>
                {index < steps.length - 1 && <MoveRight className='w-full min-w-5' />}
              </div>
            )
          })}
        </motion.div>
        <div className='flex flex-col gap-3 items-end p-3 bg-yellow/5'>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className={`${order?.data.status == 'confirmed' || order?.data.status == 'pending' || order?.data.status == 'unpaid' ? '' : 'hidden'} rounded-sm`}
                variant={'outline'}
              >
                {t('cancel_order')}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle> {t('title')}</AlertDialogTitle>
                <AlertDialogDescription>{t('description')}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel> {t('cancel')}</AlertDialogCancel>
                <AlertDialogAction onClick={() => hanleChangeStatus('cancelled')}>{t('continue')}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button
            onClick={() => hanleChangeStatus('received')}
            disabled={
              ['received', 'processing', 'shipped'].includes(order?.data.status) ||
              order?.data.payment?.paymentStatus == 'unpaid'
            }
            className={`${order?.data.status == 'delivered' && order?.data.payment?.paymentStatus == 'paid' ? '' : 'hidden'} rounded-sm`}
            variant={'outline'}
          >
            {t('received_order')}
          </Button>
          <Button
            onClick={() => navigate('/account/order/request/' + order.data._id)}
            className={`${order?.data.status == 'delivered' || order?.data.status == 'received' ? '' : 'hidden'} rounded-sm`}
            variant={'outline'}
          >
            {order?.data.returnInfo && order?.data.returnInfo?.items.length
              ? 'Xem yêu cầu hoàn trả'
              : 'Trả hàng / Hoàn tiền'}
          </Button>
          <Button
            onClick={hanleRepurchase}
            className={`${order?.data.status != 'cancelled' ? 'hidden' : ''} rounded-sm`}
            variant={'outline'}
          >
            {t('repurchaseProduct')}
          </Button>
          <Button
            onClick={() => setOpenQR(true)}
            className={`${order?.data.status == 'unpaid' && order?.data.payment.paymentStatus == 'unpaid' && order?.data.payment.paymentMethod == 'credit_card' ? '' : 'hidden'} rounded-sm`}
            variant={'outline'}
          >
            {t('payment')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AccountOrderStatus
