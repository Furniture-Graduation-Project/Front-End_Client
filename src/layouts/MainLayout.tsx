import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header/Header'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { useAuthToken } from '@/hooks/useAuthToken'
import useListenOrder from '@/hooks/useListenOrder'
import useListenUnauthorized from '@/hooks/useListenUnauthorized'
import { Toaster } from 'sonner'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  useListenOrder()
  useAuthToken()
  const { isDialogOpen, handleDialogClose } = useListenUnauthorized()
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
              <button
                className='px-4 py-2 bg-blue-600 text-white rounded-md'
                onClick={handleDialogClose} // Đóng dialog và chuyển hướng
              >
                Đăng nhập lại
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default MainLayout
