import { DataTable } from '@/components/ui/data-table'
import { useWishlistColumns, WishlistColumn } from './columns'

interface WishlistProps {
  data: WishlistColumn[]
}

const Wishlist = ({ data }: WishlistProps) => {
  const columns = useWishlistColumns()
  return (
    <div>
      <DataTable columns={columns} data={data} searchKey='name' />
    </div>
  )
}

export default Wishlist
