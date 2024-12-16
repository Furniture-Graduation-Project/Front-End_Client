import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useAuthContext } from '@/context/AuthContext'
import useAddressMutation from '@/hooks/mutations/useAddressMutation'
import { useTranslate } from '@/hooks/useTranslate'
import { IAddress } from '@/interface/address'
import AddressForm from '@/pages/(user)/Address/_components/AddressForm'
import { AddressPopover } from '@/pages/(user)/Address/_components/AddressPopover'
import { MapPinned } from 'lucide-react'
import { useState } from 'react'
import { Fragment } from 'react/jsx-runtime'

interface AddressListCheckoutProps {
  data: {
    locations: IAddress[]
  }
}

export function AddressListCheckout({ data }: AddressListCheckoutProps) {
  const [open, setOpen] = useState(false)
  const { user } = useAuthContext()
  const { mutate } = useAddressMutation({ action: 'DEFAULT' })
  const { t } = useTranslate('checkout.address')

  const handleSetDefault = (locationId: string) => {
    try {
      mutate({ userId: user?._id, query: locationId }, { onSuccess: () => setOpen(false) })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='ml-auto'>
        <AddressPopover>
          <AddressForm />
        </AddressPopover>
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        {data?.locations?.length > 0 && (
          <AlertDialogTrigger asChild>
            <Button size={'sm'} className='ml-2'>
              {t('change')}
            </Button>
          </AlertDialogTrigger>
        )}

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('list')}</AlertDialogTitle>
            <Card className='w-full border border-black'>
              <CardHeader className='flex flex-row items-center space-y-0 pb-0.5'></CardHeader>
              <ScrollArea className='h-[500px]'>
                <CardContent className='space-y-4'>
                  {data?.locations
                    ?.sort((a, b) => (b.default ? 1 : 0) - (a.default ? 1 : 0))
                    .map((item: IAddress) => (
                      <Fragment key={item._id}>
                        <div className='flex items-center gap-x-4'>
                          <p className='font-semibold text-xl'>{item.addressName}</p>
                          {!item.default && (
                            <Button
                              onClick={() => handleSetDefault(item._id || '')}
                              type='button'
                              size={'icon'}
                              variant={'secondary'}
                            >
                              <MapPinned />
                            </Button>
                          )}
                        </div>
                        <div className='flex items-center gap-x-4'>
                          <p className='text-lg'>{item.firstName + ' ' + item.lastName + ' - ' + item.phone}</p>
                          {item.default && <Badge>{t('default')}</Badge>}
                        </div>
                        <p className='text-zinc-600 text-md'>
                          {`${item.street}, ${item.ward}, ${item.district}, ${item.city}`}
                        </p>
                        <Separator />
                      </Fragment>
                    ))}
                </CardContent>
              </ScrollArea>
            </Card>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('close')}</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
