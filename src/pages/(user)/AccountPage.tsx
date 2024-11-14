import { Outlet } from 'react-router-dom'
import SidebarAcccount from './component/Sidebar'
import Container from '@/components/Container'

const AccountPage = () => {
  return (
    <Container>
      <h1 className='text-[54px] text-center py-8'>My Account</h1>
      <div className='grid grid-cols-1 md:grid-cols-[262px_1fr] gap-10'>
        <SidebarAcccount />
        <div>
          <Outlet />
        </div>
      </div>
    </Container>
  )
}

export default AccountPage
