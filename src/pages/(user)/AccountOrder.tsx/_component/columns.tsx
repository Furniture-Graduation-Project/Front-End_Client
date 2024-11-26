import { ColumnDef } from '@tanstack/react-table'
import { IOrder } from '@/interface/order'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'
import { useLanguage } from '@/context/LanguageContext'

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Chờ xử lý'
    case 'confirmed':
      return 'Đã xác nhận'
    case 'processing':
      return 'Đang xử lý'
    case 'shipped':
      return 'Đã gửi hàng'
    case 'delivered':
      return 'Đã giao hàng'
    case 'cancelled':
      return 'Đã hủy'
    case 'returned':
      return 'Đã hoàn trả'
    case 'refunded':
      return 'Đã hoàn tiền'
    default:
      return ''
  }
}

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: '_id',
    header: 'Mã đơn hàng',
    cell: ({ row }) => {
      return (
        <div>
          <h3 className='uppercase line-clamp-1'>{row.original._id}</h3>
        </div>
      )
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Ngày mua',
    cell: ({ getValue }) => {
      const { language } = useLanguage()
      const dateValue = getValue()
      const parsedDate =
        dateValue instanceof Date
          ? dateValue
          : typeof dateValue === 'string' || typeof dateValue === 'number'
            ? new Date(dateValue)
            : null

      const formattedDate = parsedDate && !isNaN(parsedDate.getTime()) ? formatDate(parsedDate, language) : '#Trống'

      return <h3 className='line-clamp-1'>{formattedDate}</h3>
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
      const status = row.getValue<string>('status')
      const statusText = getStatusText(status)
      return <h3 className='line-clamp-1'>{statusText}</h3>
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
