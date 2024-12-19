import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/context/LanguageContext'
import { useEffect, useState } from 'react'
import { formatDate } from '@/utils/formatDate'
import { useTranslate } from '@/hooks/useTranslate'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useContactMutation from '@/hooks/mutations/useContactMutation'
import useOrderMutation from '@/hooks/mutations/useOrderMutation'
import { useToast } from '@/hooks/use-toast'
import { z } from 'zod'
import { IContact } from '@/interface/contact'
import { useAuthContext } from '@/context/AuthContext'

const AccountOrderRequestForm = ({ data }: any) => {
  const { user } = useAuthContext()
  const { t } = useTranslate('account.order.request')
  const { language } = useLanguage()
  const [dayDelivery, setDayDelivery] = useState<number>(0)
  const [date, setDate] = useState<Date | null>()
  const { mutate: sendMail } = useContactMutation()
  const { mutate } = useOrderMutation({ action: 'UPDATE' })
  const { toast } = useToast()
  const returnRequestSchema = z.object({
    selectedProducts: z
      .array(
        z.object({
          productId: z.string(),
          productOptionId: z.string(),
          quantity: z.number().min(0, t('quantityError')),
          unitPrice: z.number().min(0, t('unitPriceError'))
        })
      )
      .min(1, t('selectProductError')),
    reason: z.string().min(10, t('reasonError'))
  })
  const form = useForm<z.infer<typeof returnRequestSchema>>({
    resolver: zodResolver(returnRequestSchema),
    defaultValues: {
      selectedProducts: [],
      reason: ''
    }
  })

  useEffect(() => {
    if (data) {
      if (data?.data?.items) {
        form.reset({
          selectedProducts: data.data.items.map((item: any) => ({
            productId: item.productId?._id || '',
            productOptionId: item.productOptionId?._id || '',
            quantity: 0,
            unitPrice: item.unitPrice
          })),
          reason: ''
        })
      }
      const deliveredDateRaw = data?.data?.statusHistory?.find((item: any) => item.status === 'delivered')?.date
      if (deliveredDateRaw) {
        setDate(deliveredDateRaw)
        const deliveredDate = new Date(deliveredDateRaw)
        if (!isNaN(deliveredDate.getTime())) {
          const today = new Date()
          const timeDiff = today.getTime() - deliveredDate.getTime()
          const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
          setDayDelivery(dayDiff)
        }
      }
    }
  }, [data, form])

  const onSubmit = (dataForm: z.infer<typeof returnRequestSchema>) => {
    if (data?.data._id) {
      const check = dataForm.selectedProducts.some(
        (item: any, index: number) => item.quantity > data?.data.items[index].quantity
      )
      if (check) {
        form.setError('reason', {
          message: 'Số lượng sản phẩm không hợp lệ so với số lượng sản phẩm trong đơn hàng !'
        })
        return
      }
      const returnData = dataForm.selectedProducts.filter((item: any) => item.quantity > 0 && item.productOptionId)
      if (returnData.length <= 0) {
        toast({
          title:  "Không thể hoàn trả",
          description: "Vui lòng thêm số lượng sản phẩm trên đơn hoàn trả !",
          variant: 'default'
        })
        return
      }
      mutate({
        _id: data?.data._id,
        returnInfo: {
          reason: dataForm.reason,
          items: returnData
        }
      })
      const newContact: IContact = {
        email: user?.email || import.meta.env.VITE_EMAIL_NAME,
        subject: `Yêu cầu hoàn đơn hàng: ${data.data.code}`,
        text: `
          Xin chào ${user?.name || 'Quý khách'}, 
      
          Chúng tôi đã nhận được yêu cầu hoàn đơn hàng của bạn. Dưới đây là thông tin chi tiết:
      
          - Email khách hàng: ${user?.email || 'Không có thông tin'}
          - Số điện thoại khách hàng: ${user?.phone || 'Không có thông tin'}
          - Mã đơn hàng: ${data.data.code}
          - Lý do hoàn đơn: ${dataForm.reason}
      
          Chúng tôi sẽ liên hệ và giải quyết yêu cầu của bạn trong thời gian sớm nhất. Nếu cần hỗ trợ thêm, vui lòng phản hồi email này hoặc liên hệ với chúng tôi qua hotline: ${
            import.meta.env.VITE_SUPPORT_PHONE || 'Không có thông tin hotline'
          }.
      
          Trân trọng, 
          Đội ngũ hỗ trợ khách hàng - Nội Thất River
        `
      }

      sendMail(newContact)
      toast({
        title: 'Success',
        description: 'Yêu cầu hoàn đơn hàng thành công'
      })
    }
  }
  return (
    <>
      <h1 className='text-2xl font-bold mb-6'>Tạo yêu cầu hoàn trả </h1>
      <p className='mb-4'>Yêu cầu hoàn trả sẽ chỉ được thực hiện tối đa sau 7 ngày kể từ ngày giao hàng</p>
      <p className='mb-4'>Ngày giao hàng: {date && formatDate(date, language)}</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            {data?.data.items && data.data.items.length > 0 ? (
              data.data.items.map((item: any, index: number) => (
                <div key={index} className='flex items-center'>
                  <img
                    src={item.productOptionId?.image || ''}
                    alt={item.productId?.name}
                    className='w-24 h-24 object-cover'
                  />
                  <div className='ml-4'>
                    <h3>Tên sản phẩm: {item.productId?.name}</h3>
                    <div className='text-[12px] text-neutral-7 '>
                      {item.productOptionId?.variants &&
                        item.productOptionId.variants.map((variant: any, id: number) => (
                          <h4 className='whitespace-nowrap' key={id}>
                            {variant.variant}: {variant.value}
                          </h4>
                        ))}
                    </div>
                    <p>Số lượng mua: {item.quantity}</p>
                    <FormField
                      name={`selectedProducts.${index}.quantity`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              min={0}
                              max={item.quantity}
                              type='number'
                              {...field}
                              value={field.value || 0}
                              onChange={(e) => {
                                field.onChange(Number(e.target.value))
                              }}
                              placeholder={t('Số lượng')}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>{t('emptyOrder')}</p>
            )}
          </div>

          <FormField
            name='reason'
            control={form.control}
            render={({ field }) => (
              <FormItem className='mt-4'>
                <FormLabel>Lý do hoàn trả</FormLabel>
                <FormControl>
                  <Textarea placeholder='Nhập vào lý do bạn muốn trả những sản phẩm này...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='mt-6 w-full' disabled={dayDelivery > 7}>
            Gửi yêu cầu
          </Button>
        </form>
      </Form>
    </>
  )
}

export default AccountOrderRequestForm
