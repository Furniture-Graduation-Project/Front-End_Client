import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useTranslate } from '@/hooks/useTranslate'
import { IAddress } from '@/interface/address'
import AddressForm from './AddressForm'
import { AddressPopover } from './AddressPopover'
import { Badge } from '@/components/ui/badge'

interface IAddressCard {
  data: {
    locations: IAddress[]
  }
}

const AddressCard = ({ data }: IAddressCard) => {
  const { t } = useTranslate('account.order.address')

  return (
    <main className='w-full'>
      <div className='flex flex-col gap-y-4 md:flex-row justify-between items-center'>
        <h2 className='text-xl font-semibold'>{t('orderAddressLabel')}</h2>
        <AddressPopover>
          <AddressForm />
        </AddressPopover>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 mt-5 gap-6 mb-14'>
        {data?.locations?.length === 0 && (
          <div className='col-span-3 text-center'>
            <p className='text-lg text-neutral-400'>{t('noAddress')}</p>
          </div>
        )}
        {data?.locations
          ?.sort((a, b) => (b.default ? 1 : 0) - (a.default ? 1 : 0))
          .map((item) => (
            <Card key={item._id} className='w-full max-w-md mx-auto shadow-lg hover:shadow-xl transition-shadow'>
              <CardHeader className='flex flex-row items-center space-y-0 pb-2'>
                <div className='flex items-center gap-x-2'>
                  <h2 className='text-2xl font-bold tracking-tight'>{item.addressName}</h2>
                  {item.default && <Badge className=''>{t('defaultAddress')}</Badge>}
                </div>
                <div className='ml-auto'>
                  <AddressPopover update locationId={item._id}>
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
