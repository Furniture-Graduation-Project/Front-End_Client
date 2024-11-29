import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useTranslate } from '@/hooks/useTranslate'
import { Minus, Plus, X } from 'lucide-react'
import { useCartMutation } from '@/hooks/mutations/useCartMutation'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { IApiResponse } from '@/interface/apiRespose'
import { ICart } from '@/interface/cart'
import { useAuthContext } from '@/context/AuthContext'
import { formatCurrency } from '@/utils/formatCurrency'
import { useToast } from '@/hooks/use-toast'
import { useLanguage } from '@/context/LanguageContext'

type CartTableProps = {
  cartData: IApiResponse<ICart>
  setAmount: (value: number) => void
  isLoading: boolean
  isError: boolean
}

const CartTable = ({ setAmount, cartData, isLoading, isError }: CartTableProps) => {
  const { user } = useAuthContext()
  const { t } = useTranslate('cart.cartTable')
  const { language } = useLanguage()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { mutate: deleteItem } = useCartMutation('REMOVE')
  const { mutate: increaseQuantity } = useCartMutation('INCREASE')
  const { mutate: decreaseQuantity } = useCartMutation('DECREASE')

  useEffect(() => {
    if (cartData && cartData.data && cartData.data.carts) {
      setAmount(
        cartData.data.carts.reduce((acc: any, item: any) => {
          if (item.productOptionId.stock > 0) {
            return acc + item.productOptionId.price * item.quantity
          }
          return acc.toFixed(3)
        }, 0)
      )
    }
  }, [cartData, setAmount])

  const handleIncreaseQuantity = (item: any) => {
    if (item.quantity >= item.productOptionId.stock - item.productOptionId.outStock) {
      toast({
        title: t('stockLimit'),
        variant: 'default'
      })
      return
    }
    if (user) {
      increaseQuantity(
        { productId: item.productId._id, productOptionId: item.productOptionId._id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
          }
        }
      )
    }
  }

  const handleDecreaseQuantity = (item: any) => {
    if (item.quantity > 1 && user) {
      decreaseQuantity(
        { productId: item.productId._id, productOptionId: item.productOptionId._id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
          }
        }
      )
    }
  }

  const handleDeleteItem = (item: any) => {
    if (user) {
      deleteItem(
        { productId: item.productId._id, productOptionId: item.productOptionId._id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
          },
          onError: (error) => {
            toast({
              title: t('deleteError'),
              description: error.message,
              variant: 'default'
            })
          }
        }
      )
    }
  }

  return (
    <Table>
      <TableHeader className='w-full'>
        <TableRow className='*:text-black *:font-semibold w-full'>
          <TableHead className='w-[420px] lg:p-4 px-0'>{t('product')}</TableHead>
          <TableHead className='hidden sm:table-cell'>{t('quantity')}</TableHead>
          <TableHead className='hidden sm:table-cell'>{t('price')}</TableHead>
          <TableHead className='hidden sm:table-cell'>{t('subtotal')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={5} style={{ textAlign: 'center' }}>
              {t('loading')}
            </TableCell>
          </TableRow>
        ) : isError ? (
          <TableRow>
            <TableCell colSpan={5} style={{ textAlign: 'center' }}>
              {t('error')}
            </TableCell>
          </TableRow>
        ) : cartData && cartData.data && cartData.data.carts && cartData.data.carts.length > 0 ? (
          cartData.data.carts.map((item: any, index: number) => (
            <TableRow
              key={index}
              className={
                item.productOptionId.stock === 0 || item.productId.status !== 'available' ? 'opacity-50 pointer-events-none' : ''
              }
            >
              <TableCell className='lg:p-4 px-0'>
                <div className='flex gap-4'>
                  <img
                    src='https://assets.weimgs.com/weimgs/rk/images/wcm/products/202420/0120/meyer-wooden-drink-tables-18-21-5-o.jpg'
                    alt={item.productId._id}
                    className='w-24 h-28'
                  />
                  <div className='flex flex-col gap-y-2 justify-center'>
                    <h1 className='font-semibold text-[14px]'>{item.productId.name}</h1>
                    <p className='text-[12px] text-[#6C7275]'>
                      {item.productOptionId?.variants.map((variant: any, id: number) => (
                        <span key={id}>
                          {variant.variant}: {variant.value}
                        </span>
                      ))}
                    </p>
                    <p className='text-[12px] text-[#6C7275]'>
                      {item.productOptionId.stock === 0
                        ? t('out_of_stock')
                        : t('stock_quantity') + (item.productOptionId.stock - item.productOptionId.outStock)}
                    </p>
                    <button
                      className='hidden sm:flex items-center gap-1 *:text-[#605F5F]'
                      onClick={() => handleDeleteItem(item)}
                    >
                      <X size={24} />
                      <p className='font-semibold text-[14px]'>{t('action')}</p>
                    </button>
                    <div className='w-20 justify-center flex items-center border sm:hidden border-black rounded-lg'>
                      <button onClick={() => handleDecreaseQuantity(item)} disabled={item.productOptionId.stock === 0}>
                        <Minus className='h-4 w-4' strokeWidth={1} />
                      </button>
                      <span className='mx-3'>{item.quantity}</span>
                      <button onClick={() => handleIncreaseQuantity(item)} disabled={item.productOptionId.stock === 0}>
                        <Plus className='h-4 w-4' />
                      </button>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className='sm:hidden sm:p-4 px-0'>
                <div className='flex flex-col items-end justify-start -mt-10 gap-2'>
                  <p className='font-semibold whitespace-nowrap'>
                    {formatCurrency(item.productOptionId.price, language)}
                    {formatCurrency(item.productOptionId.price, language)}
                  </p>
                  <button className='flex items-center gap-1 *:text-[#605F5F]' onClick={() => handleDeleteItem(item)}>
                    <X size={24} />
                    <p className='font-semibold text-[14px]'>{t('action')}</p>
                  </button>
                </div>
              </TableCell>
              <TableCell className='hidden sm:table-cell sm:p-4 px-0 w-[260px]'>
                <div className='justify-center flex items-center border sm:flex border-black rounded-lg py-1.5'>
                  <button onClick={() => handleDecreaseQuantity(item)} disabled={item.productOptionId.stock === 0}>
                    <Minus className='h-4 w-4' strokeWidth={1} />
                  </button>
                  <span className='mx-3'>{item.quantity}</span>
                  <button onClick={() => handleIncreaseQuantity(item)} disabled={item.productOptionId.stock === 0}>
                    <Plus className='h-4 w-4' />
                  </button>
                </div>
              </TableCell>
              <TableCell className='hidden sm:table-cell sm:p-4 px-0'>
                <p className='font-semibold text-center whitespace-nowrap'>
                  {formatCurrency(item.productOptionId.price, language)}
                </p>
              </TableCell>
              <TableCell className='hidden sm:table-cell sm:p-4 px-0'>
                <p className='font-semibold text-center whitespace-nowrap'>
                  {formatCurrency(item.quantity * item.productOptionId.price, language)}
                </p>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} style={{ textAlign: 'center' }}>
              {t('cartEmpty')}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default CartTable
