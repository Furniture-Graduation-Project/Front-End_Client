import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { PasswordInput } from '@/components/ui/password-input'
import { useAuthContext } from '@/context/AuthContext'
import useAccountMutation from '@/hooks/mutations/useUserMutation'
import { useTranslate } from '@/hooks/useTranslate'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import ForgotPassPage from '../ForgotPass/ForgotPassPage'

export default function ChangePassPage() {
  const { user } = useAuthContext()
  const { mutate } = useAccountMutation({ action: 'UPDATE' })
  const { t } = useTranslate('account.changePassword')
  const formSchema = z
    .object({
      password: z.string().min(9, {
        message: t('passValidate')
      }),
      newPassword: z.string().min(9, {
        message: t('newPassValidate')
      }),
      confirmPassword: z.string().min(9, {
        message: t('confirmPasswordValidate')
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

  function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      if (user?._id) {
        const payload = { ...data, _id: user._id }
        mutate(payload)
        form.reset({
          password: '',
          newPassword: '',
          confirmPassword: ''
        })
      }
    } catch (error) {
      console.error('Form submission error', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <p className='text-xl font-semibold'>{t('title')}</p>

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('oldPassword')}</FormLabel>
              <FormControl>
                <PasswordInput placeholder={t('oldPassword')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
        <div className='flex flex-col gap-y-4 '>
          <ForgotPassPage />
          <Button type='submit'>{t('change')}</Button>
        </div>
      </form>
    </Form>
  )
}
