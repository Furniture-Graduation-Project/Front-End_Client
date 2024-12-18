/* eslint-disable @typescript-eslint/no-explicit-any */
import PaymentPopup from '@/components/site/PaymentPopup/PaymentPopup'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Skeleton } from '@/components/ui/skeleton'
import { ToastAction } from '@/components/ui/toast'
import { useAuthContext } from '@/context/AuthContext'
import useOrderMutation from '@/hooks/mutations/useOrderMutation'
import { useAddressQuery } from '@/hooks/queries/useAddressQuery'
import { useToast } from '@/hooks/use-toast'
import { useTranslate } from '@/hooks/useTranslate'
import { IAddress } from '@/interface/address'
import { IOrder } from '@/interface/order'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreditCard, DollarSign, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'
import AddressCheckout from './AddressCheckout'

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  street: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  ward: z.string().optional(),
  payment: z.enum(['credit_card', 'cash_on_delivery'], {
    message: 'Phương thức thanh toán không được để trống.'
  })
})

const CheckoutForm = ({ dataCart, amount, isLoading: isLoadingCart, setErrorOrder, stateErrorOrder }: any) => {
  const { user } = useAuthContext()
  const { toast } = useToast()
  const { t } = useTranslate('checkout.form')
  const navigate = useNavigate()
  const [openQR, setOpenQR] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [orderState, setOrderState] = useState<IOrder>({} as IOrder)
  const [isFinished, setIsFinished] = useState<boolean>(true)
  const {
    mutate,
    isSuccess,
    isError: isErrorOrder,
    error,
    data: dataOrder,
    isPending
  } = useOrderMutation({ action: 'CREATE' })
  const { data: locations, isLoading } = useAddressQuery(user?._id || '')

  const defaultLocation = locations && locations?.locations?.find((location: IAddress) => location.default)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: defaultLocation?.firstName || '',
      lastName: defaultLocation?.lastName || '',
      phone: defaultLocation?.phone || '',
      street: defaultLocation?.street || '',
      country: 'Việt Nam',
      city: defaultLocation?.city || '',
      district: defaultLocation?.district || '',
      ward: defaultLocation?.ward || '',
      payment: 'cash_on_delivery'
    }
  })

  const onSubmitCheckout = (data: z.infer<typeof formSchema>) => {
    const items = JSON.parse(dataCart).map((item: any) => {
      return {
        productId: item.productId._id,
        productOptionId: item.productOptionId._id,
        quantity: item.quantity,
        unitPrice: item.productOptionId.price
      }
    })
    if (user && user._id && defaultLocation) {
      const order: IOrder = {
        userId: user._id,
        orderName: defaultLocation.firstName + ' ' + defaultLocation.lastName,
        orderPhone: defaultLocation.phone || '',
        orderAddress:
          defaultLocation.country +
          ', ' +
          defaultLocation.city +
          ', ' +
          defaultLocation.district +
          ', ' +
          defaultLocation.ward +
          ', ' +
          defaultLocation.street,
        totalPrice: amount,
        items,
        payment: {
          paymentMethod: data.payment,
          amount: amount
        },
        statusHistory: [
          {
            status: data.payment == 'credit_card' ? 'unpaid' : 'pending'
          }
        ],
        status: data.payment == 'credit_card' ? 'unpaid' : 'pending'
      }
      mutate(order)
    } else {
      toast({
        title: t('error'),
        description: t('description')
      })
    }
  }
  useEffect(() => {
    if (isErrorOrder) {
      setErrorOrder((error as any).response?.data?.data)
    }
  }, [isErrorOrder])

  useEffect(() => {
    if (isSuccess && dataOrder?.data?.data) {
      const order = dataOrder.data.data as IOrder
      if (order) {
        if (order._id && order.payment?.paymentMethod === 'cash_on_delivery') {
          navigate('/order/' + order._id)
        } else if (order._id && order.payment?.paymentMethod === 'credit_card') {
          setOrderState(order)
          setOpenQR(true)
        }
      }
    }
  }, [isSuccess, dataOrder, navigate])

  useEffect(() => {
    if (success) {
      toast({
        title: t('paymentSuccessTitle'),
        description: t('paymentSuccessDescription'),
        variant: 'default'
      })

      setTimeout(() => navigate('/order/' + orderState._id), 3000)
    }
  }, [success])
  useEffect(() => {
    if (openQR == isFinished && isFinished == true) {
      setIsFinished(false)
    }
    if (openQR == isFinished && isFinished == false) {
      navigate('/account/order')
    }
  }, [openQR])

  return (
    <>
      <Form {...form}>
        <form
          id='checkoutForm'
          onSubmit={(e) => {
            e.preventDefault()
            if ((e.target as HTMLFormElement).id === 'checkoutForm') {
              form.handleSubmit(onSubmitCheckout)(e)
            }
          }}
        >
          <div className='gap-y-6 flex flex-col'>
            {user && user?.locations ? <AddressCheckout data={locations} /> : <Skeleton className='h-[100px]' />}

            <div className='px-6 py-10 border border-black rounded-md flex flex-col gap-y-6'>
              <h1 className='font-medium text-xl'>{t('title3')}</h1>
              <FormField
                control={form.control}
                name='payment'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className='flex flex-col'>
                        <FormItem
                          className={`flex border items-center justify-between space-y-0 border-black py-3 px-4 rounded-md`}
                        >
                          <div className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <RadioGroupItem value='credit_card' />
                            </FormControl>
                            <FormLabel className='font-normal cursor-pointer'>{t('paymentMethod1')}</FormLabel>
                          </div>

                          <p className='text-right'>
                            <CreditCard size={24} strokeWidth={1.2} />
                          </p>
                          <FormMessage />
                        </FormItem>
                        <FormItem className='flex border items-center justify-between space-y-0 border-black py-3 px-4 rounded-md'>
                          <div className='flex items-center space-x-3 space-y-0'>
                            <FormControl>
                              <RadioGroupItem value='cash_on_delivery' />
                            </FormControl>
                            <FormLabel className='font-normal cursor-pointer'>{t('paymentMethod2')}</FormLabel>
                          </div>
                          <p className='text-right'>
                            <DollarSign size={24} strokeWidth={1.3} />
                          </p>
                          <FormMessage />
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button
              disabled={
                dataOrder ||
                isPending ||
                isLoading ||
                isLoadingCart ||
                !user ||
                stateErrorOrder ||
                JSON.parse(dataCart).length === 0
              }
              form='checkoutForm'
              variant={'default'}
              className={`bg-black py-6`}
            >
              {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : t('submit')}
            </Button>
          </div>
        </form>
      </Form>
      <PaymentPopup
        open={openQR}
        setOpen={setOpenQR}
        orderState={orderState}
        setSuccess={setSuccess}
        success={success}
      />
    </>
  )
}

export default CheckoutForm
