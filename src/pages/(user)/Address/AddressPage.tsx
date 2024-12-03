import { useAuthContext } from '@/context/AuthContext'
import AddressCard from './_components/AddressCard'
import { useAddressQuery } from '@/hooks/queries/useAddressQuery'

const AddressPage = () => {
  const { user } = useAuthContext()
  const { data } = useAddressQuery(user?._id as string)
  return <AddressCard data={data} />
}

export default AddressPage
