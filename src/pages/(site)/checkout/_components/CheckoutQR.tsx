import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useLanguage } from '@/context/LanguageContext'
import useOrderMutation from '@/hooks/mutations/useOrderMutation'
import { IApiResponse } from '@/interface/apiRespose'
import { IOrder, IQRCodeData } from '@/interface/order'
import { formatCurrency } from '@/utils/formatCurrency'
import { useEffect, useState } from 'react'

const CheckoutQR = ({
  orderState,
  open,
  setOpen
}: {
  orderState: IOrder | null
  open: boolean
  setOpen: (open: boolean) => void
}) => {
  const { language } = useLanguage()
  const [qrCode, setQrCode] = useState<string | null>(null)
  const { mutate, isSuccess, data } = useOrderMutation({ action: 'CREATE_QR' })
  const hanleCreateQR = () => {
    mutate({ amount: orderState?.totalPrice?.toFixed(), addInfo: 'OKKKKKK' })
  }

  useEffect(() => {
    if (isSuccess) {
      const dataQR = data.data.data as IApiResponse<IQRCodeData>
      setQrCode(dataQR.data.qrDataURL)
    }
  }, [isSuccess])

  return (
    <Card>
      <CardHeader>
        <h2 className='text-xl font-bold'></h2>
      </CardHeader>
      <CardContent>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>A</DialogTrigger>
          <DialogContent className='sm:max-w-[610px]'>
            <DialogHeader>
              <DialogTitle>
                <h2 className='text-center'>Mã QR Chuyển khoản ngân hàng</h2>
              </DialogTitle>
              <DialogDescription className='py-2'>
                <div className={qrCode ? 'hidden' : 'block' + ' flex justify-center'}>
                  <Button onClick={hanleCreateQR}>Lấy mã qr</Button>
                </div>
                <img className={qrCode ? 'block' : 'hidden'} src={qrCode || ''} alt='QRCODE' />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className='flex flex-col'>
              <div>
                <h3 className='text-red'>Vui lòng chuyển khoản đúng nội dung để chúng tôi xác nhận thanh toán !</h3>
                <h2 className='text-md font-bold text-center'>Thông tin tài khoản ngân hàng</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Thông tin</TableHead>
                      <TableHead>Chi tiết</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className='p-3'>Tên tài khoản</TableCell>
                      <TableCell className='p-3'>Nguyễn Đình Tuân</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='p-3'>Số tài khoản</TableCell>
                      <TableCell className='p-3'>0987654321</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='p-3'>Ngân hàng</TableCell>
                      <TableCell className='p-3'>MB Bank</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='p-3'>Số tiền</TableCell>
                      <TableCell className='p-3'>
                        {orderState?.totalPrice && formatCurrency(orderState?.totalPrice, language)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

export default CheckoutQR
