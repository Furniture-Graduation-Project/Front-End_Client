import { ColumnDef } from '@tanstack/react-table'
import { IOrder } from '@/interface/order'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'
import { useLanguage } from '@/context/LanguageContext'
import { getOrderStatus } from '@/utils/getOrderStatus'
import useOrderMutation from '@/hooks/mutations/useOrderMutation'
import { Button } from '@/components/ui/button'

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Ngày mua',
    cell: ({ getValue }) => {
      const { language } = useLanguage()
      const dateValue = getValue()
      return <h3 className='line-clamp-1'>{formatDate(dateValue, language)}</h3>
    }
  },

  {
    accessorKey: 'totalPrice',
    header: 'Tổng Giá Trị',
    cell: ({ row }) => {
      const { language } = useLanguage()
      const price = row.getValue<number>('totalPrice')
      return <h3>{formatCurrency(price, language)}</h3>
    }
  },
  {
    accessorKey: 'status',
    header: 'Trạng Thái',
    cell: ({ row }) => {
      const { mutate } = useOrderMutation({ action: 'UPDATE' })
      const { language } = useLanguage()
      const status = row.getValue<string>('status')
      const statusText = getOrderStatus(status, language)
      return (
        <>
          {row.original.status == 'shipped' ? (
            <Button
              onClick={() =>
                mutate({
                  _id: row.original._id,
                  status: 'delivered'
                })
              }
              className={`rounded-none`}
              variant={'outline'}
            >
              {statusText}
            </Button>
          ) : (
            <h3 className='whitespace-nowrap'> {statusText}</h3>
          )}
        </>
      )
    }
  },
  {
    accessorKey: 'payment',
    header: 'Trạng Thái Thanh Toán',
    cell: ({ row }) => {
      const paymentStatus = row.original.payment?.paymentStatus
      const paymentText =
        paymentStatus === 'paid'
          ? 'Đã Thanh Toán'
          : paymentStatus === 'unpaid'
            ? 'Chưa Thanh Toán'
            : 'Chưa có thông tin'
      return <h3 className={paymentStatus === 'paid' ? 'text-green' : 'text-red' + ' line-clamp-1'}> {paymentText}</h3>
    }
  }
]
