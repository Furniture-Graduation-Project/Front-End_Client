import { useSingleOrderQuery } from '@/hooks/queries/useOrderQuery'
import { useParams } from 'react-router-dom'
import AccountOrderAddress from './AccountOrderAddress'
import AccountOrderInfomation from './AccountOrderInfomation'
import AccountOrderStatus from './AccountOrderStatus'
import AccountOrderPayment from './AccountOrderPayment'
const AccountOrderDetail = () => {
  const { id } = useParams()
  const { data } = useSingleOrderQuery(id || '')
  return (
    <div className='space-y-4 p-4 sm:p-6'>
      <AccountOrderStatus order={data} />
      <AccountOrderAddress order={data} />
      <AccountOrderInfomation order={data} />
      <AccountOrderPayment order={data} />
    </div>
  )
}

export default AccountOrderDetail
