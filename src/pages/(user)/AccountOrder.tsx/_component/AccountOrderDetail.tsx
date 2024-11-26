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
    <div className='space-y-2 p-6'>
      <Card>
        <CardHeader>
          <div className='flex items-center space-x-4'>
            <div className='flex gap-16 overflow-x-scroll no-scrollbar max-w-[1100px] border-b pb-1'>
              <div className='flex items-center gap-5 border-2 border-green rounded-md p-2'>
                <Truck />
                <div>
                  <h2 className='text-xl font-bold'>{data?.data.status}</h2>
                  <p className='text-sm text-gray-500'>22-22-2222</p>
                </div>
              </div>
              <div className='flex items-center gap-5 border-2 border-green rounded-md p-2'>
                <Truck />
                <div>
                  <h2 className='text-xl font-bold'>{data?.data.status}</h2>
                  <p className='text-sm text-gray-500'>22-22-2222</p>
                </div>
              </div>
              <div className='flex items-center gap-5 border-2 border-green rounded-md p-2'>
                <Truck />
                <div>
                  <h2 className='text-xl font-bold'>{data?.data.status}</h2>
                  <p className='text-sm text-gray-500'>22-22-2222</p>
                </div>
              </div>
              <div className='flex items-center gap-5 border-2 border-green rounded-md p-2'>
                <Truck />
                <div>
                  <h2 className='text-xl font-bold'>{data?.data.status}</h2>
                  <p className='text-sm text-gray-500'>22-22-2222</p>
                </div>
              </div>
              <div className='flex items-center gap-5 border-2 border-green rounded-md p-2'>
                <Truck />
                <div>
                  <h2 className='text-xl font-bold'>{data?.data.status}</h2>
                  <p className='text-sm text-gray-500'>22-22-2222</p>
                </div>
              </div>
              <div className='flex items-center gap-5 border-2 border-green rounded-md p-2'>
                <Truck />
                <div>
                  <h2 className='text-xl font-bold'>{data?.data.status}</h2>
                  <p className='text-sm text-gray-500'>22-22-2222</p>
                </div>
              </div>
              <div className='flex items-center gap-5 border-2 border-green rounded-md p-2'>
                <Truck />
                <div>
                  <h2 className='text-xl font-bold'>{data?.data.status}</h2>
                  <p className='text-sm text-gray-500'>22-22-2222</p>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <h2 className='text-xl font-bold'>Địa chỉ nhận hàng</h2>
        </CardHeader>
        <CardContent>
          <div className='flex items-center space-x-4'>
            <div className='text-lg font-semibold'>
              <MapPin />
            </div>
            <div>
              <h3 className='font-bold'>{data?.data.orderName}</h3>
              <span className='text-sm text-gray-600'>{data?.data.orderPhone}</span>
              <span>-</span>
              <span className='text-sm text-gray-600'>{data?.data.orderAddress}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h2 className='text-xl font-bold'>Chi tiết đơn hàng</h2>
        </CardHeader>
        <CardContent className='flex flex-col gap-5'>
          <div className='flex flex-col sm:flex-row sm:space-x-4'>
            <img src='' alt='Product Image' className='w-24 h-24 object-cover sm:w-32 sm:h-32' />
            <div className='flex flex-col justify-between sm:w-1/2'>
              <div>
                <h3 className='text-lg font-semibold'>Áo chống nắng</h3>
                <h5 className='text-sm text-gray-600'>Size</h5>
              </div>
              <div>
                <h3 className='text-xl font-bold'>127,000 VND</h3>
              </div>
            </div>
            <h2 className='text-xl font-bold sm:text-lg'>Thanh tiền: 570,000 VND</h2>
          </div>
          <div className='flex justify-between'>
            <h3 className='text-x font-bold'>Mã đơn hàng</h3>
            <div className='flex justify-between items-center gap-5'>
              <h3 className='text-lg uppercase'>{data?.data._id}</h3>
              <Button variant='outline' size='sm'>
                Sao chép
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h2 className='text-xl font-bold'>Phương thức thanh toán</h2>
        </CardHeader>
        <CardContent>
          <h3 className='text-lg mb-4'>
            {data?.data.payment?.paymentMethod == 'cash_on_delivery'
              ? 'Thanh toan khi nhan hang'
              : 'Thanh toan truoc khi nhan hang'}
          </h3>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col'>
              <h3 className='text-lg'>Thời gian đặt hàng</h3>
              <h3 className='text-sm text-gray-600'>00--388-3283282</h3>
            </div>
            <div className='flex flex-col'>
              <h3 className='text-lg'>Thời gian thanh toán</h3>
              <h3 className='text-sm text-gray-600'>00--388-3283282</h3>
            </div>
            <div className='flex flex-col'>
              <h3 className='text-lg'>Thời gian bắt đầu giao hàng</h3>
              <h3 className='text-sm text-gray-600'>00--388-3283282</h3>
            </div>
            <div className='flex flex-col'>
              <h3 className='text-lg'>Thời gian hoàn thành đơn</h3>
              <h3 className='text-sm text-gray-600'>00--388-3283282</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AccountOrderDetail
