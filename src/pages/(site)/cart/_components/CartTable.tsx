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
import { Button } from '@/components/ui/button'

type CartTableProps = {
  cartData: IApiResponse<ICart>
  setAmount: (value: number) => void
  isLoading: boolean
  isError: boolean
}

const CartTable = ({ setAmount, cartData, isLoading, isError }: CartTableProps) => {
  const { user } = useAuthContext()
  const { t } = useTranslate('cart.cartTable')
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { mutate: deleteItem } = useCartMutation('REMOVE')
  const { mutate: increaseQuantity } = useCartMutation('INCREASE')
  const { mutate: decreaseQuantity } = useCartMutation('DECREASE')

  useEffect(() => {
    if (cartData && cartData.data && cartData.data.carts) {
      setAmount(
        cartData.data.carts.reduce((acc: any, item: any) => {
          if (item.productOptionId.stock - item.productOptionId.outStock > 0 && item.productId.status == 'available') {
            return acc + item.productOptionId.price * item.quantity
          }
          return acc
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
    if (item.quantity <= 1) {
      toast({
        title: t('Giới hạn số lượng'),
        description: t('Không thể giảm số lượng xuống dưới 1.'),
        variant: 'default'
      })
      return
    }
    if (user) {
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
                item.productOptionId.stock - item.productOptionId.outStock === 0 ||
                item.productId.status !== 'available'
                  ? 'relative'
                  : ''
              }
            >
              <TableCell className='lg:p-4 px-0'>
                <div className='flex gap-4'>
                  <div className='relative'>
                    <img src={item.productOptionId.image} alt={item.productId.name} className='w-24 h-28' />
                    <h6
                      className={`bg-neutral-3/50 absolute bottom-0 left-0 w-full text-center text-xs font-semibold py-1 ${item.productOptionId.stock - item.productOptionId.outStock <= 20 ? 'inline' : 'hidden'}`}
                    >
                      Sắp hết hàng
                    </h6>
                  </div>
                  <div className='flex flex-col gap-y-2 justify-center'>
                    <h1 className='font-semibold text-[14px]'>{item.productId.name}</h1>
                    <div className='text-[12px] text-neutral-7 flex flex-col'>
                      {item.productOptionId.variants.map((variant: any, id: number) => (
                        <span key={id}>
                          {variant.variant}: {variant.value}
                        </span>
                      ))}
                    </div>
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
                      <button
                        onClick={() => handleDecreaseQuantity(item)}
                        disabled={item.productOptionId.stock - item.productOptionId.outStock === 0}
                      >
                        <Minus className='h-4 w-4' strokeWidth={1} />
                      </button>
                      <span className='mx-3'>{item.quantity}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(item)}
                        disabled={item.productOptionId.outStock + item.quantity === 0}
                      >
                        <Plus className='h-4 w-4' />
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className={`absolute w-full h-full top-0 left-0 items-center justify-center ${item.productOptionId.stock - item.productOptionId.outStock === 0 || item.productId.status !== 'available' ? 'bg-slate-50/70 flex' : 'hidden'}`}
                >
                  <Button
                    type='button'
                    onClick={() => handleDeleteItem(item)}
                    disabled={item.productOptionId.stock === 0}
                    className='flex items-center gap-3'
                  >
                    <X className='text-neutral-4 w-[14px] h-[14px]' strokeWidth={2} /> Loại bỏ
                  </Button>
                </div>
              </TableCell>
              <TableCell className='sm:hidden sm:p-4 px-0'>
                <div className='flex flex-col items-end justify-start -mt-10 gap-2'>
                  <p className='font-semibold whitespace-nowrap'>
                    {formatCurrency(item.productOptionId.price)}
                    {formatCurrency(item.productOptionId.price)}
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
                  {formatCurrency(item.productOptionId.price)}
                </p>
              </TableCell>
              <TableCell className='hidden sm:table-cell sm:p-4 px-0'>
                <p className='font-semibold text-center whitespace-nowrap'>
                  {formatCurrency(item.quantity * item.productOptionId.price)}
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
