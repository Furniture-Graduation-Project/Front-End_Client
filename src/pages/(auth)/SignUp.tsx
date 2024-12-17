import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useAccountMutation from '@/hooks/mutations/useUserMutation'
import { useTranslate } from '@/hooks/useTranslate'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

const SignUp = () => {
  const { onSubmit: handleSubmit, isPending } = useAccountMutation({
    action: 'SIGNUP'
  })

  const { t } = useTranslate('signup')

  const FormSchema = z
    .object({
      name: z.string().min(3, {
        message: t('nameValidate')
      }),
      email: z.string().email({
        message: t('emailValidate')
      }),
      password: z.string().min(9, {
        message: t('passwordValidate')
      }),
      confirmPassword: z.string().min(9, {
        message: t('passwordValidate')
      }),
      remember: z.literal(true, {
        errorMap: () => ({ message: t('check') })
      })
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: t('confirmPass')
    })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      remember: true
    }
  })

  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { remember, ...rest } = data
    handleSubmit(rest)
  }

  return (
    <div className='py-4 px-6 sm:px-12 lg:px-24 xl:px-32 sm:h-full flex flex-col justify-center text-neutral-4 space-y-6'>
      <h1 className='headline-7 sm:headline-6 lg:headline-5 xl:headline-4 text-black'>{t('title', 'Sign Up')}</h1>
      <div className='flex space-x-1 mb-3 sm:mb-6 body-2'>
        <span className='font-normal'>{t('alreadyAccount', 'Already have an account?')}</span>
        <div>
          <Link to='/signin' className='body-2-semi text-green'>
            {t('signin', 'Sign In')}
          </Link>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            name='name'
            render={({ field }) => (
              <FormItem>
                <Input
                  disabled={isPending}
                  className='text-black flex h-10 w-full border-b border-b-neutral-3 bg-white px-3 py-2 body-2'
                  placeholder={t('fullNamePlaceholder', 'Your name')}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='email'
            render={({ field }) => (
              <FormItem>
                <Input
                  disabled={isPending}
                  className='text-black flex h-10 w-full border-b border-b-neutral-3 bg-white px-3 py-2 body-2'
                  placeholder={t('emailPlaceholder', 'Your email address')}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='password'
            render={({ field }) => (
              <FormItem className='relative'>
                <Input
                  disabled={isPending}
                  className='flex h-10 w-full border-b border-b-neutral-3 bg-white px-3 py-2 body-2'
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('passwordPlaceholder', 'Password')}
                  {...field}
                />
                <button
                  type='button'
                  className='absolute right-3 top-[30%] -translate-y-1/2'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <Input
                  disabled={isPending}
                  type={showPassword ? 'text' : 'password'}
                  className='flex h-10 w-full border-b border-b-neutral-3 bg-white px-3 py-2 body-2'
                  placeholder={t('confirmPasswordPlaceholder', 'Confirm password')}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='remember'
            render={({ field, fieldState }) => (
              <FormItem>
                <div className='mb-6'>
                  <div className='flex leading-none lg:mb-0 space-x-2'>
                    <Checkbox
                      className='mt-[1px] sm:mt-[4px]'
                      id='remember'
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                    <label htmlFor='remember' className='caption-2 sm:body-2'>
                      {t('privacyPolicy', 'I agree with ')}
                      &nbsp;
                      <span className='text-black caption-2-semi sm:body-2-semi'>
                        {t('privacyPolicyLink', 'Privacy Policy')}
                      </span>
                      &nbsp;
                      {t('andTermsOfUse', ' and ')}
                      &nbsp;
                      <span className='text-black caption-2-semi sm:body-2-semi'>
                        {t('termsOfUseLink', 'Terms of Use')}
                      </span>
                    </label>
                  </div>
                </div>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />

          <Button typeof='submit' disabled={isPending} className='w-full' type='submit'>
            {t('signupButton', 'Sign Up')}
          </Button>
        </form>
      </Form>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-white px-2 text-muted-foreground'>Hoặc</span>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4'>
        <Button
          variant='outline'
          className='w-full flex items-center justify-center space-x-2'
          onClick={() => {
            window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
          }}
        >
          <img src='/public/google-logo.webp' alt='logo-auth' className='w-5 h-5' />
          <span>{t('signinGoogle')}</span>
        </Button>
        <Button
          variant='outline'
          className='w-full flex items-center justify-center space-x-2'
          onClick={() => {
            window.location.href = `${import.meta.env.VITE_API_URL}/auth/facebook`
          }}
        >
          <img src='/public/logo-fb.svg' alt='logo-auth' className='w-5 h-5' />
          <span>{t('signinFacebook', 'Sign in with Facebook')}</span>
        </Button>
      </div>
    </div>
  )
}

export default SignUp
