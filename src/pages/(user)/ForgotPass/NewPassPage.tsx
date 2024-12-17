import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { PasswordInput } from '@/components/ui/password-input'
import useAccountMutation from '@/hooks/mutations/useUserMutation'
import { useTranslate } from '@/hooks/useTranslate'
import { IUser } from '@/interface/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as z from 'zod'

export default function NewPassPage() {
  const { mutate } = useAccountMutation({ action: 'CHANGE_PASS' })
  const navigate = useNavigate()
  const { t } = useTranslate('account.forgotPassword')

  useEffect(() => {
    const isOtpVerified = localStorage.getItem('otp') === 'true'
    if (!isOtpVerified) {
      navigate('/forgot-password/verify-otp')
    }
  }, [navigate])

  const formSchema = z
    .object({
      newPassword: z.string().min(9, {
        message: t('validateNewPassword')
      }),
      confirmPassword: z.string().min(9, {
        message: t('validateConfirmPassword')
      })
    })
    .refine(
      (data) => {
        if (data.newPassword) {
          return data.newPassword === data.confirmPassword
        }
        return true
      },
      {
        message: t('confirmPasswordNotMatch'),
        path: ['confirmPassword']
      }
    )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      const user: IUser = {
        _id: '',
        password: values.newPassword,
        ...values
      }
      mutate(user)
      toast.success(t('changePasswordSuccess'))
      form.reset()
    } catch (error) {
      toast.error(t('changePasswordError'))
      console.error(error)
    }
  }

  return (
    <div className='py-4 px-6 sm:px-12 lg:px-24 xl:px-32 sm:h-full flex flex-col justify-center space-y-6'>
      <h2 className='font-bold text-3xl'>{t('changePassword')}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 '>
          <FormField
            control={form.control}
            name='newPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('newPassword')}</FormLabel>
                <FormControl>
                  <PasswordInput placeholder={t('newPassword')} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('confirmPassword')}</FormLabel>
                <FormControl>
                  <PasswordInput placeholder={t('confirmPassword')} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit'>{t('save')}</Button>
        </form>
      </Form>
    </div>
  )
}
