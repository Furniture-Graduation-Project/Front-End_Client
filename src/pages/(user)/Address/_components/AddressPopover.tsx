import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
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
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {update && (
        <AlertDialogTrigger asChild>
          <Button variant='ghost' size='icon' className='h-8 w-8'>
            <PencilIcon className='h-4 w-4 text-muted-foreground' />
            <span className='sr-only'>{t('updateButton')}</span>{' '}
          </Button>
        </AlertDialogTrigger>
      )}

      {onDelete && (
        <AlertDialogTrigger asChild>
          <Button variant='ghost' size='icon' className='h-8 w-8'>
            <Trash2 className='h-4 w-4 text-muted-foreground  text-rose-500' />
            <span className='sr-only'>{t('deleteButton')}</span>
          </Button>
        </AlertDialogTrigger>
      )}

      {!update && !onDelete && (
        <AlertDialogTrigger asChild>
          <Button size={'sm'} variant={'default'} onClick={() => setIsOpen(true)}>
            <MapPinPlus className='mr-2 w-4 h-4' />
            {t('addAddress')}
          </Button>
        </AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          {update && (
            <>
              <AlertDialogTitle>{t('editAddressTitle')}</AlertDialogTitle>
              <AlertDialogDescription>{t('editAddressDescription')}</AlertDialogDescription>
            </>
          )}
          {onDelete && (
            <>
              <AlertDialogTitle>{t('deleteAddressTitle')}</AlertDialogTitle>
              <AlertDialogDescription>{t('deleteAddressDescription')}</AlertDialogDescription>
            </>
          )}
          {!update && !onDelete && (
            <>
              <AlertDialogTitle>{t('addAddress')}</AlertDialogTitle>
              <AlertDialogDescription>{t('des')}</AlertDialogDescription>
            </>
          )}
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>{t('cancelButton')}</AlertDialogCancel>
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
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
