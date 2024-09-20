import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header/Header'
import NotificationBar from '@/components/common/NotificationBar'

interface MainLayoutProps {
  children: React.ReactNode
}
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <NotificationBar />
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default MainLayout
