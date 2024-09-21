import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IAddress } from '@/interface/address'
import { MapPinPlus, PencilLine } from 'lucide-react'
import { Link } from 'react-router-dom'

interface IAddressCard {
  data: {
    locations: IAddress[]
  }
}

const AddressCard = ({ data }: IAddressCard) => {
  console.log(data)

  return (
    <main className='w-full'>
      <div className='flex justify-between'>
        <h2 className='text-xl font-semibold'>Address</h2>
        <Link to={'add'}>
          <Button size={'sm'} variant={'default'}>
            <MapPinPlus className='mr-2 w-4 h-4' />
            Add Address
          </Button>
        </Link>
      </div>
      <div className='grid grid-cols-3 mt-5 gap-x-6'>
        {data?.locations?.map((item) => (
          <Card className='border-neutral-400'>
            <CardHeader className='-mb-4'>
              <CardTitle className='flex justify-between text-base'>
                <p>Billing Address</p>
                <Button
                  variant={'none'}
                  size={'none'}
                  className='text-neutral-400 hover:text-neutral-600 transition transform'
                >
                  <PencilLine className='w-4 h-4 mr-2' />
                  Edit
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className='text-sm text-black *:mt'>
              <p>{item.recipientName}</p>
              <p>{item.phoneNumber}</p>
              <p>{item.street}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}

export default AddressCard
