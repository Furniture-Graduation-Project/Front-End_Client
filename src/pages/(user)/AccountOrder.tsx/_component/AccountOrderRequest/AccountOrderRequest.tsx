import { useParams } from 'react-router-dom'
import { useSingleOrderQuery } from '@/hooks/queries/useOrderQuery'
import { Skeleton } from '@/components/ui/skeleton'
import AccountOrderRequestInfo from './AccountOrderRequestInfo'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import AccountOrderRequestForm from './AccountOrderRequestForm'


const AccountOrderRequest = () => {
  const { id } = useParams()
  const { data, isLoading } = useSingleOrderQuery(id || '')
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
      {data?.data.returnInfo && data?.data.returnInfo?.items.length > 0 ? (
        <AccountOrderRequestInfo data={data} />
      ) : (
        <AccountOrderRequestForm data={data} />
      )}
      <Card className='mt-6'>
        <CardHeader>
          <h3 className='font-semibold'>Yêu cầu liên lạc</h3>
        </CardHeader>
        <CardContent>
          <p>Nếu bạn cần hỗ trợ thêm hoặc muốn liên hệ với chúng tôi, vui lòng sử dụng thông tin bên dưới:</p>
          <ul className='list-disc list-inside mt-2'>
            <li>
              <strong>Email:</strong>{' '}
              <a
                className='underline'
                href={`mailto:${import.meta.env.VITE_EMAIL_NAME}?subject=Yêu cầu hỗ trợ khách hàng`}
              >
                {import.meta.env.VITE_EMAIL_NAME}
              </a>
            </li>
            <li>
              <strong>Hotline:</strong> 088 6024 065
            </li>
            <li>
              <strong>Giờ làm việc:</strong> Thứ 2 - Thứ 6, 8:00 - 18:00
            </li>
          </ul>
          <p className='mt-2'>
            Chúng tôi sẵn sàng hỗ trợ bạn để giải quyết mọi thắc mắc liên quan đến yêu cầu hoàn trả.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default AccountOrderRequest
