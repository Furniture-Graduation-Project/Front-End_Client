import { Outlet } from 'react-router-dom'
import SidebarAccount from './component/Sidebar'
import Container from '@/components/Container'
import { useTranslate } from '@/hooks/useTranslate'

const AccountPage = () => {
  const { t } = useTranslate('account.detail')

  return (
    <div>
      <Container>
        <h1 className='text-[54px] text-center py-8'>{t('title')}</h1>
        <div className='relative grid grid-cols-1 md:grid-cols-[262px_1fr] gap-10 max-w-[1200px] mx-auto box-border'>
          <SidebarAccount />
          <div className='px-4 overflow-auto break-words'>
            <Outlet />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default AccountPage
