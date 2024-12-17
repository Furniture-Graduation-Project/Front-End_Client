import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { MapPinPlus, PencilIcon, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useTranslate } from '@/hooks/useTranslate'
import { useAuthContext } from '@/context/AuthContext'
import useAddressMutation from '@/hooks/mutations/useAddressMutation'
import { toast } from '@/hooks/use-toast'

export function AddressPopover({
  children,
  update,
  onDelete,
  locationId
}: {
  children?: React.ReactNode
  update?: boolean
  onDelete?: boolean
  locationId?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuthContext()
  const { mutate } = useAddressMutation({ action: 'DELETE' })
  const { mutate: setDefault } = useAddressMutation({ action: 'DEFAULT' })

  const { t } = useTranslate('account.order.address')

  const handleDelete = () => {
    try {
      mutate({ userId: user?._id, query: locationId }, { onSuccess: () => setIsOpen(false) })
    } catch (error) {
      console.log(error)
    }
  }

  const handleSetDefault = () => {
    try {
      setDefault({ userId: user?._id, query: locationId }, { onSuccess: () => setIsOpen(false) })
      toast({
        title: 'Success',
        description: 'Set default address successfully',
        variant: 'success'
      })
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        description: 'Set default address failed',
        variant: 'destructive'
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {update && (
        <DialogTrigger asChild>
          <Button variant='ghost' size='icon' className='h-8 w-8'>
            <PencilIcon className='h-4 w-4 text-muted-foreground' />
            <span className='sr-only'>{t('updateButton')}</span>{' '}
          </Button>
        </DialogTrigger>
      )}

      {onDelete && (
        <DialogTrigger asChild>
          <Button variant='ghost' size='icon' className='h-8 w-8'>
            <Trash2 className='h-4 w-4 text-muted-foreground  text-rose-500' />
            <span className='sr-only'>{t('deleteButton')}</span>
          </Button>
        </DialogTrigger>
      )}

      {!update && !onDelete && (
        <DialogTrigger asChild>
          <Button size={'sm'} variant={'default'} onClick={() => setIsOpen(true)}>
            <MapPinPlus className='mr-2 w-4 h-4' />
            {t('addAddress')}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className='max-w-fit'>
        <DialogHeader>
          {update && (
            <>
              <DialogTitle>{t('editAddressTitle')}</DialogTitle>
              <DialogDescription>{t('editAddressDescription')}</DialogDescription>
            </>
          )}
          {onDelete && (
            <>
              <DialogTitle>{t('deleteAddressTitle')}</DialogTitle>
              <DialogDescription>{t('deleteAddressDescription')}</DialogDescription>
            </>
          )}
          {!update && !onDelete && (
            <>
              <DialogTitle>{t('addAddress')}</DialogTitle>
              <DialogDescription>{t('des')}</DialogDescription>
            </>
          )}
        </DialogHeader>
        {children}
        <DialogFooter>
          {onDelete ? (
            <Button onClick={() => handleDelete()} variant={'destructive'}>
              {t('deleteButton')}
            </Button>
          ) : (
            <>
              <Button onClick={() => setIsOpen(false)} form='addressFormId' variant={'default'}>
                {t('saveButton')}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
