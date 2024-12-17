import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import useAccountMutation from '@/hooks/mutations/useUserMutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import * as z from 'zod'
import { useTranslate } from '@/hooks/useTranslate'

const formSchema = z.object({
  otp: z.string()
})

export default function VerifyOtp() {
  const { mutate } = useAccountMutation({ action: 'VERIFY_OTP' })
  const { mutate: sendOtp } = useAccountMutation({ action: 'SEND_OTP' })

  const { t } = useTranslate('account.forgotPassword')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })
  const navigate = useNavigate()

  const [timeLeft, setTimeLeft] = useState(60)
  const [isResendDisabled, setIsResendDisabled] = useState(true)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setIsResendDisabled(false)
    }
  }, [timeLeft])

  const handleResendOtp = () => {
    setTimeLeft(60)
    setIsResendDisabled(true)
    sendOtp({ email: '', _id: '', password: '' })
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      mutate(
        { ...values, _id: '', password: '' },
        {
          onSuccess: () => navigate('/new-password', { replace: true })
        }
      )
      localStorage.setItem('otp', 'true')
      toast.success('Xác thực thành công!')
    } catch (error) {
      toast.error('Xác thực thất bại!')
      console.error(error)
    }
  }

  return (
    <div className='py-4 px-6 sm:px-12 lg:px-24 xl:px-32 sm:h-full flex flex-col justify-center space-y-6'>
      <h2 className='font-bold text-3xl'>{t('otp')}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='otp'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>{t('otpDescription')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex items-center gap-x-4'>
            <Button type='submit'>{t('submit')}</Button>
            <Button type='button' variant='outline' onClick={handleResendOtp} disabled={isResendDisabled}>
              {t('otpResend')} {isResendDisabled && `(${timeLeft}s)`}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
