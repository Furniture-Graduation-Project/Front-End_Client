import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header/Header'
import { useAuthToken } from '@/hooks/useAuthToken'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  useAuthToken()
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <div className='flex-1'>{children}</div>
      <Footer />
    </div>
  )
}

export default MainLayout
