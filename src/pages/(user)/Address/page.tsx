import { useReadLocalStorage } from 'usehooks-ts'

import Container from '@/components/Container'
import AddressCard from './_components/AddressCard'
import Sidebar from './_components/Sidebar'
import useAddressQuery from '@/hooks/queries/useAddressQuery'

interface User {
  userId: string
}

const AddressPage = () => {
  const user = useReadLocalStorage<User>('user')

  const { data } = useAddressQuery(user?.userId as string)

  return (
    <Container>
      <h1 className='text-[54px] text-center py-20'>My Account</h1>
      <div className='flex gap-x-20 mb-20'>
        <Sidebar />
        <AddressCard data={data} />
      </div>
    </Container>
  )
}

export default AddressPage
