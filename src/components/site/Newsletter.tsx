import { NewsletterBanner } from '@/assets'
import useSheetMutation from '@/hooks/mutations/useGoogleSheet'
import { useTranslate } from '@/hooks/useTranslate'
import { Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

const Newsletter = () => {
  const { t } = useTranslate('home.newsletter')
  const { mutate, isPending } = useSheetMutation()
  const { toast } = useToast()
  const newsletterSchema = z.object({
    mail: z.string().email({ message: t('error') })
  })
  const form = useForm({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { mail: '' }
  })

  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: () => {
        toast({
          title: t('successMessage'),
          description: t('subscriptionSuccess'),
          variant: 'success'
        })
        form.reset()
      },
      onError: () => {
        toast({
          title: t('errorMessage'),
          description: t('checkEmailError'),
          variant: 'default'
        })
      }
    })
  }

  return (
    <div className='relative mt-[74px] h-[300px] lg:h-auto'>
      <img className='w-full h-full md:object-cover' src={NewsletterBanner} alt='banner' />
      <div>
        <img src='/images/footer.png' alt='' className='hidden lg:block' />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center tracking-wider'>
          <h1 className='headline-5 sm:headline-4 mb-3'>{t('join')}</h1>
          <p className='text-[14px] sm:text-[18px] text-[#141718]'>{t('signupText')}</p>

          <div className='mt-5'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 '>
                <FormField
                  name='mail'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <div className='relative'>
                        <FormLabel className='flex items-center absolute top-1/2 left-3 -translate-y-1/2'>
                          <Mail className='h-6 w-6 mr-2' strokeWidth={1} />
                        </FormLabel>
                        <FormControl>
                          <Input
                            type='email'
                            placeholder={t('emailPlaceholder')}
                            {...field}
                            className='flex-1 pl-12 bg-transparent rounded-none border-neutral-4'
                          />
                        </FormControl>
                        <Button
                          type='submit'
                          variant={'null'}
                          disabled={form.formState.isSubmitting || isPending}
                          className={`absolute top-1/2 right-5 -translate-y-1/2 font-medium transition duration-500 ease-in-out transform hover:scale-110 ${form.formState.isSubmitting ? 'opacity-50' : ''}`}
                        >
                          {form.formState.isSubmitting ? t('loading') : t('signupButton')}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Newsletter
