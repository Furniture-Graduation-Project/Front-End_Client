import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useTranslate } from '@/hooks/useTranslate'
import { IAddress } from '@/interface/address'
import AddressForm from './AddressForm'
import { AddressPopover } from './AddressPopover'

interface IAddressCard {
  data: {
    locations: IAddress[]
  }
}

const AddressCard = ({ data }: IAddressCard) => {
  const { t } = useTranslate('account.order.address')

  return (
    <main className='w-full'>
      <div className='flex justify-between'>
        <h2 className='text-xl font-semibold'>{t('orderAddressLabel')}</h2>
        <AddressPopover>
          <AddressForm />
        </AddressPopover>
      </div>
      <div className='grid grid-cols-3 mt-5 gap-6 mb-14'>
        {data?.locations?.length === 0 && (
          <div className='col-span-3 text-center'>
            <p className='text-lg text-neutral-400'>{t('noAddress')}</p>
          </div>
        )}
        {data?.locations?.map((item) => (
          <Card key={item._id} className='w-full max-w-md mx-auto shadow-lg hover:shadow-xl transition-shadow'>
            <CardHeader className='flex flex-row items-center  space-y-0 pb-2'>
              <h2 className='text-2xl font-bold tracking-tight'>{item.addressName}</h2>
              <div className='ml-auto'>
                <AddressPopover update>
                  <AddressForm update locationId={item._id} />
                </AddressPopover>
                <AddressPopover onDelete locationId={item._id} />
              </div>
            </CardHeader>

            <CardContent className='space-y-4'>
              <p className='text-sm'>{item.firstName + ' ' + item.lastName + ' - ' + item.phone}</p>
              <p className='text-muted-foreground text-sm'>{`${item.street}, ${item.ward}, ${item.district}, ${item.city}`}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}

export default AddressCard
