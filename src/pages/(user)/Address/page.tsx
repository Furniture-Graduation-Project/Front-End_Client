import { useReadLocalStorage } from 'usehooks-ts'

import Container from '@/components/Container'
import AddressCard from './_components/AddressCard'
import Sidebar from '../component/Sidebar'
import { useAddressQuery } from '@/hooks/queries/useAddressQuery'

interface User {
  userId: string
}

const AddressPage = () => {
  const user = useReadLocalStorage<User>('user')
  console.log(user)
  const { data } = useAddressQuery(user?.userId as string)
  return <AddressCard data={data} />
}

export default AddressPage
