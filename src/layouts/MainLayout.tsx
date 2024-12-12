import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header/Header'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { useAuthToken } from '@/hooks/useAuthToken'
import useListenLockAccount from '@/hooks/useListenLockAccount'
import useListenOrder from '@/hooks/useListenOrder'
import useListenUnauthorized from '@/hooks/useListenUnauthorized'
import { useTranslate } from '@/hooks/useTranslate'
import { Link } from 'react-router-dom'
import { Toaster } from 'sonner'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { t } = useTranslate('mainLayout')

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
            <h3 className='text-xl font-semibold'>{t('loginExpired')}</h3>
          </DialogHeader>
          <p className='text-sm text-gray-600'>{t('loginExpiredMessage')}</p>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleDialogClose}>{t('loginAgain')}</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isLockOpen} onOpenChange={(open) => (open ? null : handleLockClose())}>
        <DialogContent>
          <DialogHeader>
            <h3 className='text-xl font-semibold'>{t('accountLocked')}</h3>
          </DialogHeader>
          <p className='text-sm text-gray-600'>
            {t('accountLockedMessage')}{' '}
            <Link to={'/contact'} className='text-blue underline'>
              {t('contact')}
            </Link>
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <Link
                className='bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 py-2 rounded-sm'
                to={'/signin'}
                onClick={handleLockClose}
              >
                {t('loginAgain')}
              </Link>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default MainLayout
