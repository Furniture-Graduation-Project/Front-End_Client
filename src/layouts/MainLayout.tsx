import Container from '@/components/Container'
import Footer from '@/components/common/Footer'

interface MainLayoutProps {
  children: React.ReactNode
}
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Container>{children}</Container>
      <Footer></Footer>
    </div>
  )
}

export default MainLayout
