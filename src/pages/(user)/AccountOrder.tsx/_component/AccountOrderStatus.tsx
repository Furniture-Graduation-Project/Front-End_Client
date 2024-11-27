import { Button } from '@/components/ui/button'
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
  RotateCcw,
  RefreshCcw,
  PackageSearch,
  FilePen
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
const AccountOrderStatus = ({ order }: any) => {
  const { mutate } = useOrderMutation({ action: 'UPDATE' })
  const { t } = useTranslate('account.order.status')
  const { language } = useLanguage()
  const steps = [
    { id: 'pending', icon: FileText },
    { id: 'confirmed', icon: FilePen },
    { id: 'processing', icon: PackageSearch },
    { id: 'shipped', icon: Truck },
    { id: 'delivered', icon: PackageCheck },
    { id: 'cancelled', icon: XCircle },
    { id: 'returned', icon: RotateCcw },
    { id: 'refunded', icon: RefreshCcw }
  ]

  const getStepStyle = (stepId: string, currentStatus: string) => {
    const completedSteps = [
      'pending',
      'confirmed',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
      'returned',
      'refunded'
    ]
    if (currentStatus === 'cancelled' || currentStatus === 'returned' || currentStatus === 'refunded') {
      if (currentStatus == stepId) {
        return 'border-red bg-red text-white'
      }
      return 'border-yellow bg-gray-50'
    }

    if (stepId === currentStatus) return 'border-green'
    if (completedSteps.indexOf(stepId) < completedSteps.indexOf(currentStatus)) {
      return 'bg-green text-white'
    }
  }

  const hanleChangeStatus = (status: 'cancelled' | 'delivered' | 'pending') => {
    const newStatus = {
      _id: order.data._id,
      status
    }
    mutate(newStatus)
  }

  return (
    <Card>
      <CardHeader>
        <h2 className='text-xl font-bold'>{t('order_status')}</h2>
      </CardHeader>
      <CardContent>
        <div className='flex items-center gap-2 justify-between overflow-x-scroll max-w-full border-b pb-2'>
          {steps.map((step, index) => {
            const Icon = step.icon
            const style = getStepStyle(step.id, order?.data.status)
            return (
              <div key={step.id} className='flex items-center gap-1'>
                <div className={`flex items-center gap-4 border-2 rounded-md p-2 max-w-[250px] ${style}`}>
                  <Icon />
                  <h2 className='text-md font-bold whitespace-nowrap'>{getOrderStatus(step.id, language)}</h2>
                </div>
                {index < steps.length - 1 && <MoveRight className='w-full min-w-5' />}
              </div>
            )
          })}
        </div>
        <div className='flex justify-end p-3 bg-yellow/5'>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className={`${order?.data.status == 'confirmed' || order?.data.status == 'pending' ? '' : 'hidden'} rounded-none`}
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
            onClick={() => hanleChangeStatus('delivered')}
            disabled={['delivered', 'returned', 'refunded', 'processing'].includes(order?.data.status)}
            className={`${order?.data.status == 'confirmed' || order?.data.status == 'pending' || order?.data.status == 'cancelled' ? 'hidden' : ''} rounded-none`}
            variant={'outline'}
          >
            {t('received_order')}
          </Button>
          <Button
            onClick={() => hanleChangeStatus('pending')}
            className={`${order?.data.status != 'cancelled' ? 'hidden' : ''} rounded-none`}
            variant={'outline'}
          >
            {t('repurchaseProduct')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AccountOrderStatus
