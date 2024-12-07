import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header/Header'
import { useAuthToken } from '@/hooks/useAuthToken'
import useListenOrder from '@/hooks/useListenOrder'
import { Toaster } from 'sonner'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  useListenOrder()
  useAuthToken()
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <div className='flex-1'>{children}</div>
      <Footer />
      <Toaster />
    </div>
  )
}

export default MainLayout
