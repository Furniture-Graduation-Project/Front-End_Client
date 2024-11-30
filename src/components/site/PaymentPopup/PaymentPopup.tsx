import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { useLanguage } from '@/context/LanguageContext'
import useOrderMutation from '@/hooks/mutations/useOrderMutation'
import { useToast } from '@/hooks/use-toast'
import { IApiResponse } from '@/interface/apiRespose'
import { IOrder, IQRCodeData } from '@/interface/order'
import { formatCurrency } from '@/utils/formatCurrency'
import { QrCode } from 'lucide-react'
import { useEffect, useState } from 'react'
import PaymentSuccess from './_component/PaymentSuccess'
import { useTranslate } from '@/hooks/useTranslate'

const PaymentPopup = ({
  orderState,
  open,
  success,
  setOpen,
  setSuccess
}: {
  orderState: IOrder | null
  open: boolean
  success: boolean
  setOpen: (open: boolean) => void
  setSuccess: (success: any) => void
}) => {
  const { language } = useLanguage()
  const { toast } = useToast()
  const { t } = useTranslate('payment')

  const [description, setDescription] = useState<string>('')
  const [qrCode, setQrCode] = useState<string | null>(null)
  const { mutate, isSuccess, isError, data } = useOrderMutation({ action: 'CREATE_QR' })
  const [timeLeft, setTimeLeft] = useState({
    minutes: 0,
    seconds: 0
  })
  const {
    mutate: Payment,
    isSuccess: isSuccessPayment,
    isError: isErrorPayment
  } = useOrderMutation({ action: 'PAYMENT' })

  const hanleCreateQR = () => {
    if (orderState?.totalPrice) {
      const date = new Date()
      const startTime = new Date().getTime()
      const time = Math.floor(startTime / 1000)
        .toString(16)
        .toUpperCase()
      setDescription(time)
      mutate({ amount: orderState?.totalPrice?.toFixed(), addInfo: time, startTime: date })
      setTimeLeft({
        minutes: 5,
        seconds: 0
      })
      Payment({ _id: orderState._id, amount: orderState?.totalPrice?.toFixed(), description: time, startTime: date })
    }
  }

  useEffect(() => {
    if (isSuccess) {
      const dataQR = data.data.data as IApiResponse<IQRCodeData>
      setQrCode(dataQR.data.qrDataURL)
    }
    if (isError) {
      toast({
        title: t('errors.createQrFail'),
        description: t('errors.createQrFail'),
        variant: 'default'
      })
    }
  }, [isSuccess, isError])

  useEffect(() => {
    if (isSuccessPayment && orderState) {
      setSuccess(true)
    }
    if (isErrorPayment) {
      setQrCode(null)
      setTimeLeft({
        minutes: 0,
        seconds: 0
      })
      toast({
        title: t('errors.paymentFail'),
        description: t('errors.paymentFail'),
        variant: 'default'
      })
    }
  }, [isSuccessPayment, isErrorPayment])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[610px]'>
        <div className='relative w-full h-full'>
          <DialogHeader>
            <DialogTitle className='text-center'>{t('paymentSuccess.title')}</DialogTitle>
            <DialogDescription className='py-2'>
              <div
                className={
                  !qrCode && timeLeft.minutes == 0 && timeLeft.seconds == 0
                    ? 'flex justify-center relative'
                    : 'hidden' + ' '
                }
              >
                <QrCode className='w-2/4 max-w-[20rem] h-auto mx-auto' />
                <Button className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' onClick={hanleCreateQR}>
                  {t('paymentSuccess.retryQrCode')}
                </Button>
              </div>
              <div className={qrCode ? 'block relative' : 'hidden'}>
                <img
                  className={timeLeft.minutes == 0 && timeLeft.seconds == 0 ? 'opacity-25' : ' max-w-[20rem] mx-auto'}
                  src={qrCode || ''}
                  alt='QRCODE'
                />
                <Button
                  className={
                    timeLeft.minutes == 0 && timeLeft.seconds == 0
                      ? 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                      : 'hidden'
                  }
                  onClick={hanleCreateQR}
                >
                  {t('paymentSuccess.retryQrCode')}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='flex flex-col'>
            <div>
              <div className='flex justify-center'>
                <div className='flex space-x-4'>
                  {Object.entries(timeLeft).map(([key, value]) => (
                    <div key={key} className='text-center'>
                      <div className='bg-[#F3F5F7] px-3 py-2 rounded-lg'>
                        <span className='text-2xl font-bold'>{value.toString().padStart(2, '0')}</span>
                      </div>
                      <span className='text-sm text-muted-foreground capitalize'>{t(`paymentSuccess.${key}`)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <h3 className='text-red mb-2'>{t('paymentSuccess.description')}</h3>
              <Separator />
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className='p-3'>{t('paymentSuccess.accountName')}</TableCell>
                    <TableCell className='p-3'>
                      {import.meta.env.VITE_ACCOUNT_NAME ? import.meta.env.VITE_ACCOUNT_NAME : '######'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='p-3'>{t('paymentSuccess.accountNumber')}</TableCell>
                    <TableCell className='p-3'>
                      {import.meta.env.VITE_BANK_NUMBER ? import.meta.env.VITE_BANK_NUMBER : '######'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='p-3'>{t('paymentSuccess.bank')}</TableCell>
                    <TableCell className='p-3'>
                      {import.meta.env.VITE_BANK_NAME ? import.meta.env.VITE_BANK_NAME : '######'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='p-3'>{t('paymentSuccess.amount')}</TableCell>
                    <TableCell className='p-3'>
                      {orderState?.totalPrice ? formatCurrency(orderState?.totalPrice) : '######'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className='p-3'>{t('paymentSuccess.note')}</TableCell>
                    <TableCell className='p-3'>{description ? description : '######'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </DialogFooter>
          <PaymentSuccess success={success} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentPopup
