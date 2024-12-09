import { ColumnDef } from '@tanstack/react-table'
import { CellAction } from './CellAction'
import { useAuthContext } from '@/context/AuthContext'
import { useTranslate } from '@/hooks/useTranslate'
import { Link } from 'react-router-dom'

export type WishlistColumn = {
  _id: string
  name: string
  image: string
  addedAt: Date
}

export const useWishlistColumns = (): ColumnDef<WishlistColumn>[] => {
  const { t } = useTranslate('account.wishlist')
  const { user } = useAuthContext()

  return [
    {
      accessorKey: 'name',
      header: t('product'),
      cell: ({ row }) => (
        <div className='flex items-center gap-x-4 p-0'>
          <Link to={`/products/${row.original._id}`}>
            <img
              className='w-16 h-20 rounded-md'
              src={row.original.image || '/placeholder-image.jpg'}
              alt={row.original.name || 'Product image'}
            />
          </Link>
          <Link to={`/products/${row.original._id}`}>
            <p className='hover:underline'>{row.original.name}</p>
          </Link>
        </div>
      )
    },
    {
      accessorKey: 'addedAt',
      header: t('time'),
      cell: ({ row }) => <p>{new Date(row.original.addedAt).toLocaleDateString()}</p>
    },
    {
      accessorKey: 'action',
      header: t('action'),
      cell: ({ row }) => <CellAction userId={user?._id} data={row.original} />
    }
  ]
}
