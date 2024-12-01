import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { AuthService } from '@/services/account'

interface DeleteAccountProps {
  id: string
}

export function DeleteAccount({ id }: DeleteAccountProps) {
  const onDelete = async () => {
    try {
      await AuthService.delete(id)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive'>Xoá tài khoản</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn không</AlertDialogTitle>
          <AlertDialogDescription>Hành động này sẽ xóa tài khoản của bạn và không thể khôi phục</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Xác nhận</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
