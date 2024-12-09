import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { AlertModal } from '@/components/ui/alert-modal'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useWishlistMutation from '@/hooks/mutations/useWishlistMutation'
import { MoreHorizontal, SquareArrowUpRight, Trash } from 'lucide-react'
import { useState } from 'react'
import { WishlistColumn } from './columns'
import { useNavigate } from 'react-router-dom'
import { useTranslate } from '@/hooks/useTranslate'

interface CellActionProps {
  userId?: string
  data: WishlistColumn
}

export const CellAction: React.FC<CellActionProps> = ({ userId, data }) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { mutate } = useWishlistMutation({ action: 'REMOVE' })
  const navigate = useNavigate()
  const { t } = useTranslate('account.wishlist')

  const onDelete = async () => {
    try {
      setLoading(true)
      mutate({ userId, data })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }
  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>{t('open')}</span>
            <MoreHorizontal className='w-4 h-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>{t('action')}</DropdownMenuLabel>
          <Separator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className='mr-2 h-4 w-4 text-rose-500' />
            {t('delete')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate(`/products/${data._id}`)}>
            <SquareArrowUpRight className='mr-2 h-4 w-4' />
            {t('view')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
