import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { IAddress } from '@/interface/address'
import { MapPin } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'
import { AddressListCheckout } from './AddressListCheckout'
import { useTranslate } from '@/hooks/useTranslate'

interface AddressCheckoutProps {
  data: {
    locations: IAddress[]
  }
}

const AddressCheckout = ({ data }: AddressCheckoutProps) => {
  const hasDefault = data?.locations?.some((item: IAddress) => item.default)
  const { t } = useTranslate('checkout.address')
  return (
    <>
      <Card className='w-full border border-black'>
        <CardHeader className='flex flex-row items-center space-y-0 pb-2 mb-3'>
          <div className='flex items-center font-semibold'>
            <MapPin className='h-7 w-7 mr-2' />
            {t('title')}
          </div>
          <AddressListCheckout data={data} />
        </CardHeader>

        <CardContent className='space-y-4'>
          {data?.locations?.map((item: IAddress) => (
            <Fragment key={item._id}>
              {item.default && (
                <>
                  <div className='flex items-center gap-x-4'>
                    <p className='text-lg font-semibold'>{item.firstName + ' ' + item.lastName + ' - ' + item.phone}</p>
                    <Badge>{t('default')}</Badge>
                  </div>
                  <p className='text-zinc-600 text-md'>{`${item.street}, ${item.ward}, ${item.district}, ${item.city}`}</p>
                </>
              )}
            </Fragment>
          ))}
          {!hasDefault && <p className='text-zinc-600 text-md'>{t('noAddress')}</p>}
        </CardContent>
      </Card>
    </>
  )
}

export default AddressCheckout
