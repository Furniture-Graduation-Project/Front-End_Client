import Container from '@/components/Container'
import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header/Header'

interface MainLayoutProps {
  children: React.ReactNode
}
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header></Header>
      <Container>{children}</Container>
      <Footer></Footer>
    </>
  )
}

export default MainLayout
