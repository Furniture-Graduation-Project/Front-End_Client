import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header/Header'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { useAuthToken } from '@/hooks/useAuthToken'
import useListenLockAccount from '@/hooks/useListenLockAccount'
import useListenOrder from '@/hooks/useListenOrder'
import useListenUnauthorized from '@/hooks/useListenUnauthorized'
import { Link } from 'react-router-dom'
import { Toaster } from 'sonner'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  useListenOrder()
  useAuthToken()
  const { isDialogOpen, handleDialogClose } = useListenUnauthorized()
  const { isLockOpen, handleLockClose } = useListenLockAccount()
  return (
    <>
      <div className='min-h-screen flex flex-col'>
        <Header />
        <div className='flex-1'>{children}</div>
        <Footer />
      </div>
      <Toaster />
      <Dialog open={isDialogOpen} onOpenChange={(open) => (open ? null : handleDialogClose())}>
        <DialogContent>
          <DialogHeader>
            <h3 className='text-xl font-semibold'>Phiên đăng nhập đã hết hạn</h3>
          </DialogHeader>
          <p className='text-sm text-gray-600'>
            Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại để tiếp tục sử dụng dịch vụ.
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleDialogClose}>Đăng nhập lại</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isLockOpen} onOpenChange={(open) => (open ? null : handleLockClose())}>
        <DialogContent>
          <DialogHeader>
            <h3 className='text-xl font-semibold'>Tài khoản của bạn đã bị khóa</h3>
          </DialogHeader>
          <p className='text-sm text-gray-600'>
            Nếu có thắc mắc về hành động này vui long liên hệ với chúng tôi tại{' '}
            <Link to={'/contact'} className='text-blue underline'>
              liên hệ
            </Link>
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleLockClose}>Đăng nhập lại</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default MainLayout
