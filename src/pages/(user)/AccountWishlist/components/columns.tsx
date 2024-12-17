/* eslint-disable react-hooks/rules-of-hooks */
import { useAuthContext } from '@/context/AuthContext'
import useWishlistMutation from '@/hooks/mutations/useWishlistMutation'
import { useProductWithPriceQuery } from '@/hooks/queries/useProductQuery'
import { useTranslate } from '@/hooks/useTranslate'
import { formatCurrency } from '@/utils/formatCurrency'
import { ColumnDef } from '@tanstack/react-table'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CellAction } from './CellAction'
import { useMemo, useState } from 'react'
import { AlertModal } from '@/components/ui/alert-modal'
import { IWishlist } from '@/interface/wishlist'
import PopupProduct from '@/components/site/PopupProduct'

export type WishlistColumn = {
  _id: string
  name: string
  image: string
  addedAt: Date
}

export const useWishlistColumns = (): ColumnDef<WishlistColumn>[] => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { t } = useTranslate('account.wishlist')
  const { user } = useAuthContext()

  const { mutate } = useWishlistMutation({ action: 'REMOVE' })

  const onDelete = async (userId: string, data: IWishlist) => {
    try {
      setLoading(true)
      mutate({ userId, data })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return useMemo(
    () => [
      {
        accessorKey: 'name',
        header: t('product'),
        cell: ({ row }) => (
          <>
            <AlertModal
              isOpen={open}
              onClose={() => setOpen(false)}
              onConfirm={() => onDelete(user?._id || '', row.original)}
              loading={loading}
            />
            <div className='flex items-center gap-x-4 p-0'>
              <X onClick={() => setOpen(true)} className='h-6 w-6 mr-2 text-[#6C7275] hover:cursor-pointer' />
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
          </>
        )
      },
      {
        accessorKey: 'price',
        header: t('price'),
        cell: ({ row }) => {
          const { data: product } = useProductWithPriceQuery(row.original._id)
          const minPrice = product?.data?.prices ? Math.min(...(product?.data?.prices ?? [])) : null
          const maxPrice = product?.data?.prices ? Math.max(...(product?.data?.prices ?? [])) : null

          return (
            <>
              {minPrice !== null && maxPrice !== null ? (
                <div className='flex'>
                  <p className='flex gap-1'>
                    {formatCurrency(minPrice)}
                    {minPrice !== maxPrice && (
                      <>
                        <span>~</span> {formatCurrency(maxPrice)}
                      </>
                    )}
                  </p>
                </div>
              ) : (
                <p>##########</p>
              )}
            </>
          )
        }
      },
      {
        accessorKey: 'addToCart',
        header: t('action'),
        cell: ({ row }) => <PopupProduct productId={row.original._id} button />
      }
    ],
    [loading, open, t, user]
  )
}
