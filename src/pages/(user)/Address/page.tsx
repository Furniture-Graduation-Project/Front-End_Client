import { useReadLocalStorage } from 'usehooks-ts'
import AddressCard from './_components/AddressCard'
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
