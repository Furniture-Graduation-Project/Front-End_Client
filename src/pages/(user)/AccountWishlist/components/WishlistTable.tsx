import { Skeleton } from '@/components/ui/skeleton'
import { useAuthContext } from '@/context/AuthContext'
import { useWishlistQuery } from '@/hooks/queries/useWishlistQuery'
import { IWishlist } from '@/interface/wishlist'
import Wishlist from './Wishlist'
import { WishlistColumn } from './columns'
import { useTranslate } from '@/hooks/useTranslate'

const WishlistTable = () => {
  const { user } = useAuthContext()
  const { data: wishlist, isLoading } = useWishlistQuery(user?._id || '')
  const { t } = useTranslate('account.wishlist')
  const data: WishlistColumn[] = Array.isArray(wishlist?.data)
    ? wishlist.data.map((item: IWishlist) => ({
        _id: item.productId?._id || 'Unknown',
        name: item.productId?.name || 'Unknown',
        image: item.productId?.images?.[0] || '',
        addedAt: item.addedAt
      }))
    : []

  if (isLoading || !wishlist?.data) {
    return (
      <div>
        <Skeleton className='h-20' />
      </div>
    )
  }

  return (
    <div>
      <p className=' text-xl font-semibold'>{t('title')}</p>
      <Wishlist data={data} />
    </div>
  )
}

export default WishlistTable
