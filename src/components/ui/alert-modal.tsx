import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Modal } from './modal'
import { useTranslate } from '@/hooks/useTranslate'

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
}

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, onConfirm, loading }) => {
  const [isMounted, setIsMounted] = useState(false)
  const { t } = useTranslate('account.wishlist')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Modal title={t('sure')} description={t('description')} isOpen={isOpen} onClose={onClose}>
      <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
        <Button disabled={loading} variant={'outline'} onClick={onClose}>
          {t('cancel')}
        </Button>
        <Button disabled={loading} variant={'destructive'} onClick={onConfirm}>
          {t('confirm')}
        </Button>
      </div>
    </Modal>
  )
}
