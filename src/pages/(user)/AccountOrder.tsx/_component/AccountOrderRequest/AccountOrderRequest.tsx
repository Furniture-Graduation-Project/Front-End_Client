import { useParams } from 'react-router-dom'
import { useSingleOrderQuery } from '@/hooks/queries/useOrderQuery'
import { Skeleton } from '@/components/ui/skeleton'
import AccountOrderRequestInfo from './AccountOrderRequestInfo'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import AccountOrderRequestForm from './AccountOrderRequestForm'
import { useTranslate } from '@/hooks/useTranslate'

const AccountOrderRequest = () => {
  const { id } = useParams()
  const { data, isLoading } = useSingleOrderQuery(id || '')
  const { t } = useTranslate('account.order.request')

  if (isLoading) {
    return (
      <div className='max-w-3xl mx-auto p-6'>
        <h1 className='text-2xl font-bold mb-6'>
          <Skeleton className='h-6 w-48' />
        </h1>
        <div className='space-y-4'>
          {[...Array(3)].map((_, index) => (
            <div key={index} className='flex items-center space-x-4'>
              <Skeleton className='w-24 h-24' />
              <div className='flex-1 space-y-2'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-4 w-20' />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className='max-w-3xl mx-auto p-6'>
      {data?.data.returnInfo && data?.data.returnInfo?.items?.length > 0 ? (
        <AccountOrderRequestInfo data={data} />
      ) : (
        <AccountOrderRequestForm data={data} />
      )}
      <Card className='mt-6'>
        <CardHeader>
          <h3 className='font-semibold'>{t('contact_request')}</h3>
        </CardHeader>
        <CardContent>
          <p>{t('support_message')}</p>
          <ul className='list-disc list-inside mt-2'>
            <li>
              <strong>{t('email')}:</strong>{' '}
              <a className='underline' href={`mailto:${import.meta.env.VITE_EMAIL_NAME}?subject=${t('email_subject')}`}>
                {import.meta.env.VITE_EMAIL_NAME}
              </a>
            </li>
            <li>
              <strong>{t('hotline')}:</strong> {import.meta.env.VITE_ACCOUNT_NO}
            </li>
            <li>
              <strong>{t('working_hours')}</strong>
            </li>
          </ul>
          <p className='mt-2'>{t('resolution_message')}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default AccountOrderRequest
