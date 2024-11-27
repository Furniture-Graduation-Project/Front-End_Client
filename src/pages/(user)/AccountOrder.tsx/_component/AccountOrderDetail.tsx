import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Truck } from 'lucide-react'
import { useSingleOrderQuery } from '@/hooks/queries/useOrderQuery'
import { useParams } from 'react-router-dom'

const AccountOrderDetail = () => {
  const { id } = useParams()
  const { data, isLoading } = useSingleOrderQuery(id || '')
  console.log(data)

  return (
    <div className='space-y-4 p-4 sm:p-6'>
      <Card>
        <CardHeader>
          <div className='flex items-center space-x-4'>
            <div className='flex gap-4 overflow-x-scroll no-scrollbar max-w-full border-b pb-2'>
              {Array(7)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className='flex items-center gap-4 border-2 border-green-500 rounded-md p-2 min-w-[250px]'
                  >
                    <Truck />
                    <div>
                      <h2 className='text-lg font-bold'>{data?.data.status}</h2>
                      <p className='text-sm text-gray-500'>22-22-2222</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <h2 className='text-xl font-bold'>Địa chỉ nhận hàng</h2>
        </CardHeader>
        <CardContent>
          <div className='flex flex-wrap items-center gap-4'>
            <div className='text-lg font-semibold'>
              <MapPin />
            </div>
            <div>
              <h3 className='font-bold'>{data?.data.orderName}</h3>
              <p className='text-sm text-gray-600'>
                {data?.data.orderPhone} - {data?.data.orderAddress}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h2 className='text-xl font-bold'>Chi tiết đơn hàng</h2>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            <img src='' alt='Product' className='w-24 h-24 object-cover sm:w-32 sm:h-32' />
            <div className='flex flex-col justify-between'>
              <h3 className='text-lg font-semibold'>Áo chống nắng</h3>
              <h5 className='text-sm text-gray-600'>Size</h5>
              <h3 className='text-xl font-bold'>127,000 VND</h3>
            </div>
            <h2 className='text-lg font-bold'>Thanh tiền: 570,000 VND</h2>
          </div>
          <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
            <h3 className='text-lg font-bold'>Mã đơn hàng</h3>
            <div className='flex items-center gap-2'>
              <h3 className='text-lg uppercase'>{data?.data._id}</h3>
              <Button variant='outline' size='sm'>
                Sao chép
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phương thức thanh toán */}
      <Card>
        <CardHeader>
          <h2 className='text-xl font-bold'>Phương thức thanh toán</h2>
        </CardHeader>
        <CardContent className='space-y-4'>
          <h3 className='text-lg'>
            {data?.data.payment?.paymentMethod === 'cash_on_delivery'
              ? 'Thanh toán khi nhận hàng'
              : 'Thanh toán trước khi nhận hàng'}
          </h3>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {['Thời gian đặt hàng', 'Thời gian thanh toán', 'Thời gian giao hàng', 'Thời gian hoàn thành'].map(
              (label, index) => (
                <div key={index} className='space-y-1'>
                  <h3 className='text-lg'>{label}</h3>
                  <p className='text-sm text-gray-600'>00--388-3283282</p>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AccountOrderDetail
