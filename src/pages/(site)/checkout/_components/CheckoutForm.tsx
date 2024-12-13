import { zodResolver } from '@hookform/resolvers/zod'
import { CreditCard, DollarSign, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/utils/classUtils'
import { useTranslate } from '@/hooks/useTranslate'
import { useEffect, useState } from 'react'
import { IDistrict, ILocation, IWard } from '@/interface/location'
import useOrderMutation from '@/hooks/mutations/useOrderMutation'
import { IOrder } from '@/interface/order'
import { useAddressQuery, useAllAddressQuery } from '@/hooks/queries/useAddressQuery'
import { useAuthContext } from '@/context/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { useNavigate } from 'react-router-dom'
import PaymentPopup from '@/components/site/PaymentPopup/PaymentPopup'
import AddressCheckout from './AddressCheckout'
import { IAddress } from '@/interface/address'
import { AlertModal } from '@/components/ui/alert-modal'

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
  const [currentDistrict, setCurrentDistrict] = useState<IDistrict[]>([])
  const [currentWard, setCurrentWard] = useState<IWard[]>([])
  const { data, isLoading, isError } = useAllAddressQuery()
  const [isFinished, setIsFinished] = useState<boolean>(true)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const {
    mutate,
    isSuccess,
    isError: isErrorOrder,
    error,
    data: dataOrder,
    isPending
  } = useOrderMutation({ action: 'CREATE' })
  const { data: locations } = useAddressQuery(user?._id || '')

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
  const handleChangeDistrict = (value: string, field: any) => {
    field.onChange(value)
    const selectedCity = data?.data.find((city) => city.name === value)
    setCurrentDistrict(selectedCity ? selectedCity.districts : [])
  }
  const handleChangeWard = (value: string, field: any) => {
    field.onChange(value)
    const selectedWard = currentDistrict?.find((ward) => ward.name === value)
    setCurrentWard(selectedWard ? selectedWard.wards : [])
  }
  const onSubmitCheckout = (data: z.infer<typeof formSchema>) => {
    const items = JSON.parse(dataCart).map((item: any) => {
      return {
        productId: item.productId._id,
        productOptionId: item.productOptionId._id,
        quantity: item.quantity,
        unitPrice: item.productOptionId.price
      }
    })
    if (user && user._id && !defaultLocation) {
      const order: IOrder = {
        userId: user._id,
        orderName: data.firstName + ' ' + data.lastName,
        orderPhone: data.phone || '',
        orderAddress: data.country + ', ' + data.city + ', ' + data.district + ', ' + data.ward + ', ' + data.street,
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
    }
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
    }
  }
  useEffect(() => {
    if (isErrorOrder) {
      setErrorOrder((error as any).response.data.data)
      toast({
        title: (error as any).response.data.message,
        description: t('errorOrder'),
        action: <ToastAction altText='Try again'>{t('tryAgain')}</ToastAction>
      })
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
    if (success && dataOrder?.data?.data) {
      const order = dataOrder.data.data as IOrder
      toast({
        title: t('paymentSuccessTitle'),
        description: t('paymentSuccessDescription'),
        variant: 'default'
      })
      setTimeout(() => navigate('/order/' + order._id), 3000)
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
      {user && user?.locations.length === 0 && (
        <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={() => {}} loading={loading} />
      )}
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
            {user && user?.locations && user?.locations.length > 0 ? (
              <AddressCheckout data={locations} />
            ) : (
              <>
                <div className='px-6 py-10 border rounded-md flex flex-col gap-y-6 border-black'>
                  <h1 className='font-medium text-xl'>{t('title1')}</h1>
                  <div className='grid grid-cols-2 gap-x-6'>
                    <FormField
                      control={form.control}
                      name='lastName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>
                            {t('lastName')}
                          </FormLabel>
                          <FormControl>
                            <Input type='text' {...field} placeholder={t('lastName')} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    ></FormField>
                    <FormField
                      control={form.control}
                      name='firstName'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn(`uppercase text-[#6C7275] font-bold text-[12px]`)}>
                            {t('firstName')}
                          </FormLabel>
                          <FormControl>
                            <Input type='text' {...field} placeholder={t('firstName')} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    ></FormField>
                  </div>
                  <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('phone')}</FormLabel>
                        <FormControl>
                          <Input type='text' {...field} placeholder={t('phone')} />
                        </FormControl>
                        <Select>
                          <SelectContent>
                            {currentDistrict && currentDistrict.length > 0 ? (
                              currentDistrict.map((item: IDistrict) => (
                                <SelectItem key={item.codename} value={item.name}>
                                  {item.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem key='-1' value='-1'>
                                #####
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={form.control}
                    name='ward'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('country')}</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue className='placeholder-gray-400' placeholder='Country' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='Việt Nam'>Việt Nam</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={form.control}
                    name='city'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('city')}</FormLabel>
                        <Select
                          onValueChange={(value) => handleChangeDistrict(value, field)}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue className='placeholder-gray-400' placeholder={t('city')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {data?.data && data.data.length > 0 ? (
                              data.data.map((item: ILocation) => (
                                <SelectItem key={item.codename} value={item.name}>
                                  {item.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem key='-1' value='-1'>
                                Trống
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                  <div className='grid grid-cols-2 gap-x-6'>
                    <FormField
                      control={form.control}
                      name='district'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>
                            {t('district')}
                          </FormLabel>
                          <Select onValueChange={(value) => handleChangeWard(value, field)} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue className='placeholder-gray-400' placeholder={t('district')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {currentDistrict && currentDistrict.length > 0 ? (
                                currentDistrict.map((item: IDistrict) => (
                                  <SelectItem key={item.codename} value={item.name}>
                                    {item.name}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem key='-1' value='-1'>
                                  Trống
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    ></FormField>
                    <FormField
                      control={form.control}
                      name='ward'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('ward')}</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue className='placeholder-gray-400' placeholder={t('ward')} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {currentWard && currentWard.length > 0 ? (
                                  currentWard.map((item: IWard) => (
                                    <SelectItem key={item.codename} value={item.name}>
                                      {item.name}
                                    </SelectItem>
                                  ))
                                ) : (
                                  <SelectItem key='-1' value='-1'>
                                    Trống
                                  </SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    ></FormField>
                  </div>
                  <FormField
                    control={form.control}
                    name='street'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('street')}</FormLabel>
                        <FormControl>
                          <Input type='text' {...field} placeholder={t('street')} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                </div>
              </>
            )}

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
                isError ||
                isLoadingCart ||
                !user ||
                stateErrorOrder ||
                JSON.parse(dataCart).length === 0
              }
              form='checkoutForm'
              variant={'default'}
              className={`bg-black py-6`}
              onClick={() => setOpen(true)}
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
