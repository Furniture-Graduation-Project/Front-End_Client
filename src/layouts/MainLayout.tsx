import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header/Header'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <div className='flex-1'>{children}</div>
      <Footer />
    </div>
  )
}

export default MainLayout
