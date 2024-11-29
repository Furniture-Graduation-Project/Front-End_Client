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
import { useAllAddressQuery } from '@/hooks/queries/useAddressQuery'
import { useAuthContext } from '@/context/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { useNavigate } from 'react-router-dom'
import PaymentPopup from '@/components/site/PaymentPopup/PaymentPopup'

const formSchema = z.object({
  firstName: z.string().min(1, 'Họ không được để trống.'),
  lastName: z.string().min(1, 'Tên không được để trống.'),
  phone: z.string().min(1, 'Số điện thoại không được để trống.'),
  street: z.string().min(1, 'Đường/phố không được để trống.'),
  country: z.string().min(1, 'Quốc gia không được để trống.'),
  city: z.string().min(1, 'Thành phố không được để trống.'),
  district: z.string().min(1, 'Quận/huyện không được để trống.'),
  ward: z.string().min(1, 'Phường/xã không được để trống.'),
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
  const { mutate, isSuccess, isError: isErrorOrder, error, data: dataOrder } = useOrderMutation({ action: 'CREATE' })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      street: '',
      country: 'Việt Nam',
      city: '',
      district: '',
      ward: '',
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
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const items = JSON.parse(dataCart).map((item: any) => {
      return {
        productId: item.productId._id,
        productOptionId: item.productOptionId._id,
        quantity: item.quantity,
        unitPrice: item.productOptionId.price
      }
    })
    if (user && user._id) {
      const order: IOrder = {
        userId: user._id,
        orderName: data.firstName + ' ' + data.lastName,
        orderPhone: data.phone,
        orderAddress: data.country + ', ' + data.city + ', ' + data.district + ', ' + data.ward + ', ' + data.street,
        totalPrice: amount,
        items,
        payment: {
          paymentMethod: data.payment,
          amount: amount
        },
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
    if (success) {
      toast({
        title: 'Thanh toan thanh cong !',
        description: 'Thanh cong ban se duoc di chuyen den trang order sau 3s',
        variant: 'default'
      })
      setTimeout(() => navigate('/order/' + orderState._id), 3000)
    }
  }, [success])
  return (
    <>
      {' '}
      <Form {...form}>
        <form action='' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='gap-y-6 flex flex-col'>
            <div className='px-6 py-10 border rounded-md flex flex-col gap-y-6 border-black'>
              <h1 className='font-medium text-xl'>{t('title1')}</h1>
              <div className='grid grid-cols-2 gap-x-6'>
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('lastName')}</FormLabel>
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
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>
            <div className='px-6 py-10 border border-black rounded-md flex flex-col gap-y-6'>
              <h1 className='font-medium text-xl'>{t('title2')}</h1>

              <FormField
                control={form.control}
                name='country'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('country')}</FormLabel>
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
                    <Select onValueChange={(value) => handleChangeDistrict(value, field)} defaultValue={field.value}>
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
                      <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('district')}</FormLabel>
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
                isLoading || isError || isLoadingCart || !user || stateErrorOrder || JSON.parse(dataCart).length === 0
              }
              variant={'default'}
              className={`bg-black py-6`}
              type='submit'
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
