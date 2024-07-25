import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useTranslate } from '@/hooks/useTranslate'
import { Minus, Plus, X } from 'lucide-react'

const CartTable = () => {
  const { t } = useTranslate('cart.cartTable')
  return (
    <>
      <Table>
        <TableHeader className='w-full'>
          <TableRow className='*:text-black *:font-semibold w-full'>
            <TableHead className='w-[420px] lg:p-4 px-0'>{t('product')}</TableHead>
            <TableHead className='sm:hidden'></TableHead>
            <TableHead className='hidden sm:table-cell'>{t('quantity')}</TableHead>
            <TableHead className='hidden sm:table-cell'>{t('price')}</TableHead>
            <TableHead className='hidden sm:table-cell'>{t('subtotal')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell className='lg:p-4 px-0'>
                <div className='flex gap-4'>
                  <img
                    src='https://assets.weimgs.com/weimgs/rk/images/wcm/products/202420/0120/meyer-wooden-drink-tables-18-21-5-o.jpg'
                    alt=''
                    className='w-24 h-28'
                  />
                  <div className='flex flex-col gap-y-2 justify-center'>
                    <h1 className='font-semibold text-[14px]'>Tray Table</h1>
                    <p className='text-[12px] text-[#6C7275]'>Color: Black</p>
                    <button className='hidden sm:flex items-center gap-1 *:text-[#605F5F] '>
                      <X size={24} />
                      <p className='font-semibold text-[14px]'>{t('action')}</p>
                    </button>
                    <div className='w-20 justify-center flex items-center border sm:hidden border-black rounded-lg py-1.5'>
                      <button>
                        <Minus className='h-4 w-4' strokeWidth={1} />
                      </button>
                      <span className='mx-3'>1</span>
                      <button>
                        <Plus className='h-4 w-4' strokeWidth={1} />
                      </button>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className='sm:hidden sm:p-4 px-0'>
                <div className='flex flex-col items-end justify-start -mt-10 gap-2'>
                  <p className='font-semibold'>$19.19</p>
                  <button className='flex items-center gap-1 *:text-[#605F5F] '>
                    <X size={24} />
                  </button>
                </div>
              </TableCell>
              <TableCell className='hidden sm:table-cell'>
                <div className='w-20 justify-center flex items-center border border-black rounded-lg py-1.5'>
                  <button>
                    <Minus className='h-4 w-4' strokeWidth={1} />
                  </button>
                  <span className='mx-3'>1</span>
                  <button>
                    <Plus className='h-4 w-4' strokeWidth={1} />
                  </button>
                </div>
              </TableCell>
              <TableCell className='hidden sm:table-cell'>$150.00</TableCell>
              <TableCell className='font-semibold hidden sm:table-cell'>$150.00</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default CartTable
