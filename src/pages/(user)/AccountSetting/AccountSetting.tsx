import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthContext } from '@/context/AuthContext'
import useAccountMutation from '@/hooks/mutations/useUserMutation'
import { useTranslate } from '@/hooks/useTranslate'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { DeleteAccount } from './DeleteAccount'
import ForgotPassPage from '../ForgotPass/ForgotPassPage'

export default function AccountDetail() {
  const [change, setChange] = useState(true)
  const { user } = useAuthContext()
  const { t } = useTranslate('account.detail')

  const socialMediaAccount = user?.account

  const formSchema = z.object({
    name: z.string().min(1, t('nameValidate')),
    email: z
      .string()
      .email({
        message: t('emailValidate2')
      })
      .min(1, t('emailValidate')),
    password: z.string().min(6, t('passwordValidate'))
  })

  const { mutate } = useAccountMutation({ action: 'UPDATE' })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  useEffect(() => {
    form.reset({
      name: user?.name,
      email: user?.email
    })
  }, [user])

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (user?._id) {
      const payload = { ...data, _id: user._id }
      mutate(payload)
      setChange(true)
      form.reset({
        name: user?.name,
        email: user?.email,
        password: ''
      })
    } else {
      console.error('User ID is undefined')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7 mb-14'>
        <p className='text-xl font-semibold'>{t('account')}</p>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('name')}</FormLabel>
              <FormControl>
                <Input disabled={change} placeholder={t('name')} type='text' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input disabled={change} placeholder={t('email')} type='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('pass')}</FormLabel>
              <FormControl>
                <Input disabled={change} placeholder={t('pass')} type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center justify-between'>
          {socialMediaAccount && <ForgotPassPage socialMediaAccount />}
          <div className=''>
            <Button className='mr-4' type='button' variant={'outline'} onClick={() => setChange(!change)}>
              {t('change')}
            </Button>

            <Button disabled={change} type='submit'>
              {t('submit')}
            </Button>
          </div>
        </div>
        <div className='ml-auto'>
          <DeleteAccount id={user?._id || ''} />
        </div>
      </form>
    </Form>
  )
}
