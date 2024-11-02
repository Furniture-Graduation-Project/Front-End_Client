import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTranslate } from '@/hooks/useTranslate';
import { Minus, Plus, X } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/config/axios';
type CartTableProps = {
  amount: number;
  setAmount: (value: number) => void;
};

const CartTable = ({amount, setAmount } : CartTableProps) => {
  const { t } = useTranslate('cart.cartTable');

  const queryClient = useQueryClient();

  const { data: cartData, isLoading, isError } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await axiosInstance.get(`cart/652bc4e5a2f2b8123e9d4567`);
      setAmount(response.data.data.carts.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0))
      return response.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async ({ productId, productItemId }: { productId: string; productItemId: string }) => {
      await axiosInstance.delete(`cart/${productId}/${productItemId}`);
    },
    onError: (error) => {
      console.error("Lỗi khi xóa sản phẩm:", error);
      alert("Lỗi khi xóa sản phẩm: " + error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const { mutate: increaseQuantity } = useMutation({
    mutationFn: async ({ productId, productItemId }: { productId: string; productItemId: string }) => {
      await axiosInstance.patch(`cart/increase/652bc4e5a2f2b8123e9d4567/${productId}/${productItemId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const { mutate: decreaseQuantity } = useMutation({
    mutationFn: async ({ productId, productItemId }: { productId: string; productItemId: string }) => {
      await axiosInstance.patch(`cart/decrease/652bc4e5a2f2b8123e9d4567/${productId}/${productItemId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (!cartData.data) {
    return <div>Không có sản phẩm nào trong giỏ hàng.</div>;
  }

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
        {cartData.data.carts.map((item: any, index: number) => (
          <TableRow key={index}>
            <TableCell className='lg:p-4 px-0'>
              <div className='flex gap-4'>
                <img
                  src='https://assets.weimgs.com/weimgs/rk/images/wcm/products/202420/0120/meyer-wooden-drink-tables-18-21-5-o.jpg'
                  alt={item.productID._id}
                  className='w-24 h-28'
                />
                <div className='flex flex-col gap-y-2 justify-center'>
                  <h1 className='font-semibold text-[14px]'>{item.productID.name}</h1>
                  <p className='text-[12px] text-[#6C7275]'>{item.productItemID.variants.map((variant: any, id: number) => (
                    <span key={id}>
                      {variant.variant}: {variant.value}
                    </span>
                  ))}</p>
                  <button className='hidden sm:flex items-center gap-1 *:text-[#605F5F]'onClick={() => mutate({ productId: item.productID._id, productItemId: item.productItemID._id })}>
                    <X size={24} />
                    <p className='font-semibold text-[14px]'>{t('action')}</p>
                  </button>
                  <div className='w-20 justify-center flex items-center border sm:hidden border-black rounded-lg py-1.5'>
                    <button onClick={() => decreaseQuantity({ productId: item.productID._id, productItemId: item.productItemID._id })}>
                      <Minus className='h-4 w-4' strokeWidth={1} />
                    </button>
                    <span className='mx-3'>{item.quantity}</span>
                    <button onClick={() => increaseQuantity({ productId: item.productID._id, productItemId: item.productItemID._id })}>
                      <Plus className='h-4 w-4' />
                    </button>
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell className='sm:hidden sm:p-4 px-0'>
              <div className='flex flex-col items-end justify-start -mt-10 gap-2'>
                <p className='font-semibold'>${item.price.toFixed(2)}</p>
                <button className='flex items-center gap-1 *:text-[#605F5F]' onClick={() => mutate({ productId: item.productID.id, productItemId: item.productItemID.id })}>
                  <X size={24} />
                </button>
              </div>
            </TableCell>
            <TableCell className='hidden sm:table-cell'>
              <div className='w-20 justify-center flex items-center border border-black rounded-lg py-1.5'>
                <button onClick={() => decreaseQuantity({ productId: item.productID._id, productItemId: item.productItemID._id })}>
                  <Minus className='h-4 w-4' strokeWidth={1} />
                </button>
                <span className='mx-3'>{item.quantity}</span>
                <button onClick={() => increaseQuantity({ productId: item.productID._id, productItemId: item.productItemID._id })}>
                  <Plus className='h-4 w-4' />
                </button>
              </div>
            </TableCell>
            <TableCell className='hidden sm:table-cell'>${(item.price).toFixed(2)}</TableCell>
            <TableCell className='font-semibold hidden sm:table-cell'>${(item.price * item.quantity).toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
          {/* Hiển thị tổng số tiền */}
          <div className="text-right font-semibold mt-4">
        Tổng số tiền: ${amount.toFixed(2)}
      </div>
    </>
  );
};

export default CartTable;
